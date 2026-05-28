"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mini-mur hexagonal qui se construit hex par hex au scroll.
// C'est la mécanique du Process (§6 ligne 7) réutilisée en plus petit,
// à placer en décor de fond dans les sections blanches.
//
// On utilise une géométrie pointy-top régulière (W/H = √3/2), positionnement
// en pourcentages relatifs à la bounding box du mur, calculée précisément
// pour que le mur fasse exactement la taille du conteneur.

type Props = {
  rows?: number;
  cols?: number;
  className?: string;
  opacity?: number;
  tone?: "ink" | "paper";
};

// Géométrie hex pointy-top : largeur across-flats = HEX_W, hauteur across-
// points = HEX_W × 2/√3. Pas vertical 0.75 × hauteur.
const HEX_W = 18;
const HEX_H = HEX_W * (2 / Math.sqrt(3));
const ROW_STEP = HEX_H * 0.75;
const ROW_OFFSET = HEX_W / 2;

export function BackgroundTileWall({
  rows = 4,
  cols = 4,
  className = "",
  opacity = 0.16,
  tone = "ink",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // En reduced-motion : tout est visible d'un coup
      el.querySelectorAll<HTMLElement>(".bg-tile").forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "scale(1)";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".bg-tile");
      gsap.set(tiles, { opacity: 0, scale: 0.78 });
      gsap.to(tiles, {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.5,
        stagger: { each: 0.04 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Génère les positions des hex pour la grille donnée
  const hexes: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      hexes.push({
        x: c * HEX_W + (r % 2 === 1 ? ROW_OFFSET : 0),
        y: r * ROW_STEP,
      });
    }
  }

  // Bounding box exacte du mur (en unités relatives) pour l'aspect-ratio
  const bbWidth = cols * HEX_W + (rows > 1 ? ROW_OFFSET : 0);
  const bbHeight = HEX_H + (rows - 1) * ROW_STEP;

  const color =
    tone === "ink"
      ? `rgba(26, 25, 22, ${opacity})`
      : `rgba(246, 244, 240, ${opacity})`;

  return (
    <div
      ref={ref}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${bbWidth} / ${bbHeight}` }}
      >
        {hexes.map((h, i) => (
          <div
            key={i}
            className="bg-tile absolute"
            style={{
              left: `${(h.x / bbWidth) * 100}%`,
              top: `${(h.y / bbHeight) * 100}%`,
              width: `${(HEX_W / bbWidth) * 100}%`,
              height: `${(HEX_H / bbHeight) * 100}%`,
              backgroundColor: color,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
