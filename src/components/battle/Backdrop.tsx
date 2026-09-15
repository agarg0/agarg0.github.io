const HORIZON = 500;

const CLOUDS = [
  { cx: 60, cy: 470, rx: 300, ry: 46 },
  { cx: 420, cy: 490, rx: 340, ry: 52 },
  { cx: 820, cy: 476, rx: 380, ry: 48 },
  { cx: 1220, cy: 494, rx: 350, ry: 54 },
  { cx: 1560, cy: 472, rx: 300, ry: 46 },
];

export function Backdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#06081a" />
          <stop offset="0.55" stopColor="#151c44" />
          <stop offset="1" stopColor="#4a5390" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b5288" />
          <stop offset="0.35" stopColor="#363c68" />
          <stop offset="1" stopColor="#22264a" />
        </linearGradient>
        <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-80%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="1600" height={HORIZON} fill="url(#sky)" />
      <rect y={HORIZON - 8} width="1600" height={900 - HORIZON + 8} fill="url(#ground)" />
      <g filter="url(#soft)" fill="#8d95cc" opacity="0.55">
        {CLOUDS.map((c, i) => (
          <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} />
        ))}
      </g>
      <rect width="1600" height="900" fill="url(#vignette)" />
    </svg>
  );
}
