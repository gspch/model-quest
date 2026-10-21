// Logo model.quest : puce neuronale + curseur de terminal clignotant.
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="30" height="30" viewBox="0 0 32 32" className="shrink-0" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="7"
          fill="none"
          stroke="var(--neon)"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <circle cx="11" cy="12" r="2.2" fill="var(--neon)" />
        <circle cx="21" cy="12" r="2.2" fill="var(--cyan-glow)" />
        <circle cx="16" cy="21" r="2.2" fill="var(--neon)" opacity="0.85" />
        <path
          d="M11 12 L21 12 M11 12 L16 21 M21 12 L16 21"
          stroke="var(--neon)"
          strokeWidth="1"
          opacity="0.55"
        />
        <rect x="24.5" y="22" width="4" height="2.4" rx="0.6" fill="var(--neon)">
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
        </rect>
      </svg>
      <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
        model<span className="text-primary text-glow">.quest</span>
        <span className="ml-1.5 hidden rounded border border-primary/40 px-1 py-px font-mono text-[9px] text-primary sm:inline">
          ONLINE
        </span>
      </span>
    </span>
  );
}
