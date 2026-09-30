// Shared interaction effects for the OPTIEDGE artboards.
// .ok-spot   — spotlight card: a green ring segment + interior glow track the cursor
// .ok-shine  — a sheen sweeps across the surface on hover (.ok-shine-dark = green sheen for light buttons)
// .ok-magnet — the element leans a few px toward the cursor while hovered
// Everything is delegated off document so re-rendered React nodes keep working.
(function () {
  if (window.__okFx) return;
  window.__okFx = 1;

  var style = document.createElement('style');
  style.textContent = [
    '.ok-spot{position:relative}',
    '.ok-spot::before{content:"";position:absolute;inset:-1px;border-radius:inherit;padding:1px;',
    'background:radial-gradient(240px circle at var(--x,50%) var(--y,50%),rgba(31,122,77,0.8),transparent 65%);',
    '-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;',
    'mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;',
    'opacity:0;transition:opacity .25s ease;pointer-events:none;z-index:2}',
    '.ok-spot::after{content:"";position:absolute;inset:0;border-radius:inherit;',
    'background:radial-gradient(300px circle at var(--x,50%) var(--y,50%),rgba(31,122,77,0.07),transparent 60%);',
    'opacity:0;transition:opacity .25s ease;pointer-events:none;z-index:1}',
    '.ok-spot:hover::before,.ok-spot:hover::after{opacity:1}',
    '.ok-shine{position:relative;overflow:hidden}',
    '.ok-shine::after{content:"";position:absolute;top:-20%;bottom:-20%;width:36%;left:-50%;',
    'transform:skewX(-22deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent);',
    'opacity:0;pointer-events:none}',
    '.ok-shine:hover::after{opacity:1;animation:okSweep .8s ease forwards}',
    '.ok-shine-dark::after{background:linear-gradient(90deg,transparent,rgba(31,122,77,0.16),transparent)}',
    '@keyframes okSweep{to{left:120%}}',
    '.ok-magnet{transition:transform .18s ease;will-change:transform}',
    '@media (prefers-reduced-motion: reduce){.ok-shine:hover::after{animation:none;opacity:0}.ok-magnet{transition:none}}'
  ].join('');
  document.head.appendChild(style);

  var lastMagnet = null;
  document.addEventListener('pointermove', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var spot = t.closest('.ok-spot');
    if (spot) {
      var r = spot.getBoundingClientRect();
      spot.style.setProperty('--x', (e.clientX - r.left) + 'px');
      spot.style.setProperty('--y', (e.clientY - r.top) + 'px');
    }

    var mag = t.closest('.ok-magnet');
    if (lastMagnet && mag !== lastMagnet) lastMagnet.style.transform = '';
    if (mag) {
      var m = mag.getBoundingClientRect();
      var dx = (e.clientX - (m.left + m.width / 2)) / m.width;
      var dy = (e.clientY - (m.top + m.height / 2)) / m.height;
      mag.style.transform = 'translate(' + (dx * 6).toFixed(1) + 'px,' + (dy * 5).toFixed(1) + 'px)';
    }
    lastMagnet = mag;
  }, { passive: true });

  document.addEventListener('pointerout', function (e) {
    if (lastMagnet && !e.relatedTarget) { lastMagnet.style.transform = ''; lastMagnet = null; }
  }, { passive: true });
})();
