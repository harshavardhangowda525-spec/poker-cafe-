import { useId } from 'react';
import { Ball, BallDefs, type BallColor } from './Ball';

/**
 * A cinematic, low-key snooker table rendered in SVG (viewBox 1600×900).
 * It is the base visual for the hero and the table imagery, so the page never
 * depends on a remote photo loading. `layer` splits the scene so the hero can
 * move the foreground (cue + cue ball) at a different parallax speed.
 */
type Props = {
  layer?: 'back' | 'front' | 'full';
  className?: string;
  /** SVG preserveAspectRatio — slice fills the box like object-fit: cover */
  align?: string;
};

const W = 1600;
const H = 900;

function Pack({ id }: { id: string }) {
  const balls: { x: number; y: number; r: number }[] = [];
  for (let row = 0; row < 5; row++) {
    const r = 11.5 - row * 0.45;
    const y = 498 - row * 12.5;
    const spacing = r * 2.05;
    for (let i = 0; i <= row; i++) {
      balls.push({ x: 800 + (i - row / 2) * spacing, y, r });
    }
  }
  // draw back rows first so nearer balls overlap correctly
  return (
    <g filter={`url(#${id}-blur-far)`}>
      {[...balls].reverse().map((b, i) => (
        <Ball key={i} id={id} cx={b.x} cy={b.y} r={b.r} color="red" />
      ))}
    </g>
  );
}

function Back({ id }: { id: string }) {
  const spots: { x: number; y: number; r: number; c: BallColor; far?: boolean; near?: boolean }[] = [
    { x: 800, y: 446, r: 9.5, c: 'black', far: true },
    { x: 800, y: 524, r: 12.5, c: 'pink', far: true },
    { x: 800, y: 598, r: 15.5, c: 'blue' },
    { x: 452, y: 806, r: 27, c: 'yellow', near: true },
    { x: 760, y: 812, r: 27, c: 'brown', near: true },
    { x: 1408, y: 826, r: 28, c: 'green', near: true },
  ];
  return (
    <>
      {/* Atmosphere */}
      <rect width={W} height={H} fill="#070908" />
      <ellipse cx="800" cy="300" rx="900" ry="520" fill={`url(#${id}-room)`} />

      {/* Rails & cushions (perspective) */}
      <polygon points="262,388 1338,388 1520,900 80,900" fill="#140d08" />
      <polygon points="262,388 1338,388 1330,394 270,394" fill="#C5A66A" opacity="0.35" />
      <polygon points="292,406 1308,406 1990,1000 -390,1000" fill="#0a3f2a" />
      {/* Felt */}
      <polygon points="326,428 1274,428 2000,1000 -400,1000" fill={`url(#${id}-felt)`} />
      <polygon points="326,428 1274,428 2000,1000 -400,1000" fill={`url(#${id}-pool)`} />
      {/* Far cushion lip */}
      <polygon points="300,410 1300,410 1274,428 326,428" fill="#0c5a3c" />
      <line x1="326" y1="428" x2="1274" y2="428" stroke="#000" strokeOpacity="0.35" strokeWidth="2" />
      {/* Baulk line & D */}
      <line x1="40" y1="760" x2="1560" y2="760" stroke="#F5F1E8" strokeOpacity="0.16" strokeWidth="1.5" />
      <path d="M 610 760 A 190 60 0 0 0 990 760" fill="none" stroke="#F5F1E8" strokeOpacity="0.14" strokeWidth="1.5" />
      {/* Far pockets */}
      <ellipse cx="298" cy="410" rx="24" ry="8" fill="#000" />
      <ellipse cx="1302" cy="410" rx="24" ry="8" fill="#000" />

      <Pack id={id} />
      {spots.map((s, i) => (
        <Ball
          key={i}
          id={id}
          cx={s.x}
          cy={s.y}
          r={s.r}
          color={s.c}
          blur={s.near ? `url(#${id}-blur-near)` : s.far ? `url(#${id}-blur-far)` : undefined}
        />
      ))}

      {/* Lamp: shade, glowing underside and light cone */}
      <polygon points="600,72 1000,72 1500,640 100,640" fill={`url(#${id}-cone)`} filter={`url(#${id}-blur-cone)`} />
      <polygon points="560,-10 1040,-10 1004,70 596,70" fill="#0d0f0e" />
      <polygon points="560,-10 1040,-10 1036,-2 564,-2" fill="#C5A66A" opacity="0.3" />
      <ellipse cx="800" cy="72" rx="206" ry="9" fill="#FFF4D8" opacity="0.9" filter={`url(#${id}-blur-glow)`} />
    </>
  );
}

function Front({ id }: { id: string }) {
  // Cue lies along a line from the tip (just behind the cue ball) to bottom-right.
  return (
    <>
      <g transform="translate(1104 762) rotate(23.4)">
        {/* soft shadow on the felt */}
        <polygon points="40,22 900,52 900,92 40,34" fill="#000" opacity="0.45" filter={`url(#${id}-blur-near)`} />
        <rect x="0" y="-4.5" width="7" height="9" rx="2" fill="#3E6FA8" />
        <polygon points="7,-4.6 24,-4.9 24,4.9 7,4.6" fill="#F3EEE2" />
        <polygon points="24,-4.9 430,-8.5 430,8.5 24,4.9" fill={`url(#${id}-maple)`} />
        <polygon points="430,-8.5 446,-8.8 446,8.8 430,8.5" fill="#C5A66A" />
        <polygon points="446,-8.8 980,-14 980,14 446,8.8" fill={`url(#${id}-ebony)`} />
        <polygon points="600,-10.3 640,-10.7 640,10.7 600,10.3" fill="#C5A66A" opacity="0.55" />
      </g>
      <Ball id={id} cx={1062} cy={742} r={34} color="cue" />
    </>
  );
}

export default function SnookerScene({ layer = 'full', className, align = 'xMidYMid slice' }: Props) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={align} className={className} aria-hidden="true" focusable="false">
      <BallDefs id={id} />
      <defs>
        <radialGradient id={`${id}-room`} cx="50%" cy="20%" r="60%">
          <stop offset="0" stopColor="#1E4A37" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#102A20" stopOpacity="0.25" />
          <stop offset="1" stopColor="#0A0C0B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-felt`} cx="50%" cy="22%" r="85%">
          <stop offset="0" stopColor="#139A66" />
          <stop offset="0.35" stopColor="#0C6E49" />
          <stop offset="0.75" stopColor="#07432C" />
          <stop offset="1" stopColor="#031a11" />
        </radialGradient>
        <radialGradient id={`${id}-pool`} cx="50%" cy="25%" r="45%">
          <stop offset="0" stopColor="#E9FFF3" stopOpacity="0.16" />
          <stop offset="1" stopColor="#E9FFF3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-cone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6E0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FFF6E0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-maple`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d5333" />
          <stop offset="0.35" stopColor="#E8CFA0" />
          <stop offset="0.6" stopColor="#C9A774" />
          <stop offset="1" stopColor="#4b3820" />
        </linearGradient>
        <linearGradient id={`${id}-ebony`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050403" />
          <stop offset="0.35" stopColor="#3b2a1e" />
          <stop offset="0.6" stopColor="#1b130d" />
          <stop offset="1" stopColor="#020101" />
        </linearGradient>
        <filter id={`${id}-blur-far`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
        <filter id={`${id}-blur-near`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <filter id={`${id}-blur-cone`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id={`${id}-blur-glow`} x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {layer !== 'front' && <Back id={id} />}
      {layer !== 'back' && <Front id={id} />}
    </svg>
  );
}
