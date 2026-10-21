import { useEffect, useState } from "react";

// Effet de frappe terminal : le texte s'écrit caractère par caractère, avec curseur clignotant.
export function Typewriter({
  text,
  speed = 28,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      return;
    }
    setShown(0);
    const id = window.setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      {text.slice(0, shown)}
      <span className="animate-pulse-neon text-primary">▌</span>
    </span>
  );
}
