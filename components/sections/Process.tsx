"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/lib/useInView";
import { AnimatedRule } from "@/components/AnimatedRule";

gsap.registerPlugin(ScrollTrigger);

// §6 ligne 7 — Process · blanc · étapes numérotées + animation « mur qui se
// carrelle » (§7.2 idée 3). Mur hexagonal régulier qui se construit hex par
// hex au scroll, sticky pendant que les 5 étapes défilent à gauche.

const STEPS = [
  {
    title: "Devis & conseil",
    body: "Visite sur place, prise de cotes, choix des matières. Estimation détaillée et délai annoncé avant le moindre carton.",
  },
  {
    title: "Préparation du support",
    body: "Ragréage, primaire d'accroche, étanchéité quand le local l'exige. C'est ici que tout se joue — un carreau ne sauve jamais un support fautif.",
  },
  {
    title: "Calepinage",
    body: "Pose à blanc, point de départ, sens du motif, gestion des coupes en périphérie. Trois minutes de réflexion économisent trois heures de découpe.",
  },
  {
    title: "Pose",
    body: "Carreau par carreau. Mortier-colle adapté, double encollage en grand format, contrôle au niveau à chaque rang. Le rythme reste régulier, le joint reste constant.",
  },
  {
    title: "Joints & réception",
    body: "Jointoiement après séchage du mortier, nettoyage à l'éponge sèche, contrôle visuel et tactile, livraison du chantier propre.",
  },
];

// ---------- Géométrie hexagonale (pointy-top, régulière) ----------
// Largeur across-flats = 18 % du conteneur, hauteur across-points = 18 × 2/√3.
// Pas de décalage 1/2 largeur sur les rangées impaires (honeycomb standard).
const COLS = 5;
const ROWS = 6;
const HEX_W = 18;
const HEX_H = HEX_W * (2 / Math.sqrt(3));
const ROW_STEP = HEX_H * 0.75;
const ROW_OFFSET = HEX_W / 2;

type Hex = { x: number; y: number; tone: string };

// Tons par index : surtout ink, quelques nuances, UN accent terracotta au
// centre du mur. Déterministe — pas d'hydratation mismatch.
function toneFor(r: number, c: number, total: number, idx: number): string {
  // Position centrale → accent terracotta (juste UN)
  const accentR = Math.floor(ROWS / 2);
  const accentC = Math.floor(COLS / 2);
  if (r === accentR && c === accentC) return "accent";
  // Distribution stable des 4 tons
  return String((idx * 7 + 3) % 4);
}

const HEXES: Hex[] = (() => {
  const list: Hex[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c;
      list.push({
        x: c * HEX_W + (r % 2 === 1 ? ROW_OFFSET : 0),
        y: r * ROW_STEP,
        tone: toneFor(r, c, ROWS * COLS, idx),
      });
    }
  }
  return list;
})();

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wall = wallRef.current;
    if (!section || !wall) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(wall.querySelectorAll(".hex"), {
        opacity: 1,
        scale: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".hex");
      gsap.set(tiles, { opacity: 0, scale: 0.85, y: 6 });
      gsap.to(tiles, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: { each: 0.025 },
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 55%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative">
      {/* En-tête */}
      <div className="mx-auto max-w-(--container-wide) px-6 pt-section-lg pb-section-md md:px-12">
        <div className="flex items-baseline justify-between pb-6">
          <p className="section-index">06 &nbsp;—&nbsp; Process</p>
          <p className="label-caps text-mute">5 étapes</p>
        </div>
        <AnimatedRule delay={100} />

        <div className="mt-section-sm grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <h2 className="display text-display-lg leading-[1.05] tracking-tight md:col-span-7">
            Du devis au joint final.
          </h2>
          <p className="text-lede leading-[1.55] text-mute md:col-span-5 md:self-end">
            Cinq étapes, dans l'ordre. Pas de précipitation, pas de raccourcis.
          </p>
        </div>
      </div>

      {/* Grille principale : étapes à gauche / mur hexagonal sticky à droite */}
      <div className="mx-auto max-w-(--container-wide) px-6 pb-section-lg md:px-12">
        <div className="grid gap-x-10 gap-y-section-md md:grid-cols-12">
          {/* Colonne étapes */}
          <div className="md:col-span-5">
            {STEPS.map((step, i) => (
              <ProcessStep
                key={step.title}
                index={i + 1}
                step={step}
                last={i === STEPS.length - 1}
              />
            ))}
          </div>

          {/* Colonne mur — sticky desktop, en-dessous mobile */}
          <div className="order-first md:order-none md:col-span-6 md:col-start-7">
            <div className="md:sticky md:top-28">
              <HexWall ref={wallRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HexWall({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="tech-spec text-mute">
        Pavage hexagonal &nbsp;·&nbsp; 30 pièces &nbsp;·&nbsp; pose au scroll
      </p>
      <div
        ref={ref}
        className="relative w-full"
        style={{ aspectRatio: "5 / 6.2" }}
      >
        {HEXES.map((h, i) => (
          <div
            key={i}
            className="hex absolute"
            data-tone={h.tone}
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${HEX_W}%`,
              height: `${HEX_H}%`,
            }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({
  index,
  step,
  last,
}: {
  index: number;
  step: (typeof STEPS)[number];
  last: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const n = String(index).padStart(2, "0");

  return (
    <article
      ref={ref}
      data-revealed={inView}
      className={`py-section-md ${last ? "" : "border-b border-rule"}`}
    >
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-display-sm leading-none text-mute">
          {n}
        </span>
        <p className="label-caps">Étape</p>
      </div>

      <h3 className="display mt-6 text-display-md leading-[1.02] tracking-tight">
        <span className="block overflow-hidden">
          <span className="reveal-line" style={{ transitionDelay: "100ms" }}>
            {step.title}
          </span>
        </span>
      </h3>

      <p
        className="reveal-fade mt-6 max-w-(--container-prose) text-lede leading-[1.55] text-mute"
        style={{ transitionDelay: "300ms" }}
      >
        {step.body}
      </p>
    </article>
  );
}
