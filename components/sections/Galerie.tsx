"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import Image from "next/image";
import { Ph } from "@/components/Placeholder";
import { AnimatedRule } from "@/components/AnimatedRule";
import { asset } from "@/lib/asset";

gsap.registerPlugin(Flip);

// §6 ligne 8 — Galerie de réalisations · blanc · grille filtrable par pièce,
// avant/après. Réagencement animé via FLIP (§8 — technique FLIP exigée).

type Room = "cuisine" | "salle-de-bain" | "terrasse" | "piece-a-vivre";

const REALISATIONS: { id: string; room: Room; image: string }[] = [
  { id: "01", room: "cuisine", image: "/images/realisations/01-cuisine.jpg" },
  { id: "02", room: "salle-de-bain", image: "/images/realisations/02-sdb.jpg" },
  { id: "03", room: "terrasse", image: "/images/realisations/03-terrasse.jpg" },
  { id: "04", room: "cuisine", image: "/images/realisations/04-cuisine.jpg" },
  { id: "05", room: "piece-a-vivre", image: "/images/realisations/05-vivre.jpg" },
  { id: "06", room: "salle-de-bain", image: "/images/realisations/06-sdb.jpg" },
  { id: "07", room: "terrasse", image: "/images/realisations/07-terrasse.jpg" },
  { id: "08", room: "cuisine", image: "/images/realisations/08-cuisine.jpg" },
  { id: "09", room: "piece-a-vivre", image: "/images/realisations/09-vivre.jpg" },
];

const FILTERS = [
  { id: "all", label: "Toutes" },
  { id: "cuisine", label: "Cuisine" },
  { id: "salle-de-bain", label: "Salle de bain" },
  { id: "terrasse", label: "Terrasse" },
  { id: "piece-a-vivre", label: "Pièce à vivre" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const ROOM_LABEL: Record<Room, string> = {
  cuisine: "Cuisine",
  "salle-de-bain": "Salle de bain",
  terrasse: "Terrasse",
  "piece-a-vivre": "Pièce à vivre",
};

export function Galerie() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

  function handleFilter(filterId: FilterId) {
    if (filterId === activeFilter) return;
    const grid = gridRef.current;
    if (!grid) {
      setActiveFilter(filterId);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      flipStateRef.current = Flip.getState(
        grid.querySelectorAll(".realisation-card")
      );
    }
    setActiveFilter(filterId);
  }

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    Flip.from(state, {
      duration: 0.65,
      ease: "power2.inOut",
      absolute: true,
      scale: true,
      stagger: 0.02,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
        ),
      onLeave: (els) =>
        gsap.to(els, {
          opacity: 0,
          scale: 0.92,
          duration: 0.3,
          ease: "power2.in",
        }),
    });
    flipStateRef.current = null;
  }, [activeFilter]);

  return (
    <section id="realisations" className="relative">
      {/* En-tête */}
      <div className="mx-auto max-w-(--container-wide) px-6 pt-section-lg pb-section-md md:px-12">
        <div className="flex items-baseline justify-between pb-6">
          <p className="section-index">07 &nbsp;—&nbsp; Galerie</p>
          <p className="label-caps text-mute">
            {REALISATIONS.length} chantiers
          </p>
        </div>
        <AnimatedRule delay={100} />

        <div className="mt-section-sm grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <h2 className="display text-display-lg leading-[1.05] tracking-tight md:col-span-7">
            Chaque chantier reste, longtemps.
          </h2>
          <p className="text-lede leading-[1.55] text-mute md:col-span-5 md:self-end">
            Cuisines, salles de bain, terrasses, sols à vivre. Filtrer par
            pièce ou tout voir d'un seul tenant.
          </p>
        </div>

        {/* Filtres — soulignement terracotta animé sur l'actif */}
        <div
          className="mt-section-sm flex flex-wrap gap-x-8 gap-y-3"
          role="group"
          aria-label="Filtrer par pièce"
        >
          {FILTERS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilter(f.id)}
                aria-pressed={active}
                className={`label-caps relative py-1 transition-colors duration-short ease-soft ${
                  active ? "text-ink-soft" : "text-mute hover:text-ink-soft"
                }`}
              >
                {f.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1 left-0 h-px bg-terracotta transition-all duration-base ease-fluide ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Grille — toutes les cartes restent en DOM, hidden via CSS pour FLIP */}
      <div className="mx-auto max-w-(--container-wide) px-6 pb-section-lg md:px-12">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-8 gap-y-section-sm md:grid-cols-2 lg:grid-cols-3"
        >
          {REALISATIONS.map((r) => (
            <RealisationCard
              key={r.id}
              r={r}
              hidden={activeFilter !== "all" && r.room !== activeFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RealisationCard({
  r,
  hidden,
}: {
  r: { id: string; room: Room; image: string };
  hidden: boolean;
}) {
  const [showAvant, setShowAvant] = useState(false);

  return (
    <article
      className="realisation-card flex flex-col gap-4"
      data-room={r.room}
      style={{ display: hidden ? "none" : "flex" }}
    >
      <div className="tile-hover relative aspect-[4/3] w-full overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-base ease-fluide ${
            showAvant ? "opacity-55 saturate-0" : ""
          }`}
        >
          <Image
            src={asset(r.image)}
            alt={`Réalisation ${ROOM_LABEL[r.room]}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowAvant((s) => !s)}
          className="label-caps absolute bottom-3 left-3 bg-ink-soft px-3 py-1.5 text-paper-soft transition-colors duration-short ease-soft hover:bg-terracotta"
          aria-pressed={showAvant}
          aria-label={`Basculer avant/après pour ${ROOM_LABEL[r.room]} ${r.id}`}
        >
          {showAvant ? "Voir après" : "Voir avant"}
        </button>
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-display-sm leading-[1.1] tracking-tight">
            <Ph name={`REALISATION_${r.id}_NOM`} />
          </h3>
          <span className="tech-spec text-mute">
            <Ph name={`REALISATION_${r.id}_ANNEE`} />
          </span>
        </div>
        <p className="tech-spec mt-2">{ROOM_LABEL[r.room]}</p>
      </div>
    </article>
  );
}
