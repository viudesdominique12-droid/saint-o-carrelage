"use client";

import { useEffect, useRef, useState } from "react";

// Hook réutilisable pour les sections : détecte l'entrée en viewport et bascule
// data-revealed="true" sur le wrapper. Le CSS prend le relais (.reveal-line,
// .reveal-fade dans globals.css). Une seule observation par mount — pas de bounce.

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // SSR / vieux navigateurs : on déclenche directement.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px", ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}
