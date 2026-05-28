import { SwipeSection } from "@/components/SwipeSection";
import { Ph } from "@/components/Placeholder";

// §6 ligne 5 — Réalisation signature · NOIR swipe.
// Un chantier phare plein cadre : nom, lieu, type. Aucun chiffre inventé,
// tout en placeholders en attendant le contenu réel.

export function RealisationSignature() {
  return (
    <SwipeSection
      id="realisation-signature"
      imageSrc="/images/realisations/signature.jpg"
      imageAlt="Réalisation signature — salle de bain en carrelage"
    >
      <div className="mx-auto flex min-h-screen max-w-(--container-wide) flex-col justify-between px-6 py-section-md md:px-12 md:py-section-lg">
        {/* Top — index éditorial */}
        <div>
          <div className="flex items-baseline justify-between pb-6">
            <p className="section-index">04 &nbsp;—&nbsp; Réalisation signature</p>
            <p className="label-caps text-mute">Chantier phare</p>
          </div>
          <div aria-hidden className="h-px w-full bg-rule-dark" />
        </div>

        {/* Middle — nom du chantier, énorme */}
        <div className="py-section-sm">
          <p className="label-caps mb-6">
            <Ph name="TYPE_PROJET" />
          </p>
          <h2 className="display text-display-xl leading-[1.0] tracking-tight text-paper-soft">
            <Ph name="NOM_CHANTIER" />
          </h2>
          <p className="mt-8 text-lede leading-[1.4] text-paper-soft/70">
            <Ph name="LIEU" />
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <Ph name="ANNEE" />
          </p>
        </div>

        {/* Bottom — fiche technique + CTA vers la galerie complète */}
        <div className="flex flex-wrap items-end justify-between gap-y-8">
          <dl className="flex flex-wrap gap-x-12 gap-y-3">
            <div>
              <dt className="tech-spec text-paper-soft/50">Surface</dt>
              <dd className="tech-spec mt-1 text-paper-soft">
                <Ph name="SURFACE_M2" /> m²
              </dd>
            </div>
            <div>
              <dt className="tech-spec text-paper-soft/50">Matière</dt>
              <dd className="tech-spec mt-1 text-paper-soft">
                <Ph name="MATIERE" />
              </dd>
            </div>
            <div>
              <dt className="tech-spec text-paper-soft/50">Calepinage</dt>
              <dd className="tech-spec mt-1 text-paper-soft">
                <Ph name="CALEPINAGE" />
              </dd>
            </div>
            <div>
              <dt className="tech-spec text-paper-soft/50">Finition</dt>
              <dd className="tech-spec mt-1 text-paper-soft">
                <Ph name="FINITION" />
              </dd>
            </div>
          </dl>
          <a href="#realisations" className="link-edito-inverse label-caps">
            Voir la galerie complète →
          </a>
        </div>
      </div>
    </SwipeSection>
  );
}
