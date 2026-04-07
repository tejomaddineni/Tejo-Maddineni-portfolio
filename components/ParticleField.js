import { useRef, useEffect, useCallback } from 'react';

const PARTICLE_COUNT = 80;
const COLORS = [
  'rgba(99,102,241,', // indigo
  'rgba(167,139,250,', // violet
  'rgba(34,211,238,', // cyan
  'rgba(244,114,182,', // pink
  'rgba(96,165,250,', // blue
];

class Dot {
  constructor(w, h) {
    this.reset(w, h, true);
  }
  reset(w, h, init) {
    this.x = Math.random() * w;
    this.y = init ? Math.random() * h : -10;
    this.r = 1 + Math.random() * 2.5;
    // Store normalized speeds (fraction of height per second)
    this.sxNorm = (Math.random() - 0.5) * 0.003;
    this.syNorm = 0.002 + Math.random() * 0.005;
    this.alpha = 0.15 + Math.random() * 0.35;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.phase = Math.random() * Math.PI * 2;
    this.driftNorm = 0.001 + Math.random() * 0.002;
  }
  update(w, h, t, dtMs) {
    // Convert normalized speeds to pixels using canvas height, scale by real time
    const scale = h * dtMs * 0.001;
    this.x += (this.sxNorm + Math.sin(t * 0.0001 + this.phase) * this.driftNorm) * scale;
    this.y += this.syNorm * scale;
    if (this.y > h + 10 || this.x < -10 || this.x > w + 10) this.reset(w, h, false);
  }
}

export default function ParticleField({ style, className }) {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const af = useRef(null);
  const lastTs = useRef(0);

  const draw = useCallback((ts) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rc = cvs.getBoundingClientRect();
    const w = rc.width, h = rc.height;

    // Delta time in ms, capped at 50ms
    const rawDt = ts - (lastTs.current || ts);
    lastTs.current = ts;
    const dtMs = Math.min(rawDt, 50);

    if (cvs.width !== w * dpr || cvs.height !== h * dpr) {
      cvs.width = w * dpr;
      cvs.height = h * dpr;
    }

    if (dots.current.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) dots.current.push(new Dot(w, h));
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    dots.current.forEach(d => {
      d.update(w, h, ts, dtMs);
      const pulse = 0.7 + Math.sin(ts * 0.0008 + d.phase) * 0.3;
      const a = d.alpha * pulse;

      // Soft glow
      const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
      grd.addColorStop(0, d.color + (a * 0.3).toFixed(2) + ')');
      grd.addColorStop(1, d.color + '0)');
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.color + a.toFixed(2) + ')';
      ctx.fill();
    });

    af.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    af.current = requestAnimationFrame(draw);
    return () => { if (af.current) cancelAnimationFrame(af.current); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
    />
  );
}
