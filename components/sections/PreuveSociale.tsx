"use client";

import { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { Ph } from "@/components/Placeholder";

// §6 ligne 11 — Preuve sociale · design atypique : mur de carreaux céramiques.
// Chaque avis est un carreau d'opus romain (tailles mixtes), légère imperfection
// de rotation pour le côté "fait main", gradient subtil pour évoquer l'émail.

// Lien Google Maps officiel — share.google envoyé par l'utilisateur.
const GOOGLE_MAPS_URL = "https://share.google/YBFTXYrvOjJxyBcfb";

type TestimonialSize = "lg" | "md" | "sm";

// Tilt subtil par tuile — au plus 0.3° pour ne pas casser la lecture.
const TESTIMONIALS: { id: string; size: TestimonialSize; tilt: number }[] = [
  { id: "01", size: "lg", tilt: -0.2 },
  { id: "02", size: "md", tilt: 0.3 },
  { id: "03", size: "lg", tilt: 0.15 },
  { id: "04", size: "sm", tilt: -0.3 },
  { id: "05", size: "md", tilt: 0.2 },
];

const SIZE_CLASS: Record<TestimonialSize, string> = {
  lg: "md:col-span-7",
  md: "md:col-span-5",
  sm: "md:col-span-4",
};

export function PreuveSociale() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      data-revealed={inView}
      id="preuve"
      className="bg-paper"
      aria-labelledby="preuve-title"
    >
      <div className="mx-auto max-w-(--container-wide) px-6 pt-section-lg pb-section-lg md:px-12">
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

        {/* Top — Note Google + Garanties, juxtaposés */}
        <div className="mt-section-md grid gap-x-10 gap-y-section-sm md:grid-cols-12">
          {/* Note Google */}
          <div
            className="reveal-fade md:col-span-5"
            style={{ transitionDelay: "400ms" }}
          >
            <p className="label-caps mb-5">Note Google</p>
            <div className="flex items-baseline gap-4">
              <span className="display text-display-2xl leading-none tracking-tight">
                <Ph name="NOTE_GOOGLE" />
              </span>
              <span className="tech-spec text-mute">/&nbsp;5</span>
            </div>
            <div className="mt-4">
              <Stars />
            </div>
            <p className="tech-spec mt-4 text-mute">
              sur&nbsp;<Ph name="NB_AVIS_GOOGLE" />&nbsp;avis Google
            </p>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-edito label-caps mt-6 inline-block"
            >
              Voir sur Google Maps →
            </a>
          </div>

          {/* Garanties */}
          <div
            className="reveal-fade md:col-span-7 md:border-l md:border-rule md:pl-10"
            style={{ transitionDelay: "550ms" }}
          >
            <p className="label-caps mb-5">Garanties &amp; mentions</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
              <DataRow k="Décennale" v={<Ph name="ASSUREUR" />} />
              <DataRow k="SIRET" v={<Ph name="SIRET" />} />
              <DataRow k="Fondation" v="2009" />
              <DataRow k="Zone" v={<Ph name="ZONE_INTERVENTION" />} />
            </dl>
          </div>
        </div>

        {/* Mosaïque d'avis — carreaux d'opus */}
        <div className="mt-section-md">
          <p className="label-caps mb-8">
            Témoignages &nbsp;·&nbsp; ce que disent les clients
          </p>

          <div className="grid auto-rows-auto gap-4 md:grid-cols-12 md:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialTile
                key={t.id}
                id={t.id}
                size={t.size}
                tilt={t.tilt}
                delay={600 + i * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialTile({
  id,
  size,
  tilt,
  delay,
}: {
  id: string;
  size: TestimonialSize;
  tilt: number;
  delay: number;
}) {
  return (
    <div
      className={`${SIZE_CLASS[size]} reveal-fade`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {/* Le carreau céramique : bord rule, gradient diagonal subtil émail,
          highlight blanc en haut-gauche pour le côté glazed, hover lift léger */}
      <article className="group relative h-full overflow-hidden border border-rule bg-paper p-6 transition-[transform,box-shadow] duration-base ease-fluide hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(26,25,22,0.18)] md:p-7">
        {/* Gradient émail — diagonale paper → rule très douce */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-rule/15 to-rule/40"
        />
        {/* Highlight haut-gauche — glaze ceramic */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-px -left-px h-1/2 w-1/2 bg-gradient-to-br from-paper-soft/60 to-transparent"
        />

        {/* Contenu */}
        <div className="relative flex h-full flex-col">
          <Stars />
          <blockquote className="display mt-5 flex-1 text-lede italic leading-[1.4] text-ink-soft md:mt-6">
            «&nbsp;<Ph name={`AVIS_${id}_TEXTE`} />&nbsp;»
          </blockquote>
          <footer className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 tech-spec text-mute">
            <span>—</span>
            <span className="text-ink-soft">
              <Ph name={`AVIS_${id}_AUTEUR`} />
            </span>
            <span>·</span>
            <Ph name={`AVIS_${id}_DATE`} />
          </footer>
        </div>
      </article>
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="fill-terracotta"
        >
          <path d="M12 2L14.85 8.66 22 9.27l-5.46 4.73L18.18 21 12 17.27 5.82 21l1.64-6.99L2 9.27l7.15-.61L12 2z" />
        </svg>
      ))}
    </div>
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
