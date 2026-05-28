"use client";

import { useInView } from "@/lib/useInView";

// Option C — Le filet de section qui se trace au scroll. Drop-in remplacement
// pour les <div aria-hidden className="h-px w-full bg-rule" /> statiques.

type Props = {
  delay?: number;
  dark?: boolean;
};

export function AnimatedRule({ delay = 0, dark = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} data-revealed={inView} aria-hidden="true">
      <div
        className={`reveal-rule h-px w-full ${dark ? "bg-rule-dark" : "bg-rule"}`}
        style={{ transitionDelay: `${delay}ms` }}
      />
    </div>
  );
}
