"use client";

import { useInView } from "@/lib/useInView";

// §6 ligne 11 — Preuve sociale · mur de carreaux céramiques (opus).
// Avis Google récupérés directement depuis la fiche Google Maps de St O
// Carrelages — 3 avis, tous 5 étoiles → note moyenne 5/5.

const GOOGLE_MAPS_URL = "https://share.google/0WqlRVdprrswbUnE4";

type Testimonial = {
  id: string;
  auteur: string;
  date: string;
  note: number;
  texte: string | null;
  size: "lg" | "md" | "wide";
  tilt: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "01",
    auteur: "Jean Masson",
    date: "Juin 2023",
    note: 5,
    texte:
      "Monsieur GORET de la société « Saint O carrelages » m'a rénové du carrelage dans ma salle de bains. Durant ce chantier, j'ai pu constater sa ponctualité, sérieux, grand professionnalisme. La pose de ce carrelage démontre ses grandes…",
    size: "lg",
    tilt: -0.2,
  },
  {
    id: "02",
    auteur: "Quincaillerie Angles",
    date: "Février 2021",
    note: 5,
    texte: "Très professionnel",
    size: "md",
    tilt: 0.3,
  },
  {
    id: "03",
    auteur: "Frédéric Vigier",
    date: "Mai 2021",
    note: 5,
    texte: null, // note sans commentaire écrit
    size: "wide",
    tilt: -0.1,
  },
];

const SIZE_CLASS: Record<Testimonial["size"], string> = {
  lg: "md:col-span-8",
  md: "md:col-span-4",
  wide: "md:col-span-12",
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
      <div className="mx-auto max-w-(--container-wide) px-6 pt-section-md pb-section-md md:px-12">
        {/* En-tête */}
        <div className="flex items-baseline justify-between pb-4">
          <p className="section-index">10 &nbsp;—&nbsp; En confiance</p>
          <p className="label-caps text-mute">Preuve sociale</p>
        </div>
        <div
          aria-hidden
          className="reveal-rule h-px w-full bg-rule"
          style={{ transitionDelay: "100ms" }}
        />

        {/* H2 + badge note Google côte à côte */}
        <div className="mt-10 flex flex-col items-start justify-between gap-y-6 md:flex-row md:items-end md:gap-x-10">
          <h2
            id="preuve-title"
            className="display max-w-[16ch] text-display-lg leading-[1.05] tracking-tight"
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

          <div
            className="reveal-fade flex items-baseline gap-6 border-l border-rule pl-6"
            style={{ transitionDelay: "400ms" }}
          >
            <div>
              <div className="flex items-baseline gap-2">
                <span className="display text-display-md leading-none tracking-tight">
                  5,0
                </span>
                <span className="tech-spec text-mute">/&nbsp;5</span>
              </div>
              <div className="mt-2">
                <Stars />
              </div>
            </div>
            <div>
              <p className="tech-spec text-mute">
                3&nbsp;avis Google
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-edito label-caps mt-2 inline-block"
              >
                Tous les avis →
              </a>
            </div>
          </div>
        </div>

        {/* Mosaïque opus — 3 carreaux, tailles mixtes */}
        <div className="mt-12">
          <div className="grid auto-rows-auto gap-4 md:grid-cols-12 md:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialTile
                key={t.id}
                testimonial={t}
                delay={500 + i * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialTile({
  testimonial,
  delay,
}: {
  testimonial: Testimonial;
  delay: number;
}) {
  const { size, tilt, note, texte, auteur, date } = testimonial;
  const hasText = texte !== null;

  return (
    <div
      className={`${SIZE_CLASS[size]} reveal-fade`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <article className="group relative h-full overflow-hidden border border-rule bg-paper p-6 transition-[transform,box-shadow] duration-base ease-fluide hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(26,25,22,0.18)] md:p-7">
        {/* Émail diagonal subtil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-rule/15 to-rule/40"
        />
        {/* Highlight glaze haut-gauche */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-px -left-px h-1/2 w-1/2 bg-gradient-to-br from-paper-soft/60 to-transparent"
        />

        <div
          className={`relative flex h-full ${
            hasText ? "flex-col" : "flex-col md:flex-row md:items-center md:justify-between md:gap-8"
          }`}
        >
          <Stars count={note} />

          {hasText && (
            <blockquote className="display mt-5 flex-1 text-lede italic leading-[1.4] text-ink-soft md:mt-6">
              «&nbsp;{texte}&nbsp;»
            </blockquote>
          )}

          {!hasText && (
            <p className="tech-spec mt-3 italic text-mute md:mt-0">
              Note 5 étoiles sans commentaire écrit
            </p>
          )}

          <footer className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 tech-spec text-mute md:mt-6">
            <span>—</span>
            <span className="text-ink-soft">{auteur}</span>
            <span>·</span>
            <span>{date}</span>
          </footer>
        </div>
      </article>
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} étoiles sur 5`}>
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
