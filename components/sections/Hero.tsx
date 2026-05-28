import Image from "next/image";
import { Ph } from "../Placeholder";
import { BackgroundTileWall } from "../BackgroundTileWall";

// §6 ligne 2 — Hero blanc · une promesse, un CTA, indice de scroll discret.
// Asymétrique 6/6 desktop : texte à gauche, image macro à droite (étend jusqu'au bord).
// Animations : texte révélé ligne par ligne (clip via translateY 110%), image démasquée
// par clip-path inset, fade-up éditorial sur les détails — varié, jamais tout en fade-up (§5.3).

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Mini-mur hex qui se construit au scroll — décor de fond ambient */}
      <BackgroundTileWall
        className="absolute bottom-10 left-4 z-0 hidden w-[280px] md:block lg:w-[340px]"
        rows={4}
        cols={5}
        opacity={0.13}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-(--container-wide) grid-cols-1 gap-y-12 px-6 pt-28 pb-32 md:grid-cols-12 md:gap-x-10 md:px-12 md:pt-40 md:pb-40">
        {/* ---------- TEXTE (gauche) ---------- */}
        <div className="flex flex-col justify-center md:col-span-6 md:row-start-1">
          {/* Eyebrow — métier + lieu réels, numérotation éditoriale */}
          <p
            className="section-index hero-fade"
            style={{ animationDelay: "200ms" }}
          >
            01 &nbsp;—&nbsp; Carreleur &nbsp;·&nbsp; Saint-Orens-de-Gameville
          </p>

          {/* Titre serif énorme — révélé ligne par ligne */}
          <h1 className="display mt-8 text-display-xl leading-[1.02] tracking-tight md:mt-10">
            <span className="block overflow-hidden">
              <span
                className="hero-line block"
                style={{ animationDelay: "400ms" }}
              >
                La matière,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="hero-line block"
                style={{ animationDelay: "600ms" }}
              >
                posée juste.
              </span>
            </span>
          </h1>

          {/* Lede — uniquement des faits déclarés (activité NAF + année de création) */}
          <p
            className="hero-fade mt-10 max-w-(--container-prose) text-lede leading-[1.5] text-mute"
            style={{ animationDelay: "1100ms" }}
          >
            Fourniture et pose de carrelage — intérieur, extérieur, dallage de
            piscines. À Saint-Orens-de-Gameville depuis 2009.
          </p>

          {/* CTAs — un primaire rectangulaire + un lien éditorial secondaire */}
          <div
            className="hero-fade mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "1300ms" }}
          >
            <a
              href="#devis"
              className="group relative inline-flex overflow-hidden border border-ink-soft px-8 py-4"
            >
              <span className="label-caps relative z-10 text-ink-soft transition-colors duration-short ease-soft group-hover:text-paper-soft">
                Devis gratuit
              </span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-ink-soft transition-transform duration-base ease-fluide group-hover:translate-x-0"
              />
            </a>
            <a href="#collections" className="link-edito label-caps">
              Voir les collections
            </a>
          </div>
        </div>

        {/* ---------- IMAGE (droite) ---------- */}
        <div className="md:col-span-6 md:row-start-1 md:self-stretch">
          <div className="relative h-[55vh] md:h-full md:min-h-[560px] md:-mr-12">
            {/* Masque clip-path qui se lève au mount */}
            <div className="hero-image-mask absolute inset-0 overflow-hidden">
              <Image
                src="/images/hero/main.jpg"
                alt="Salle de bain en carrelage marbre — réalisation"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Fiche d'architecte sous l'image (§8) */}
            <div
              className="hero-fade absolute -bottom-10 left-0 flex flex-wrap items-baseline gap-x-4"
              style={{ animationDelay: "1500ms" }}
            >
              <span className="tech-spec text-ink-soft">Réalisation</span>
              <span className="tech-spec text-mute">·</span>
              <span className="tech-spec text-ink-soft">
                <Ph name="NOM_CHANTIER" />
              </span>
              <span className="tech-spec text-mute">·</span>
              <span className="tech-spec text-ink-soft">
                <Ph name="LIEU" />
              </span>
              <span className="tech-spec text-mute">·</span>
              <span className="tech-spec text-ink-soft">
                <Ph name="ANNEE" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- INDICATEUR DE SCROLL (bas-gauche) ---------- */}
      <div
        className="hero-fade absolute bottom-6 left-6 z-10 md:bottom-10 md:left-12"
        style={{ animationDelay: "1800ms" }}
      >
        <div className="flex items-center gap-4">
          <span className="label-caps text-mute">Défiler</span>
          <span
            aria-hidden
            className="hero-pulse block h-12 w-px origin-top bg-ink-soft/50"
          />
        </div>
      </div>
    </section>
  );
}
