import { SwipeSection } from "@/components/SwipeSection";

// §6 ligne 9 — Savoir-faire / l'atelier · NOIR swipe (réutilise le composant
// de l'étape 4). Qui ils sont, l'histoire, le geste, l'exigence.
//
// Contenu : uniquement des faits vérifiés (année de création 2009 + adresse
// 33 av. de Toulouse + Saint-Orens-de-Gameville, sources Pappers). Le reste
// est éditorial, n'invente aucun chiffre (nb chantiers, années d'expérience
// nominales, équipe, etc.).

export function SavoirFaire() {
  return (
    <SwipeSection
      id="savoir-faire"
      imageSrc="/images/savoir-faire.jpg"
      imageAlt="L'atelier — outils du carreleur"
    >
      <div className="mx-auto flex min-h-screen max-w-(--container-wide) flex-col justify-between px-6 py-section-md md:px-12 md:py-section-lg">
        {/* Top — index éditorial */}
        <div>
          <div className="flex items-baseline justify-between pb-6">
            <p className="section-index">08 &nbsp;—&nbsp; Savoir-faire</p>
            <p className="label-caps text-mute">L'atelier</p>
          </div>
          <div aria-hidden className="h-px w-full bg-rule-dark" />
        </div>

        {/* Middle — titre cinematic 3 lignes + lede + secondary */}
        <div className="py-section-sm">
          <h2 className="display text-display-xl leading-[1.0] tracking-tight text-paper-soft">
            <span className="block">Le geste,</span>
            <span className="block">à Saint-Orens,</span>
            <span className="block">depuis 2009.</span>
          </h2>

          <p className="mt-12 max-w-(--container-narrow) text-lede leading-[1.5] text-paper-soft/85">
            Choisir le carreau, le préparer, le poser, le rejointer. Quatre
            gestes sous le même toit, du devis à la réception.
          </p>

          <p className="mt-6 max-w-(--container-narrow) text-body leading-[1.7] text-paper-soft/65">
            Pas de cadence imposée, pas de carreau bâclé. Le temps qu'il faut —
            souvent un de plus, pour faire propre.
          </p>
        </div>

        {/* Bottom — ribbon de faits vérifiés (Pappers / RCS Toulouse) */}
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-4">
          <div>
            <span className="tech-spec text-paper-soft/50">Fondation</span>
            <span className="tech-spec ml-3 text-paper-soft">2009</span>
          </div>
          <div>
            <span className="tech-spec text-paper-soft/50">Lieu</span>
            <span className="tech-spec ml-3 text-paper-soft">
              Saint-Orens-de-Gameville &nbsp;·&nbsp; Haute-Garonne
            </span>
          </div>
          <div>
            <span className="tech-spec text-paper-soft/50">Showroom</span>
            <span className="tech-spec ml-3 text-paper-soft">
              33 av. de Toulouse
            </span>
          </div>
        </div>
      </div>
    </SwipeSection>
  );
}
