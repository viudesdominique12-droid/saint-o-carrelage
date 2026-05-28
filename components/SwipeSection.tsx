"use client";

import { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

// Sections d'arrière-plan plein cadre — image TOUJOURS visible, plus de
// rideau noir qui wipe. Texte blanc rendu lisible par un dégradé sombre
// directionnel (fort à gauche où vit le texte, léger à droite où l'image
// respire). Garde une parallaxe douce pour le rythme.

type Props = {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** @deprecated — gardé pour compatibilité, ignoré */
  imagePlaceholderName?: string;
  children: ReactNode;
};

export function SwipeSection({
  id,
  imageSrc,
  imageAlt = "",
  children,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Parallaxe douce sur l'image — ±40 px sur toute la traversée
      gsap.fromTo(
        image,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="relative">
      {/* Couche image — toujours visible, plein cadre, parallaxe douce */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          {imageSrc && (
            <Image
              src={asset(imageSrc)}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>
        {/* Dégradé sombre directionnel — fort à gauche (texte lisible),
            léger à droite (image respire et reste claire) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30"
          aria-hidden="true"
        />
      </div>

      {/* Contenu — texte blanc directement sur l'image, plus de clip-path */}
      <div className="relative z-10 text-paper-soft">{children}</div>
    </section>
  );
}
