import { useRef, useEffect, useCallback } from 'react';

/* ━━━ Google Fonts: Space Grotesk for labels ━━━ */
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
let fontLoaded = false;
function ensureFont() {
  if (fontLoaded || typeof document === 'undefined') return;
  fontLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONT_URL;
  document.head.appendChild(link);
}

// ━━━ CATEGORY DEFINITIONS ━━━
const CATEGORIES = {
  firewall:    { color: '#f43f5e', glow: 'rgba(244,63,94,0.45)',  label: 'Firewalls',      hex: 'f43f5e' },
  cloud:       { color: '#818cf8', glow: 'rgba(129,140,248,0.45)', label: 'Cloud',           hex: '818cf8' },
  sdwan:       { color: '#22d3ee', glow: 'rgba(34,211,238,0.45)',  label: 'SD-WAN',          hex: '22d3ee' },
  datacenter:  { color: '#c084fc', glow: 'rgba(192,132,252,0.45)', label: 'Data Center',     hex: 'c084fc' },
  automation:  { color: '#fbbf24', glow: 'rgba(251,191,36,0.45)',  label: 'Automation',      hex: 'fbbf24' },
  monitoring:  { color: '#34d399', glow: 'rgba(52,211,153,0.45)',  label: 'Monitoring',      hex: '34d399' },
  identity:    { color: '#f472b6', glow: 'rgba(244,114,182,0.45)', label: 'Identity',        hex: 'f472b6' },
  loadbalance: { color: '#60a5fa', glow: 'rgba(96,165,250,0.45)',  label: 'Load Balancing',  hex: '60a5fa' },
};

// ━━━ NODES — importance 1-3 controls size + always-show labels ━━━
const NODES = [
  { id: 'pa',  label: 'Palo Alto',  cat: 'firewall',   x: 0.12, y: 0.18, r: 26, imp: 3 },
  { id: 'fg',  label: 'FortiGate',  cat: 'firewall',   x: 0.06, y: 0.34, r: 20, imp: 2 },
  { id: 'ftd', label: 'Cisco FTD',  cat: 'firewall',   x: 0.20, y: 0.40, r: 17, imp: 2 },
  { id: 'wf',  label: 'WildFire',   cat: 'firewall',   x: 0.10, y: 0.50, r: 14, imp: 1 },
  { id: 'aws', label: 'AWS VPC',    cat: 'cloud',       x: 0.80, y: 0.14, r: 26, imp: 3 },
  { id: 'r53', label: 'Route 53',   cat: 'cloud',       x: 0.90, y: 0.26, r: 16, imp: 1 },
  { id: 'cf',  label: 'CloudFront', cat: 'cloud',       x: 0.73, y: 0.28, r: 14, imp: 1 },
  { id: 'dc',  label: 'Direct Connect', cat: 'cloud',   x: 0.93, y: 0.40, r: 17, imp: 2 },
  { id: 'vip', label: 'Viptela',    cat: 'sdwan',       x: 0.40, y: 0.10, r: 24, imp: 3 },
  { id: 'ips', label: 'IPsec VPN',  cat: 'sdwan',       x: 0.55, y: 0.06, r: 16, imp: 1 },
  { id: 'mpl', label: 'MPLS',       cat: 'sdwan',       x: 0.33, y: 0.22, r: 14, imp: 1 },
  { id: 'aci', label: 'Cisco ACI',  cat: 'datacenter',  x: 0.62, y: 0.54, r: 26, imp: 3 },
  { id: 'n9k', label: 'Nexus 9K',   cat: 'datacenter',  x: 0.74, y: 0.64, r: 18, imp: 2 },
  { id: 'ari', label: 'Arista 7K',  cat: 'datacenter',  x: 0.54, y: 0.67, r: 16, imp: 2 },
  { id: 'fco', label: 'FCoE',       cat: 'datacenter',  x: 0.67, y: 0.78, r: 12, imp: 1 },
  { id: 'py',  label: 'Python',     cat: 'automation',   x: 0.28, y: 0.70, r: 24, imp: 3 },
  { id: 'ans', label: 'Ansible',    cat: 'automation',   x: 0.16, y: 0.80, r: 18, imp: 2 },
  { id: 'nmk', label: 'Netmiko',    cat: 'automation',   x: 0.36, y: 0.86, r: 14, imp: 1 },
  { id: 'cw',  label: 'CloudWatch', cat: 'monitoring',   x: 0.84, y: 0.72, r: 17, imp: 2 },
  { id: 'ws',  label: 'Wireshark',  cat: 'monitoring',   x: 0.92, y: 0.58, r: 14, imp: 1 },
  { id: 'sw',  label: 'StealthWatch', cat: 'monitoring', x: 0.88, y: 0.84, r: 13, imp: 1 },
  { id: 'ise', label: 'Cisco ISE',  cat: 'identity',     x: 0.42, y: 0.40, r: 22, imp: 3 },
  { id: 'ad',  label: 'Active Dir', cat: 'identity',     x: 0.26, y: 0.54, r: 14, imp: 1 },
  { id: 'zt',  label: 'Zero Trust', cat: 'identity',     x: 0.50, y: 0.32, r: 18, imp: 2 },
  { id: 'f5',  label: 'F5 LTM',     cat: 'loadbalance',  x: 0.60, y: 0.20, r: 22, imp: 3 },
  { id: 'bgp', label: 'BGP/OSPF',   cat: 'loadbalance',  x: 0.70, y: 0.42, r: 16, imp: 2 },
  { id: 'ibx', label: 'Infoblox',   cat: 'loadbalance',  x: 0.52, y: 0.48, r: 14, imp: 1 },
];

const CONNECTIONS = [
  ['pa','fg'],['pa','ftd'],['pa','wf'],['fg','wf'],
  ['aws','r53'],['aws','cf'],['aws','dc'],['r53','cf'],
  ['vip','ips'],['vip','mpl'],
  ['aci','n9k'],['aci','ari'],['n9k','fco'],['ari','fco'],
  ['py','ans'],['py','nmk'],['ans','nmk'],
  ['cw','ws'],['cw','sw'],['ws','sw'],
  ['ise','ad'],['ise','zt'],
  ['f5','bgp'],['f5','ibx'],['bgp','ibx'],
  ['pa','ise'],['pa','vip'],['ftd','aci'],['wf','cw'],
  ['aws','dc'],['aws','f5'],['vip','f5'],['vip','aws'],
  ['aci','bgp'],['aci','cw'],['ise','zt'],['zt','pa'],
  ['py','aci'],['py','ise'],['ans','ftd'],
  ['cw','aci'],['ws','pa'],['ad','ise'],
  ['f5','aci'],['mpl','dc'],['ibx','r53'],
];

// ━━━ PARTICLE — energy pulse with glowing trail ━━━
class Particle {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.progress = Math.random();
    this.speed = 0.0006 + Math.random() * 0.002;
    this.size = 1.4 + Math.random() * 1.6;
    this.trailLen = 0.06 + Math.random() * 0.04;
  }
  update(dt) {
    this.progress += this.speed * dt;
    if (this.progress > 1) {
      this.progress -= 1;
      const t = this.from; this.from = this.to; this.to = t;
    }
  }
  pos(nm, w, h, offset) {
    const a = nm[this.from], b = nm[this.to];
    if (!a || !b) return null;
    const p = Math.max(0, Math.min(1, this.progress - (offset || 0)));
    const ax = a._dx ?? a.x * w, ay = a._dy ?? a.y * h;
    const bx = b._dx ?? b.x * w, by = b._dy ?? b.y * h;
    return { x: ax + (bx - ax) * p, y: ay + (by - ay) * p };
  }
}

export default function ConstellationViz({ style, className }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const sm = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const af = useRef(null);
  const lt = useRef(0);
  const nm = useRef({});
  NODES.forEach(n => { nm.current[n.id] = n; });

  useEffect(() => { ensureFont(); }, []);

  useEffect(() => {
    const p = [];
    CONNECTIONS.forEach(([a, b]) => {
      for (let i = 0; i < 3; i++) p.push(new Particle(a, b));
    });
    particles.current = p;
  }, []);

  const draw = useCallback((ts) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const c = cvs.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rc = cvs.getBoundingClientRect();
    const w = rc.width, h = rc.height;
    if (cvs.width !== w * dpr || cvs.height !== h * dpr) {
      cvs.width = w * dpr; cvs.height = h * dpr;
    }
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);

    const dt = Math.min(50, ts - (lt.current || ts));
    lt.current = ts;
    const dn = dt / 16.67;

    sm.current.x += (mouse.current.x - sm.current.x) * 0.1;
    sm.current.y += (mouse.current.y - sm.current.y) * 0.1;
    const mx = sm.current.x, my = sm.current.y;
    const P = 300;
    const n = nm.current;

    // ── Positions: attraction + breathing ──
    NODES.forEach(nd => {
      const bx = nd.x * w, by = nd.y * h;
      const d = Math.hypot(mx - bx, my - by);
      const inf = Math.max(0, 1 - d / P);
      const str = inf * inf * (8 + nd.imp * 4) * dn;
      const ang = Math.atan2(my - by, mx - bx);
      const bp = ts * 0.0008 + nd.x * 6.28 + nd.y * 3.14;
      nd._dx = bx + Math.cos(ang) * str;
      nd._dy = by + Math.sin(ang) * str;
      nd._br = 1 + Math.sin(bp) * 0.08;
      nd._inf = inf;
    });

    // ── Cursor glow ──
    if (mx > 0 && my > 0 && mx < w && my < h) {
      const cg = c.createRadialGradient(mx, my, 0, mx, my, P * 0.7);
      cg.addColorStop(0, 'rgba(129,140,248,0.07)');
      cg.addColorStop(0.4, 'rgba(34,211,238,0.03)');
      cg.addColorStop(1, 'transparent');
      c.beginPath(); c.arc(mx, my, P * 0.7, 0, Math.PI * 2);
      c.fillStyle = cg; c.fill();
    }

    // ── Connections ──
    CONNECTIONS.forEach(([ai, bi]) => {
      const a = n[ai], b = n[bi];
      if (!a || !b) return;
      const ax = a._dx, ay = a._dy, bx = b._dx, by = b._dy;
      const cA = CATEGORIES[a.cat], cB = CATEGORIES[b.cat];
      const dA = Math.hypot(mx - ax, my - ay);
      const dB = Math.hypot(mx - bx, my - by);
      const dM = Math.hypot(mx - (ax + bx) / 2, my - (ay + by) / 2);
      const mI = Math.max(0, 1 - Math.min(dA, dB, dM) / (P * 1.2));
      const al = 0.08 + mI * 0.55;
      const lw = 0.8 + mI * 2.5;

      if (mI > 0.1) {
        c.save();
        c.shadowColor = cA.color;
        c.shadowBlur = mI * 25;
        c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by);
        c.strokeStyle = '#ffffff';
        c.lineWidth = lw * 0.5;
        c.globalAlpha = mI * 0.15;
        c.stroke();
        c.restore();
      }

      const g = c.createLinearGradient(ax, ay, bx, by);
      const ha = Math.round(al * 255).toString(16).padStart(2, '0');
      const hm = Math.round(al * 0.4 * 255).toString(16).padStart(2, '0');
      g.addColorStop(0, cA.color + ha);
      g.addColorStop(0.5, '#ffffff' + hm);
      g.addColorStop(1, cB.color + ha);
      c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by);
      c.strokeStyle = g; c.lineWidth = lw; c.globalAlpha = 1; c.stroke();
    });

    // ── Particles ──
    particles.current.forEach(p => {
      p.update(dn);
      const head = p.pos(n, w, h, 0);
      const tail = p.pos(n, w, h, p.trailLen);
      if (!head || !tail) return;
      const cat = CATEGORIES[n[p.from].cat];
      const dM = Math.hypot(mx - head.x, my - head.y);
      const pI = Math.max(0, 1 - dM / P);
      const sz = p.size * (1 + pI * 1.8);

      const tg = c.createLinearGradient(tail.x, tail.y, head.x, head.y);
      tg.addColorStop(0, 'transparent');
      tg.addColorStop(1, cat.color);
      c.beginPath(); c.moveTo(tail.x, tail.y); c.lineTo(head.x, head.y);
      c.strokeStyle = tg; c.lineWidth = sz * 0.8;
      c.globalAlpha = 0.25 + pI * 0.5; c.stroke();

      if (pI > 0.1) {
        c.save(); c.shadowColor = cat.color; c.shadowBlur = pI * 12;
        c.beginPath(); c.arc(head.x, head.y, sz * 1.5, 0, Math.PI * 2);
        c.fillStyle = cat.color; c.globalAlpha = pI * 0.3; c.fill();
        c.restore();
      }

      c.beginPath(); c.arc(head.x, head.y, sz * 0.7, 0, Math.PI * 2);
      c.fillStyle = '#ffffff'; c.globalAlpha = 0.6 + pI * 0.4; c.fill();

      c.beginPath(); c.arc(head.x, head.y, sz, 0, Math.PI * 2);
      c.fillStyle = cat.color; c.globalAlpha = 0.15 + pI * 0.35; c.fill();
      c.globalAlpha = 1;
    });

    // ── Nodes ──
    NODES.forEach(nd => {
      const nx = nd._dx, ny = nd._dy;
      const cat = CATEGORIES[nd.cat];
      const inf = nd._inf;
      const r = nd.r * nd._br * (1 + inf * 0.35);

      // Outer halo
      const hr = r * (2.5 + inf * 2);
      const hg = c.createRadialGradient(nx, ny, r * 0.3, nx, ny, hr);
      hg.addColorStop(0, cat.glow);
      hg.addColorStop(0.4, cat.color + '10');
      hg.addColorStop(1, 'transparent');
      c.beginPath(); c.arc(nx, ny, hr, 0, Math.PI * 2);
      c.fillStyle = hg; c.globalAlpha = 0.12 + inf * 0.55; c.fill();

      // Orbital ring
      c.beginPath(); c.arc(nx, ny, r * 1.4, 0, Math.PI * 2);
      c.strokeStyle = cat.color; c.lineWidth = 0.7 + inf * 1.2;
      c.globalAlpha = 0.06 + inf * 0.35; c.stroke();

      // Gradient sphere
      const sp = c.createRadialGradient(nx - r * 0.25, ny - r * 0.25, r * 0.1, nx, ny, r);
      sp.addColorStop(0, '#ffffff30');
      sp.addColorStop(0.3, cat.color + '40');
      sp.addColorStop(0.7, cat.color + '18');
      sp.addColorStop(1, cat.color + '08');
      c.beginPath(); c.arc(nx, ny, r, 0, Math.PI * 2);
      c.fillStyle = sp; c.globalAlpha = 0.6 + inf * 0.4; c.fill();

      // Sphere border
      c.beginPath(); c.arc(nx, ny, r, 0, Math.PI * 2);
      c.strokeStyle = cat.color; c.lineWidth = 1.2 + inf * 1.5;
      c.globalAlpha = 0.2 + inf * 0.6; c.stroke();

      // Specular highlight
      const sR = 2.5 + inf * 3 + nd.imp * 0.5;
      c.beginPath(); c.arc(nx - r * 0.2, ny - r * 0.2, sR, 0, Math.PI * 2);
      c.fillStyle = '#ffffff'; c.globalAlpha = 0.4 + inf * 0.5; c.fill();
      c.globalAlpha = 1;

      // Labels
      const show = nd.imp >= 3 || inf > 0.12;
      if (show) {
        const la = nd.imp >= 3 ? 0.65 + inf * 0.35 : Math.min(1, inf * 2.5);
        const fs = nd.imp >= 3 ? 12 + inf * 3 : 10 + inf * 3;
        c.font = `600 ${fs}px 'Space Grotesk','Inter',sans-serif`;
        c.textAlign = 'center';
        c.globalAlpha = la;
        c.shadowColor = 'rgba(0,0,0,0.8)';
        c.shadowBlur = 6;
        c.fillStyle = cat.color;
        c.fillText(nd.label, nx, ny + r + 18);
        c.shadowBlur = 0;
        c.globalAlpha = 1;
      }
    });

    // ── Legend ──
    const ly = h - 22, lx = 20;
    let ox = 0;
    c.font = '500 10px "Space Grotesk","Inter",sans-serif';
    c.shadowBlur = 0; c.textBaseline = 'middle';
    Object.values(CATEGORIES).forEach(cat => {
      c.beginPath(); c.arc(lx + ox, ly, 4.5, 0, Math.PI * 2);
      c.fillStyle = cat.color; c.globalAlpha = 0.75; c.fill();
      c.globalAlpha = 0.5; c.fillStyle = '#fff'; c.textAlign = 'left';
      c.fillText(cat.label, lx + ox + 10, ly + 1); c.globalAlpha = 1;
      ox += c.measureText(cat.label).width + 30;
    });

    af.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    af.current = requestAnimationFrame(draw);
    return () => { if (af.current) cancelAnimationFrame(af.current); };
  }, [draw]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const mv = (e) => { const r = cvs.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const lv = () => { mouse.current = { x: -9999, y: -9999 }; };
    cvs.addEventListener('mousemove', mv);
    cvs.addEventListener('mouseleave', lv);
    return () => { cvs.removeEventListener('mousemove', mv); cvs.removeEventListener('mouseleave', lv); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair', ...style }}
    />
  );
}
