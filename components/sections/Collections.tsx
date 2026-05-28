"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AnimatedRule } from "@/components/AnimatedRule";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

// §6 ligne 4 — Collections (cœur du site §7).
// Grammaire choisie : galerie en pin horizontal (§7.2 idée 1) — on scrolle
// verticalement, les familles défilent horizontalement. UNE seule grammaire
// pour les 11 familles (§7.3). Sur mobile et prefers-reduced-motion : stack
// vertical naturel, pas de pin (§10).

// Familles du §7.1. Calepinages et finitions = connaissances du métier
// (généralement applicables à chaque famille), pas des claims sur le stock.
const COLLECTIONS = [
  {
    name: "Grès cérame",
    image: "/images/collections/01-gres-cerame.jpg",
    calepinages: "droit · chevron · point de Hongrie",
    finitions: "mat · poli · rectifié",
  },
  {
    name: "Faïence",
    image: "/images/collections/02-faience.jpg",
    calepinages: "droit · décalé · brique",
    finitions: "brillant · mat · craquelé",
  },
  {
    name: "Zellige",
    image: "/images/collections/03-zellige.jpg",
    calepinages: "droit · chevron · diagonale",
    finitions: "émaillé · brossé · vintage",
  },
  {
    name: "Carreaux de ciment",
    image: "/images/collections/04-ciment.jpg",
    calepinages: "opus · damier · motif",
    finitions: "mat · ciré · brut",
  },
  {
    name: "Terrazzo",
    image: "/images/collections/05-terrazzo.jpg",
    calepinages: "droit · grand format",
    finitions: "poli · adouci",
  },
  {
    name: "Mosaïque",
    image: "/images/collections/06-mosaique.jpg",
    calepinages: "droit · hexagone · basketweave",
    finitions: "émaillé · pierre · métal",
  },
  {
    name: "Pierre naturelle",
    image: "/images/collections/07-pierre.jpg",
    calepinages: "opus · droit · grand format",
    finitions: "adouci · vieilli · brut",
  },
  {
    name: "Tomette · terre cuite",
    image: "/images/collections/08-tomette.jpg",
    calepinages: "hexagone · queue de paon · droit",
    finitions: "brut · ciré · vieilli",
  },
  {
    name: "Effet bois",
    image: "/images/collections/09-bois.jpg",
    calepinages: "droit · chevron · point de Hongrie",
    finitions: "mat · rectifié",
  },
  {
    name: "Effet béton",
    image: "/images/collections/10-beton.jpg",
    calepinages: "droit · grand format",
    finitions: "mat · adouci",
  },
  {
    name: "Grand format",
    image: "/images/collections/11-grand-format.jpg",
    calepinages: "droit",
    finitions: "poli · adouci · mat",
  },
];

export function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mqReduce.matches);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Pas de pin sous le breakpoint md (mobile/tablette portrait) — la grille
    // passe en stack vertical naturel.
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    if (!mqDesktop.matches || mqReduce.matches) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative md:flex md:h-screen md:flex-col md:overflow-hidden"
      aria-labelledby="collections-title"
    >
      {/* En-tête compact */}
      <div className="mx-auto w-full max-w-(--container-wide) px-6 pt-section-md pb-4 md:px-12 md:pt-24 md:pb-3">
        <div className="flex items-baseline justify-between pb-3">
          <p className="section-index">03 &nbsp;—&nbsp; Collections</p>
          <p className="label-caps text-mute">11 familles</p>
        </div>
        <AnimatedRule delay={100} />

        <div className="mt-6 grid gap-y-3 md:mt-8 md:grid-cols-12 md:gap-x-10">
          <h2
            id="collections-title"
            className="display text-display-md leading-[1.05] tracking-tight md:col-span-7 md:text-display-lg"
          >
            Chaque famille a son geste, son joint, sa lumière.
          </h2>
          <p className="text-body leading-[1.5] text-mute md:col-span-5 md:self-end md:text-lede">
            Du grès cérame format XXL au zellige soufflé à la main. Posée juste.
          </p>
        </div>

        {/* Indice de geste — différencié mobile/desktop */}
        <p className="tech-spec mt-4 text-mute">
          <span className="md:hidden">← Glissez pour parcourir les 11 familles →</span>
          {!reduce && (
            <span className="hidden md:inline">
              ↓ &nbsp;Défilez pour parcourir les onze familles &nbsp;→
            </span>
          )}
        </p>
      </div>

      {/* Track : sur mobile = swipe horizontal natif avec snap-x ;
          sur desktop = pin GSAP qui translate au scroll vertical */}
      <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth pb-section-sm md:flex-1 md:overflow-hidden md:snap-none md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div
          ref={trackRef}
          className="flex h-full gap-4 px-6 md:gap-0 md:px-0"
        >
          {COLLECTIONS.map((c, i) => (
            <article
              key={c.name}
              className="flex shrink-0 snap-start flex-col gap-3 w-[78vw] sm:w-[60vw] md:h-full md:w-[40vw] md:max-w-[520px] md:px-6 md:py-8 md:gap-5 lg:w-[34vw]"
            >
              <div className="flex items-baseline gap-6">
                <span className="section-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label-caps text-mute">Famille</span>
              </div>

              {/* Carreau — aspect 4/3 sur mobile, flex-1 sur desktop.
                  bg-rule pour avoir un placeholder beige pendant le chargement. */}
              <div className="tile-hover relative aspect-[4/3] w-full overflow-hidden bg-rule/40 md:aspect-auto md:flex-1 md:min-h-0">
                <Image
                  src={asset(c.image)}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 35vw, (min-width: 768px) 40vw, 80vw"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-display-sm leading-[1.02] tracking-tight">
                    {c.name}
                  </h3>
                  <a href="#" className="link-edito label-caps">
                    Voir →
                  </a>
                </div>
                <p className="tech-spec mt-2">
                  Calepinages&nbsp;&nbsp;·&nbsp;&nbsp;{c.calepinages}
                </p>
                <p className="tech-spec mt-1">
                  Finitions&nbsp;&nbsp;·&nbsp;&nbsp;{c.finitions}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
