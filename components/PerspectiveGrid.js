import { motion } from 'framer-motion';

/**
 * Converging perspective lines + bottom glow — inspired by premium Framer hero sections.
 * Renders an SVG grid of diagonal lines converging to a vanishing point and blurred
 * elliptical glow shapes, creating a dramatic sense of depth.
 */
export default function PerspectiveGrid({ className, style }) {
  // 15 converging diagonal lines spread from bottom to center-top
  const lines = [
    { x1: -194, y1: 462, x2: 588.882, y2: 0 },
    { x1: -23.47, y1: 460.84, x2: 656.041, y2: 0 },
    { x1: 140, y1: 462, x2: 705.52, y2: 0 },
    { x1: 307, y1: 462, x2: 748.82, y2: 0 },
    { x1: 473.13, y1: 460.84, x2: 818.62, y2: 0 },
    { x1: 632.18, y1: 460.84, x2: 872.53, y2: 0 },
    { x1: 799.18, y1: 460.84, x2: 913.26, y2: 0 },
    { x1: 962.58, y1: 462, x2: 967.95, y2: 0 },
    { x1: 1126.12, y1: 462, x2: 1021.1, y2: 0 },
    { x1: 1292.24, y1: 462, x2: 1073.61, y2: 0 },
    { x1: 1454.83, y1: 462, x2: 1116.4, y2: 0 },
    { x1: 1620.94, y1: 462, x2: 1154.4, y2: 0 },
    { x1: 1783.53, y1: 462, x2: 1233.04, y2: 0 },
    { x1: 1948.76, y1: 462, x2: 1292.24, y2: 0 },
    { x1: 2114, y1: 460.84, x2: 1363.08, y2: 0 },
  ];

  // Horizontal depth layers
  const hLines = [
    { y: 382, pts: [0, 144.09, 279.31, 413.61, 556.08, 688.7, 822.33, 958.32, 1093.66, 1230.62, 1361.61, 1493.41, 1637.12, 1775.82, 1920] },
    { y: 302, pts: [80, 213.13, 338.07, 462.16, 593.8, 716.33, 839.8, 965.45, 1090.5, 1217.04, 1338.07, 1459.85, 1592.63, 1720.78, 1854] },
    { y: 222, pts: [214, 327.4, 433.81, 539.5, 651.63, 755.99, 861.16, 968.18, 1074.69, 1182.47, 1285.56, 1389.28, 1502.38, 1611.53, 1725] },
  ];

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '420px',
        overflow: 'hidden',
        pointerEvents: 'none',
        transform: 'scaleY(-1)',
        ...style,
      }}
    >
      {/* Converging lines SVG */}
      <svg
        viewBox="0 0 1920 462"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120%',
          height: '100%',
        }}
      >
        <defs>
          {lines.map((_, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`pgLine${i}`}
              x1={(lines[i].x1 + lines[i].x2) / 2}
              y1="0"
              x2={(lines[i].x1 + lines[i].x2) / 2}
              y2="462"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366f1" stopOpacity="0" />
              <stop offset="0.4" stopColor="#6366f1" stopOpacity="0.06" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0.12" />
            </linearGradient>
          ))}
        </defs>

        {/* Horizontal depth lines */}
        {hLines.map((h, i) => (
          <motion.path
            key={`h-${i}`}
            d={`M${h.pts.map((x) => `${x} ${h.y}`).join('L')}`}
            stroke="white"
            strokeOpacity={0.04}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.6 + i * 0.2, ease: 'easeOut' }}
          />
        ))}

        {/* Converging diagonal lines */}
        {lines.map((l, i) => (
          <motion.path
            key={`d-${i}`}
            d={`M${l.x1} ${l.y1}L${l.x2} ${l.y2}`}
            stroke={`url(#pgLine${i})`}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* Bottom glow — color-dodge blurred ellipses */}
      <div
        style={{
          position: 'absolute',
          bottom: '-140px',
          left: '-200px',
          right: '-200px',
          height: '280px',
          mixBlendMode: 'color-dodge',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2400px',
            height: '280px',
            borderRadius: '100%',
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(99, 102, 241, 0.7) 0%, rgba(6, 6, 11, 0) 100%)',
            filter: 'blur(100px)',
            WebkitFilter: 'blur(100px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1800px',
            height: '200px',
            borderRadius: '100%',
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(167, 139, 250, 0.5) 0%, rgba(6, 6, 11, 0) 100%)',
            filter: 'blur(80px)',
            WebkitFilter: 'blur(80px)',
          }}
        />
      </div>
    </div>
  );
}
