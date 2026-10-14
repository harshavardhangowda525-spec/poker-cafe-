import { useId } from 'react';
import { Ball, BallDefs } from './Ball';

/**
 * Atmospheric fallback art for image slots (café or lounge).
 * Shown underneath every photo, so a slot is never empty or broken.
 */
type Props = { tone: 'cafe' | 'lounge'; variant?: 'cup' | 'glass' | 'plate'; className?: string };

const BOKEH = [
  [140, 120, 70], [420, 80, 46], [690, 160, 90], [980, 70, 54], [1180, 210, 80],
  [260, 330, 40], [860, 300, 36], [1320, 120, 60], [60, 420, 50], [1040, 420, 44],
];

export default function AmbientScene({ tone, variant = 'cup', className }: Props) {
  const id = useId().replace(/:/g, '');
  const warm = tone === 'cafe';
  return (
    <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <BallDefs id={id} />
      <defs>
        <radialGradient id={`${id}-bg`} cx="45%" cy="35%" r="80%">
          <stop offset="0" stopColor={warm ? '#5a3a1c' : '#174d37'} />
          <stop offset="0.55" stopColor={warm ? '#21150c' : '#0c2219'} />
          <stop offset="1" stopColor="#0A0C0B" />
        </radialGradient>
        <radialGradient id={`${id}-dot`}>
          <stop offset="0" stopColor={warm ? '#FFD9A0' : '#F7E2B4'} stopOpacity="0.55" />
          <stop offset="0.6" stopColor={warm ? '#FFB45A' : '#C5A66A'} stopOpacity="0.15" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a1410" />
          <stop offset="0.4" stopColor="#efe7d6" />
          <stop offset="0.75" stopColor="#cfc4ae" />
          <stop offset="1" stopColor="#3a332a" />
        </linearGradient>
        <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      <rect width="1400" height="900" fill={`url(#${id}-bg)`} />
      {BOKEH.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={`url(#${id}-dot)`} />
      ))}
      {warm ? (
        <g>
          {/* table top */}
          <rect x="0" y="640" width="1400" height="260" fill="#120c08" />
          <rect x="0" y="636" width="1400" height="6" fill="#C5A66A" opacity="0.25" />
          {variant === 'cup' && (
            <g>
          {/* cup + saucer */}
          <ellipse cx="700" cy="660" rx="230" ry="34" fill="#000" opacity="0.5" filter={`url(#${id}-soft)`} />
          <ellipse cx="700" cy="640" rx="210" ry="30" fill="#e9e1cf" />
          <path d="M560 420 h280 l-24 200 a40 26 0 0 1 -40 20 h-152 a40 26 0 0 1 -40 -20 z" fill={`url(#${id}-cup)`} />
          <path d="M836 460 c70 0 70 110 -14 116" fill="none" stroke="#d8cfbb" strokeWidth="20" />
          <ellipse cx="700" cy="420" rx="140" ry="20" fill="#3b2412" />
          <ellipse cx="690" cy="416" rx="70" ry="8" fill="#a8774a" opacity="0.7" />
          {/* steam */}
          {[640, 700, 760].map((x, i) => (
            <path key={x} d={`M${x} 380 c-30 -50 30 -80 0 -130 c-25 -40 20 -70 0 -110`} fill="none" stroke="#F5F1E8" strokeOpacity={0.12 + i * 0.04} strokeWidth="6" strokeLinecap="round" filter={`url(#${id}-soft)`} />
          ))}
            </g>
          )}
          {variant === 'glass' && (
            <g>
              <ellipse cx="700" cy="650" rx="150" ry="22" fill="#000" opacity="0.5" filter={`url(#${id}-soft)`} />
              <path d="M590 250 h220 l-22 390 a20 12 0 0 1 -20 10 h-136 a20 12 0 0 1 -20 -10 z" fill="#F5F1E8" fillOpacity="0.08" stroke="#F5F1E8" strokeOpacity="0.35" strokeWidth="3" />
              <path d="M598 360 h204 l-15 278 a18 10 0 0 1 -18 8 h-138 a18 10 0 0 1 -18 -8 z" fill="#C9781F" opacity="0.75" />
              {[[640, 400], [720, 430], [670, 480], [745, 520]].map(([x, y]) => (
                <rect key={x + y} x={x} y={y} width="46" height="40" rx="8" fill="#fff" opacity="0.28" transform={`rotate(14 ${x} ${y})`} />
              ))}
              <line x1="742" y1="150" x2="700" y2="600" stroke="#0E8F61" strokeWidth="12" strokeLinecap="round" />
              <circle cx="612" cy="262" r="30" fill="#7FB23A" opacity="0.85" />
              <rect x="604" y="262" width="8" height="380" fill="#fff" opacity="0.18" />
            </g>
          )}
          {variant === 'plate' && (
            <g>
              <ellipse cx="700" cy="660" rx="300" ry="50" fill="#000" opacity="0.5" filter={`url(#${id}-soft)`} />
              <ellipse cx="700" cy="630" rx="290" ry="56" fill="#ece4d3" />
              <ellipse cx="700" cy="622" rx="220" ry="38" fill="#d9cfba" />
              {[[600, 560, -18], [700, 548, 6], [800, 566, 24]].map(([x, y, r]) => (
                <path key={x} d={`M${x - 70} ${y + 50} L${x} ${y - 60} L${x + 70} ${y + 50} z`} fill="#D89A3C" stroke="#9E6420" strokeWidth="4" transform={`rotate(${r} ${x} ${y})`} />
              ))}
              <ellipse cx="900" cy="600" rx="44" ry="18" fill="#9b2a1c" />
            </g>
          )}
        </g>
      ) : (
        <g>
          {/* pendant lamps */}
          {[350, 1050].map(x => (
            <g key={x}>
              <line x1={x} y1="0" x2={x} y2="180" stroke="#2a2a2a" strokeWidth="3" />
              <path d={`M${x - 120} 260 L${x - 60} 180 h120 L${x + 120} 260 z`} fill="#0b0d0c" />
              <ellipse cx={x} cy="262" rx="118" ry="10" fill="#FFF1CF" opacity="0.85" filter={`url(#${id}-soft)`} />
              <path d={`M${x - 118} 262 L${x - 300} 900 h600 L${x + 118} 262 z`} fill="#FFF1CF" opacity="0.05" />
            </g>
          ))}
          {/* table edge + resting balls */}
          <polygon points="0,700 1400,700 1400,900 0,900" fill="#0a5a3b" />
          <rect x="0" y="680" width="1400" height="22" fill="#140d08" />
          <Ball id={id} cx={520} cy={780} r={44} color="red" />
          <Ball id={id} cx={640} cy={800} r={46} color="yellow" />
          <Ball id={id} cx={900} cy={790} r={45} color="cue" />
          {/* cue rack silhouettes */}
          {[1180, 1210, 1240, 1270].map(x => (
            <line key={x} x1={x} y1="300" x2={x + 6} y2="680" stroke="#2d2117" strokeWidth="7" strokeLinecap="round" />
          ))}
        </g>
      )}
    </svg>
  );
}
