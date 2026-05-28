"use client";

import { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { Ph } from "@/components/Placeholder";
import { BackgroundTileWall } from "@/components/BackgroundTileWall";

// §6 ligne 11 — Preuve sociale · blanc · note Google, avis, décennale, SIRET,
// chiffres. « Pas en bandeau criard » (§9) — layout éditorial 3 colonnes :
// note Google chiffrée + 3 témoignages + bloc garanties légales.

export function PreuveSociale() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      data-revealed={inView}
      id="preuve"
      className="relative overflow-hidden"
      aria-labelledby="preuve-title"
    >
      {/* Mini-mur hex qui se construit au scroll — décor de fond */}
      <BackgroundTileWall
        className="absolute top-12 left-4 z-0 hidden w-[300px] md:block lg:w-[360px]"
        rows={4}
        cols={4}
        opacity={0.13}
      />

      <div className="relative z-10 mx-auto max-w-(--container-wide) px-6 pt-section-lg pb-section-lg md:px-12">
        {/* En-tête */}
        <div className="flex items-baseline justify-between pb-6">
          <p className="section-index">10 &nbsp;—&nbsp; En confiance</p>
          <p className="label-caps text-mute">Preuve sociale</p>
        </div>
        <div
          aria-hidden
          className="reveal-rule h-px w-full bg-rule"
          style={{ transitionDelay: "100ms" }}
        />

        <h2
          id="preuve-title"
          className="display mt-section-sm max-w-(--container-narrow) text-display-lg leading-[1.05] tracking-tight"
        >
          <span className="block overflow-hidden">
            <span
              className="reveal-line"
              style={{ transitionDelay: "200ms" }}
            >
              Tout se vérifie.
            </span>
          </span>
        </h2>

        {/* Grille 3 colonnes — Note / Témoignages / Garanties */}
        <div className="mt-section-md grid gap-x-10 gap-y-section-sm md:grid-cols-12">
          {/* Colonne 1 — Note Google */}
          <div
            className="reveal-fade md:col-span-3"
            style={{ transitionDelay: "400ms" }}
          >
            <p className="label-caps mb-6">Note Google</p>
            <div className="flex items-baseline gap-3">
              <span className="display text-display-xl leading-none tracking-tight">
                <Ph name="NOTE_GOOGLE" />
              </span>
              <span className="tech-spec text-mute">/&nbsp;5</span>
            </div>
            <div className="mt-4">
              <Stars />
            </div>
            <p className="tech-spec mt-4 text-mute">
              sur&nbsp;
              <Ph name="NB_AVIS_GOOGLE" />
              &nbsp;avis
            </p>
            <a
              href="#"
              className="link-edito label-caps mt-6 inline-block"
            >
              Voir sur Google →
            </a>
          </div>

          {/* Colonne 2 — Témoignages */}
          <div
            className="reveal-fade md:col-span-6"
            style={{ transitionDelay: "550ms" }}
          >
            <p className="label-caps mb-6">Témoignages</p>
            <div className="space-y-section-sm">
              <Testimonial id="01" />
              <Testimonial id="02" />
              <Testimonial id="03" />
            </div>
          </div>

          {/* Colonne 3 — Garanties */}
          <div
            className="reveal-fade md:col-span-3"
            style={{ transitionDelay: "700ms" }}
          >
            <p className="label-caps mb-6">Garanties</p>
            <dl className="space-y-6">
              <DataRow k="Décennale" v={<Ph name="ASSUREUR" />} />
              <DataRow k="SIRET" v={<Ph name="SIRET" />} />
              <DataRow k="Fondation" v="2009" />
              <DataRow k="Zone" v={<Ph name="ZONE_INTERVENTION" />} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="fill-terracotta"
        >
          <path d="M12 2L14.85 8.66 22 9.27l-5.46 4.73L18.18 21 12 17.27 5.82 21l1.64-6.99L2 9.27l7.15-.61L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonial({ id }: { id: string }) {
  return (
    <blockquote>
      <p className="text-lede leading-[1.5] text-ink-soft">
        «&nbsp;<Ph name={`AVIS_${id}_TEXTE`} />&nbsp;»
      </p>
      <footer className="tech-spec mt-4 flex flex-wrap gap-x-3 gap-y-1 text-mute">
        <span>—</span>
        <Ph name={`AVIS_${id}_AUTEUR`} />
        <span>·</span>
        <Ph name={`AVIS_${id}_PROJET`} />
        <span>·</span>
        <Ph name={`AVIS_${id}_ANNEE`} />
      </footer>
    </blockquote>
  );
}

function DataRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div>
      <dt className="tech-spec text-mute">{k}</dt>
      <dd className="mt-1 text-body text-ink-soft">{v}</dd>
    </div>
  );
}
