/**
 * Realistic SVG billiard ball: base colour, soft shading, specular highlight and contact shadow.
 * Place <BallDefs id=...> once inside an <svg> and pass the same id to each <Ball>.
 */
export const BALL_COLORS = {
  cue: '#EFEADF',
  red: '#B3121B',
  yellow: '#E2B11C',
  green: '#0F7A3E',
  brown: '#6A3A1C',
  blue: '#1D4FA6',
  pink: '#E58AA6',
  black: '#121212',
} as const;

export type BallColor = keyof typeof BALL_COLORS;

export function BallDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-shade`} cx="38%" cy="32%" r="72%">
        <stop offset="0" stopColor="#000" stopOpacity="0" />
        <stop offset="0.55" stopColor="#000" stopOpacity="0.05" />
        <stop offset="0.85" stopColor="#000" stopOpacity="0.45" />
        <stop offset="1" stopColor="#000" stopOpacity="0.75" />
      </radialGradient>
      <radialGradient id={`${id}-spec`} cx="34%" cy="27%" r="22%">
        <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="#fff" stopOpacity="0.35" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-bounce`} cx="62%" cy="88%" r="35%">
        <stop offset="0" stopColor="#3FD69B" stopOpacity="0.28" />
        <stop offset="1" stopColor="#3FD69B" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#000" stopOpacity="0.75" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

type BallProps = {
  id: string;
  cx: number;
  cy: number;
  r: number;
  color: BallColor;
  /** Light comes from above, so the shadow sits slightly forward and right */
  shadow?: boolean;
  blur?: string;
};

export function Ball({ id, cx, cy, r, color, shadow = true, blur }: BallProps) {
  return (
    <g filter={blur}>
      {shadow && <ellipse cx={cx + r * 0.25} cy={cy + r * 0.92} rx={r * 1.15} ry={r * 0.32} fill={`url(#${id}-shadow)`} />}
      <circle cx={cx} cy={cy} r={r} fill={BALL_COLORS[color]} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-bounce)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-shade)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-spec)`} />
    </g>
  );
}
