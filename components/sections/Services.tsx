"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { AnimatedRule } from "@/components/AnimatedRule";
import { BackgroundTileWall } from "@/components/BackgroundTileWall";

// §6 ligne 6 — Services · blanc · présentation éditoriale, PAS 3 cartes clones.
// Mécanique anti-clones : alternance gauche/droite des couples texte/image (rythme
// "scroll-tell" magazine), et la 5ᵉ prestation rompt le motif en clôture
// typographique pleine largeur (sans image). Tags = portée standard du métier,
// pas claims sur ST O.

const SERVICES = [
  {
    title: "Fourniture",
    image: "/images/services/01-fourniture.jpg",
    lede: "On choisit le carreau ensemble. Visite du showroom, échantillons à voir et à toucher, comparaison des calepinages avant commande.",
    tags: ["Showroom", "Échantillons", "Devis matière"],
  },
  {
    title: "Pose",
    image: "/images/services/02-pose.jpg",
    lede: "Le geste qui compte. Préparation du support, coupe précise, pose calibrée, joints. C'est là que le carreau dit la vérité.",
    tags: ["Préparation", "Coupe", "Pose", "Joints"],
  },
  {
    title: "Rénovation salle de bain",
    image: "/images/services/03-renovation.jpg",
    lede: "Murs et sols, douche à l'italienne, étanchéité sous carrelage. Un atelier qui suit le chantier d'un bout à l'autre.",
    tags: ["Murs et sols", "Douche italienne", "Étanchéité"],
  },
  {
    title: "Terrasse & extérieur",
    image: "/images/services/04-terrasse.jpg",
    lede: "Sols extérieurs, dallage de piscine, abords. Résistance au gel, drainage, finitions adaptées à l'usage.",
    tags: ["Terrasse", "Dallage piscine", "Gel · drainage"],
  },
  {
    title: "Mosaïque",
    image: null,
    lede: "Carreaux centimétriques composés. Plaques posées au cordeau, soubassements, fresques sur mesure.",
    tags: ["Plaques", "Soubassements", "Fresques sur mesure"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden">
      {/* Mini-mur hex qui se construit au scroll — entre la zone d'en-tête et les lignes */}
      <BackgroundTileWall
        className="absolute top-[40%] right-4 z-0 hidden w-[260px] md:block lg:w-[320px]"
        rows={5}
        cols={4}
        opacity={0.12}
      />

      {/* En-tête de section */}
      <div className="relative z-10 mx-auto max-w-(--container-wide) px-6 pt-section-lg pb-section-md md:px-12">
        <div className="flex items-baseline justify-between pb-6">
          <p className="section-index">05 &nbsp;—&nbsp; Services</p>
          <p className="label-caps text-mute">5 prestations</p>
        </div>
        <AnimatedRule delay={100} />

        <div className="mt-section-sm grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <h2 className="display text-display-lg leading-[1.05] tracking-tight md:col-span-7">
            Cinq prestations, un seul atelier.
          </h2>
          <p className="text-lede leading-[1.55] text-mute md:col-span-5 md:self-end">
            Du conseil au joint final. Le même geste, du devis à la réception.
          </p>
        </div>
      </div>

      {/* Lignes éditoriales — alternance gauche/droite, au-dessus du décor */}
      <div className="relative z-10 border-t border-rule">
        {SERVICES.slice(0, 4).map((s, i) => (
          <ServiceRow key={s.title} index={i + 1} service={s} reverse={i % 2 === 1} />
        ))}
        {/* Dernière ligne : clôture typographique pleine largeur (rompt le motif) */}
        <ClosingRow index={5} service={SERVICES[4]} />
      </div>
    </section>
  );
}

type Service = (typeof SERVICES)[number];

function ServiceRow({
  index,
  service,
  reverse,
}: {
  index: number;
  service: Service;
  reverse: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const n = String(index).padStart(2, "0");

  return (
    <article
      ref={ref}
      data-revealed={inView}
      className="border-b border-rule"
    >
      <div className="mx-auto grid max-w-(--container-wide) items-center gap-y-12 px-6 py-section-md md:grid-cols-12 md:gap-x-10 md:px-12 md:py-section-lg">
        {/* Texte */}
        <div
          className={`md:col-span-6 ${reverse ? "md:col-start-7" : "md:col-start-1"}`}
        >
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-display-sm leading-none text-mute">
              {n}
            </span>
            <p className="label-caps">Prestation</p>
          </div>

          <h3 className="display mt-6 text-display-md leading-[1.02] tracking-tight">
            <span className="block overflow-hidden">
              <span
                className="reveal-line"
                style={{ transitionDelay: "100ms" }}
              >
                {service.title}
              </span>
            </span>
          </h3>

          <p
            className="reveal-fade mt-8 max-w-(--container-prose) text-lede leading-[1.55] text-mute"
            style={{ transitionDelay: "350ms" }}
          >
            {service.lede}
          </p>

          <ul
            className="reveal-fade mt-10 flex flex-wrap gap-x-6 gap-y-2"
            style={{ transitionDelay: "500ms" }}
          >
            {service.tags.map((t) => (
              <li key={t} className="tech-spec">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div
          className={`reveal-fade md:col-span-6 ${
            reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="tile-hover relative aspect-[4/3] w-full overflow-hidden">
            {service.image && (
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ClosingRow({ index, service }: { index: number; service: Service }) {
  const { ref, inView } = useInView<HTMLElement>();
  const n = String(index).padStart(2, "0");

  return (
    <article ref={ref} data-revealed={inView} className="border-b border-rule">
      <div className="mx-auto grid max-w-(--container-wide) gap-y-8 px-6 py-section-md md:grid-cols-12 md:gap-x-10 md:px-12 md:py-section-lg">
        <div className="md:col-span-12">
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-display-sm leading-none text-mute">
              {n}
            </span>
            <p className="label-caps">Prestation · clôture</p>
          </div>

          {/* Titre pleine largeur — l'écho final, italique en accent terracotta */}
          <h3 className="display mt-8 text-display-lg leading-[1.0] tracking-tight md:text-display-xl">
            <span className="block overflow-hidden">
              <span
                className="reveal-line"
                style={{ transitionDelay: "100ms" }}
              >
                {service.title}
                <span className="italic text-terracotta">.</span>
              </span>
            </span>
          </h3>
        </div>

        <div className="md:col-span-7 md:col-start-1">
          <p
            className="reveal-fade text-lede leading-[1.55] text-mute"
            style={{ transitionDelay: "300ms" }}
          >
            {service.lede}
          </p>
        </div>

        <ul
          className="reveal-fade flex flex-wrap gap-x-6 gap-y-2 md:col-span-5 md:col-start-8 md:self-end"
          style={{ transitionDelay: "450ms" }}
        >
          {service.tags.map((t) => (
            <li key={t} className="tech-spec">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
