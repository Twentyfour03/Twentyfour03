// Glass surface ported from Originkit `light-glass-button` (ui/light-glass-button.tsx).
// Keeps the parts that make the material read: a tinted backdrop-blurred face, an
// internal core+spill light that eases toward the pointer, and TWO mask-composited
// ring bands — a resting stroke plus a conic hotspot aimed at whichever edge the
// light is nearest, blended by a softmin of the four side distances so the aim never
// snaps. Percent-of-max radius is dropped (callers pass px). Requires window.React.
(function () {
if (window.GlassSurface) return;

const BLUR = 20;
const TINT = 0.16;
const STROKE_BRIGHTNESS = 140;
const LIGHT_FADE = 0.6;
const AIM_BLEND = 0.18;

const LIGHT_FALLOFF = [
  [0, 1], [0.08, 0.95], [0.18, 0.85], [0.3, 0.7], [0.42, 0.54], [0.55, 0.38],
  [0.68, 0.24], [0.8, 0.13], [0.9, 0.06], [0.96, 0.02], [1, 0]
];

const RING_MASK = {
  maskImage: 'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',
  maskClip: 'border-box, content-box',
  maskComposite: 'exclude',
  WebkitMaskImage: 'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',
  WebkitMaskClip: 'border-box, content-box',
  WebkitMaskComposite: 'xor'
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function parseColor(input) {
  const WHITE = { r: 255, g: 255, b: 255, a: 1 };
  if (!input) return WHITE;
  let c = String(input).trim();
  if (c[0] === '#') {
    let h = c.slice(1);
    if (h.length === 3 || h.length === 4) h = h.split('').map((x) => x + x).join('');
    const n = parseInt(h, 16);
    if (Number.isNaN(n)) return WHITE;
    return h.length === 6
      ? { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 }
      : { r: (n >>> 24) & 255, g: (n >>> 16) & 255, b: (n >>> 8) & 255, a: (n & 255) / 255 };
  }
  const fn = c.match(/rgba?\(([^)]+)\)/i);
  if (fn) {
    const p = fn[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (p.length >= 3) return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  return WHITE;
}

const rgba = (c, a) =>
  'rgba(' + Math.round(c.r) + ', ' + Math.round(c.g) + ', ' + Math.round(c.b) + ', ' + clamp01(a) + ')';

const lightRadius = (w, h, pct) => Math.max(w, h) * (Math.max(0, Math.min(100, pct)) / 100);

function GlassSurface(props) {
  const React = window.React;
  const {
    href, radius = 3, strokeWidth = 2, lightSizePct = 40, smoothness = 65,
    intensity = 100, fill = '#FFFFFF', lightColor = 'rgba(255,255,255,0.55)',
    strokeColorA = 'rgba(255,255,255,0.75)', strokeColorB = 'rgba(255,255,255,0.22)',
    strokeAngle = 180, textColor = '#12241B', padding = '0px', display = 'inline-flex',
    trackWindow = false, proximity = 420,
    width, style, children
  } = props;

  const scope = React.useRef(null);
  const faceRef = React.useRef(null);
  const lightRef = React.useRef(null);
  const strokeRef = React.useRef(null);
  const tgt = React.useRef({ x: 0.5, y: 0.5, on: 0 });
  const cur = React.useRef({ x: 0.5, y: 0.5, on: 0 });
  const raf = React.useRef(null);
  const last = React.useRef(0);
  const boxRef = React.useRef({ w: 0, h: 0 });

  // publish the source radius in px — radial-gradient(circle …) needs a length
  React.useEffect(() => {
    const el = faceRef.current, root = scope.current;
    if (!el || !root) return;
    const write = () => {
      const r = el.getBoundingClientRect();
      boxRef.current = { w: r.width, h: r.height };
      root.style.setProperty('--lr', lightRadius(r.width, r.height, lightSizePct).toFixed(1) + 'px');
    };
    write();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(write);
    ro.observe(el);
    return () => ro.disconnect();
  }, [lightSizePct]);

  React.useEffect(() => () => { if (raf.current != null) cancelAnimationFrame(raf.current); }, []);

  // Cursor tracking beyond the face: the light follows the pointer anywhere within
  // `proximity` px of the surface and fades with distance, so the glass reads as
  // lit-from-outside instead of only waking on direct hover.
  React.useEffect(() => {
    if (!trackWindow) return;
    const onDoc = (e) => {
      const el = faceRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const cx = Math.max(r.left, Math.min(r.right, e.clientX));
      const cy = Math.max(r.top, Math.min(r.bottom, e.clientY));
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      tgt.current.x = Math.max(-0.6, Math.min(1.6, (e.clientX - r.left) / r.width));
      tgt.current.y = Math.max(-0.6, Math.min(1.6, (e.clientY - r.top) / r.height));
      tgt.current.on = dist >= proximity ? 0 : 1 - dist / proximity;
      kick();
    };
    document.addEventListener('pointermove', onDoc, { passive: true });
    return () => document.removeEventListener('pointermove', onDoc);
  }, [trackWindow, proximity]);

  const paint = () => {
    const root = scope.current, c = cur.current;
    if (root) {
      root.style.setProperty('--mx', (c.x * 100).toFixed(2) + '%');
      root.style.setProperty('--my', (c.y * 100).toFixed(2) + '%');
    }
    const amt = Math.max(0, Math.min(100, intensity)) / 100;
    if (lightRef.current) lightRef.current.style.opacity = (c.on * amt).toFixed(3);

    const el = strokeRef.current;
    if (!el) return;
    const w = boxRef.current.w, h = boxRef.current.h;
    // how far the light has travelled toward an edge — squared so the flare
    // only builds near the border
    const d = clamp01(Math.max(Math.abs(c.x - 0.5), Math.abs(c.y - 0.5)) * 2);
    let ang = 0, half = 30;
    if (w > 0 && h > 0) {
      const px = c.x * w, py = c.y * h;
      const s = Math.max(1, Math.min(w, h) * AIM_BLEND);
      const sides = [[px, 0, py], [w - px, w, py], [py, px, 0], [h - py, px, h]];
      const near = Math.min.apply(null, sides.map((v) => v[0]));
      let wt = 0, ax = 0, ay = 0;
      sides.forEach(([dist, sx, sy]) => {
        const k = Math.exp(-(dist - near) / s);
        wt += k; ax += k * sx; ay += k * sy;
      });
      const ex = ax / wt - w / 2, ey = ay / wt - h / 2;
      ang = (Math.atan2(ey, ex) * 180) / Math.PI + 90;
      const L = Math.max(1, Math.hypot(ex, ey));
      half = (Math.atan((lightRadius(w, h, lightSizePct) * LIGHT_FADE) / L) * 180) / Math.PI;
    }
    el.style.setProperty('--la', ang.toFixed(1));
    el.style.setProperty('--lw', Math.max(3, Math.min(70, half)).toFixed(1));
    el.style.opacity = clamp01(c.on * d * d * (Math.max(0, Math.min(100, intensity)) / 100)).toFixed(3);
  };

  const tick = (t) => {
    const c = cur.current, g = tgt.current;
    const dt = last.current ? Math.min(0.05, (t - last.current) / 1000) : 1 / 60;
    last.current = t;
    const per = 0.5 - (Math.max(0, Math.min(100, smoothness)) / 100) * 0.46;
    const k = 1 - Math.pow(1 - per, dt * 60);
    c.x += (g.x - c.x) * k; c.y += (g.y - c.y) * k; c.on += (g.on - c.on) * k;
    paint();
    const settled = Math.abs(g.x - c.x) < 0.001 && Math.abs(g.y - c.y) < 0.001 && Math.abs(g.on - c.on) < 0.002;
    if (settled && g.on === 0) {
      c.x = g.x; c.y = g.y; c.on = 0; paint();
      raf.current = null; last.current = 0; return;
    }
    raf.current = requestAnimationFrame(tick);
  };
  const kick = () => { if (raf.current == null) { last.current = 0; raf.current = requestAnimationFrame(tick); } };

  const track = (e) => {
    const el = faceRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    tgt.current.x = (e.clientX - r.left) / r.width;
    tgt.current.y = (e.clientY - r.top) / r.height;
    kick();
  };
  const onEnter = (e) => {
    const el = faceRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) {
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        tgt.current.x = x; tgt.current.y = y;
        if (cur.current.on === 0) { cur.current.x = x; cur.current.y = y; }
      }
    }
    tgt.current.on = 1; kick();
  };
  const onLeave = (e) => { track(e); tgt.current.on = 0; kick(); };

  const glassRGB = parseColor(fill);
  const lightRGB = parseColor(lightColor);
  const backdrop = 'blur(' + BLUR + 'px) saturate(180%) brightness(108%)';
  const softStops = (peak) =>
    LIGHT_FALLOFF.map(([at, k]) => rgba(lightRGB, peak * k) + ' ' + Math.round(at * 100) + '%').join(', ');
  // core + wide dim spill — one gradient alone reads as a flat disc
  const lightGradient =
    'radial-gradient(circle var(--lr, 0px) at var(--mx) var(--my), ' + softStops(lightRGB.a) + '), ' +
    'radial-gradient(circle calc(var(--lr, 0px) * 1.9) at var(--mx) var(--my), ' + softStops(lightRGB.a * 0.34) + ')';
  const sw = Math.max(0, Math.round(strokeWidth));
  const lightOpaque = rgba(lightRGB, 1), lightClear = rgba(lightRGB, 0);
  const strokeLight =
    'conic-gradient(from calc((var(--la, 0) - var(--lw, 30)) * 1deg), ' + lightClear +
    ' 0deg, ' + lightOpaque + ' calc(var(--lw, 30) * 1deg), ' + lightClear + ' calc(var(--lw, 30) * 2deg))';

  const h = React.createElement;
  const ring = (extra) => h('span', {
    'aria-hidden': true,
    ref: extra.ref,
    style: Object.assign({
      position: 'absolute', inset: -sw, borderRadius: radius + sw, padding: sw,
      pointerEvents: 'none'
    }, extra.style, RING_MASK)
  });

  return h('div', {
    ref: scope,
    style: Object.assign({
      position: 'relative', display, width, borderRadius: radius,
      boxShadow: '0 18px 44px -22px rgba(11,20,16,0.45)',
      '--mx': '50%', '--my': '50%'
    }, style)
  }, [
    h(href ? 'a' : 'div', {
      key: 'face',
      href,
      ref: faceRef,
      onPointerMove: track,
      onPointerEnter: onEnter,
      onPointerLeave: onLeave,
      style: {
        boxSizing: 'border-box', flex: '1 1 auto', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding, border: 'none', borderRadius: radius,
        cursor: 'pointer', position: 'relative', zIndex: 1, overflow: 'hidden',
        textDecoration: 'none', color: textColor,
        background: rgba(glassRGB, TINT),
        backdropFilter: backdrop, WebkitBackdropFilter: backdrop
      }
    }, [
      h('span', {
        key: 'light',
        ref: lightRef,
        'aria-hidden': true,
        style: {
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0, pointerEvents: 'none',
          borderRadius: radius, background: lightGradient, mixBlendMode: 'screen'
        }
      }),
      h('span', { key: 'content', style: { position: 'relative', zIndex: 1, width: '100%' } }, children)
    ]),
    sw > 0 ? ring({
      key: 'stroke',
      style: {
        background: 'linear-gradient(' + Math.round(strokeAngle) + 'deg, ' + strokeColorA + ', ' + strokeColorB + ')',
        backdropFilter: 'saturate(220%) brightness(' + STROKE_BRIGHTNESS + '%)',
        WebkitBackdropFilter: 'saturate(220%) brightness(' + STROKE_BRIGHTNESS + '%)',
        zIndex: 3
      }
    }) : null,
    sw > 0 ? ring({
      key: 'strokeLight',
      ref: strokeRef,
      style: {
        background: strokeLight, opacity: 0, mixBlendMode: 'screen', zIndex: 4,
        '--la': '0', '--lw': '30'
      }
    }) : null
  ]);
}

window.GlassSurface = GlassSurface;
if (typeof module !== 'undefined' && module.exports) module.exports = { GlassSurface };

})();
