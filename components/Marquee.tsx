const WORDS = [
  "creative coding",
  "frontend craft",
  "next.js",
  "typescript",
  "micro-interazioni",
  "expo",
  "node.js",
  "da zero a uno",
];

export default function Marquee() {
  const row = (
    <span className="marquee-track">
      {WORDS.map((w) => (
        <span key={w} className="label whitespace-nowrap">
          {w} <span className="text-spark">✳</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="marquee border-y border-line py-4"
      aria-hidden="true"
    >
      {row}
      {row}
    </div>
  );
}
