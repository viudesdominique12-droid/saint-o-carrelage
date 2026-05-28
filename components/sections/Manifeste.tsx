"use client";

import { useInView } from "@/lib/useInView";
import { BackgroundTileWall } from "@/components/BackgroundTileWall";

// §6 ligne 3 — Manifeste blanc · une phrase éditoriale forte, très grand
// texte, beaucoup de vide. Aligné gauche dans la grille (jamais centré, §3.1).
// Phrase : aucune affirmation chiffrée, aucun mensonge — un idiome du métier.

export function Manifeste() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      data-revealed={inView}
      className="relative overflow-hidden py-section-xl"
      aria-labelledby="manifeste-title"
      id="manifeste"
    >
      {/* Mini-mur hex qui se construit au scroll — décor de fond */}
      <BackgroundTileWall
        className="absolute top-16 right-4 z-0 hidden w-[320px] md:block lg:w-[380px]"
        rows={5}
        cols={5}
        opacity={0.14}
      />

      <div className="relative z-10 mx-auto max-w-(--container-wide) px-6 md:px-12">
        {/* En-tête éditorial — index gauche, étiquette droite, filet qui se trace */}
        <div className="flex items-baseline justify-between pb-6">
          <p className="section-index">02 &nbsp;—&nbsp; Manifeste</p>
          <p className="label-caps text-mute">L'atelier</p>
        </div>
        <div
          aria-hidden
          className="reveal-rule h-px w-full bg-rule"
          style={{ transitionDelay: "100ms" }}
        />

        {/* La phrase — beaucoup de vide vertical par mt et le py-section-xl du parent */}
        <h2
          id="manifeste-title"
          className="display mt-section-lg text-display-2xl leading-[0.98] tracking-tight md:mt-section-xl"
        >
          <span className="block overflow-hidden">
            <span className="reveal-line" style={{ transitionDelay: "200ms" }}>
              On ne triche pas
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-line" style={{ transitionDelay: "400ms" }}>
              avec un carreau.
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
