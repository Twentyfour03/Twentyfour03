// Dot-globe adapted from Originkit `globe` (the media element of section hero-23).
// Same technique and land data (Natural Earth 50m), reduced to the props this page uses
// and repainted for a light surface. Requires THREE on window (loaded in the page helmet).

(function () {
if (window.Globe) return;

const LAND_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json';

function latLngToVec(lat, lng) {
  const a = (lat * Math.PI) / 180;
  const b = (lng * Math.PI) / 180;
  return { x: Math.cos(a) * Math.sin(b), y: Math.sin(a), z: Math.cos(a) * Math.cos(b) };
}

function Globe(props) {
  const React = window.React;
  const {
    dotColor = '#1F7A4D',
    markerColor = '#0E3B27',
    markers = [],
    speed = 0.9,
    spacing = 1.35,
    dotSize = 0.0075,
    tilt = 20,
    scale = 1
  } = props;
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    const THREE = window.THREE;
    const host = hostRef.current;
    if (!THREE || !host) return;

    let raf = null, disposed = false;
    const w = host.clientWidth || 900, h = host.clientHeight || 600;
    const R = 1 * scale;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 2.55 / scale);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const canvas = renderer.domElement;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .6s ease';
    host.appendChild(canvas);

    const group = new THREE.Group();
    group.rotation.x = (tilt * Math.PI) / 180;
    scene.add(group);

    // graticule — faint rings so the sphere reads as a globe before dots land
    const gratMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#CFD8D2'), transparent: true, opacity: 0.55 });
    const ring = (pts) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, pts.length, 0.0012 * scale, 5, false), gratMat));
    };
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let i = 0; i <= 72; i++) {
        const p = latLngToVec(lat, (i / 72) * 360 - 180);
        pts.push(new THREE.Vector3(p.x * R, p.y * R, p.z * R));
      }
      ring(pts);
    }
    for (let lng = -180; lng < 180; lng += 15) {
      const pts = [];
      for (let i = 0; i <= 72; i++) {
        const p = latLngToVec((i / 72) * 180 - 90, lng);
        pts.push(new THREE.Vector3(p.x * R, p.y * R, p.z * R));
      }
      ring(pts);
    }

    // rotation state + drag
    let rot = 0, target = 0, vel = 0, dragging = false, lastX = 0, hovering = false;
    const onDown = (e) => { dragging = true; vel = 0; lastX = e.clientX; kick(); };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      target += dx * 0.006; vel = dx * 0.0018; lastX = e.clientX;
    };
    const onUp = () => { dragging = false; };
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mouseenter', () => { hovering = true; });
    canvas.addEventListener('mouseleave', () => { hovering = false; });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    const tick = () => {
      if (disposed) return;
      if (!dragging && !hovering) target += speed * 0.0012;
      if (!dragging && Math.abs(vel) > 0.00005) { target += vel; vel *= 0.94; }
      rot += (target - rot) * 0.08;
      group.rotation.y = rot;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (raf === null) raf = requestAnimationFrame(tick); };

    (async () => {
      try {
        const res = await fetch(LAND_URL);
        const land = await res.json();
        if (disposed) return;

        // rasterize land to an equirectangular mask, then sample it for dot placement
        const BW = 2048, BH = 1024;
        const off = document.createElement('canvas');
        off.width = BW; off.height = BH;
        const ctx = off.getContext('2d', { willReadFrequently: true });
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, BW, BH);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        const px = (lng, lat) => [((lng + 180) / 360) * BW, ((90 - lat) / 180) * BH];
        const ringPath = (coords) => {
          coords.forEach((c, i) => {
            const [x, y] = px(c[0], c[1]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          });
          ctx.closePath();
        };
        land.features.forEach((f) => {
          const g = f.geometry;
          if (!g) return;
          if (g.type === 'Polygon') g.coordinates.forEach(ringPath);
          else if (g.type === 'MultiPolygon') g.coordinates.forEach((poly) => poly.forEach(ringPath));
        });
        ctx.fill();
        const data = ctx.getImageData(0, 0, BW, BH).data;
        const onLand = (lng, lat) => {
          const x = Math.round(((lng + 180) / 360) * BW) % BW;
          const y = Math.max(0, Math.min(BH - 1, Math.round(((90 - lat) / 180) * BH)));
          return data[(y * BW + x) * 4] > 128;
        };

        const coords = [];
        for (let lat = -84; lat <= 84; lat += spacing) {
          const cos = Math.cos((Math.abs(lat) * Math.PI) / 180);
          const step = cos > 0.01 ? spacing / Math.max(0.32, cos) : 360;
          for (let lng = -180; lng < 180; lng += step) if (onLand(lng, lat)) coords.push([lng, lat]);
        }

        const geo = new THREE.SphereGeometry(dotSize * scale, 5, 5);
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(dotColor) });
        const inst = new THREE.InstancedMesh(geo, mat, coords.length);
        const m = new THREE.Matrix4();
        coords.forEach(([lng, lat], i) => {
          const p = latLngToVec(lat, lng);
          m.makeScale(1, 1, 1);
          m.setPosition(p.x * R, p.y * R, p.z * R);
          inst.setMatrixAt(i, m);
        });
        inst.instanceMatrix.needsUpdate = true;
        group.add(inst);

        const mGeo = new THREE.SphereGeometry(0.019 * scale, 16, 16);
        const mMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(markerColor) });
        markers.forEach((mk) => {
          const p = latLngToVec(mk.lat, mk.lng);
          const mesh = new THREE.Mesh(mGeo, mMat);
          mesh.position.set(p.x * R * 1.012, p.y * R * 1.012, p.z * R * 1.012);
          group.add(mesh);
        });

        canvas.style.opacity = '1';
        kick();
      } catch (e) {
        canvas.style.opacity = '1';
        kick();
      }
    })();

    const ro = new ResizeObserver(() => {
      const nw = host.clientWidth || w, nh = host.clientHeight || h;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(host);
    kick();

    return () => {
      disposed = true;
      if (raf !== null) cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      renderer.dispose();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, [dotColor, markerColor, speed, spacing, dotSize, tilt, scale]);

  return React.createElement('div', {
    ref: hostRef,
    style: { position: 'relative', width: '100%', height: '100%', cursor: 'grab' }
  });
}

window.Globe = Globe;
if (typeof module !== 'undefined' && module.exports) module.exports = { Globe };

})();
