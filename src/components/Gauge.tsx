export function Gauge({
  label,
  value,
  max = 5,
  invert = false,
  hint,
}: {
  label: string;
  value: number;
  max?: number;
  invert?: boolean; // true = plus bas c'est mieux (latence)
  hint?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const good = invert ? value <= 2 : value >= 4;
  const mid = invert ? value <= 3.5 : value >= 2.5;
  const barClass = good ? "bg-primary" : mid ? "bg-amber-glow" : "bg-destructive";
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-mono text-xs text-muted-foreground">{label}</span>
        {hint ? <span className="font-mono text-xs text-foreground">{hint}</span> : null}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
