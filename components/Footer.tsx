import { Ph } from "./Placeholder";

const SITEMAP = [
  { label: "Collections", href: "#collections" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Atelier", href: "#atelier" },
  { label: "Savoir-faire", href: "#savoir-faire" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper text-ink-soft">
      <div className="mx-auto max-w-(--container-wide) px-6 py-section-lg md:px-12">
        {/* Wordmark éditorial — point terracotta = la seule touche d'accent (§4.1) */}
        <div className="border-b border-rule pb-section-sm">
          <p className="display text-display-2xl leading-[0.95] tracking-tight">
            ST O <span className="text-mute">Carrelages</span>
            <span className="text-terracotta">.</span>
          </p>
          <p className="mt-6 max-w-(--container-narrow) text-lede leading-[1.5] text-mute">
            Fourniture et pose de carrelage à Saint-Orens-de-Gameville et dans
            l'agglomération toulousaine.
          </p>
        </div>

        {/* 3 colonnes — calme, éditorial (§6 ligne 13) */}
        <div className="mt-section-sm grid gap-12 md:grid-cols-3">
          {/* Atelier — adresse + horaires + zone */}
          <div>
            <p className="label-caps mb-5">Atelier</p>
            <address className="text-body not-italic leading-[1.7]">
              33 Avenue de Toulouse
              <br />
              31650 Saint-Orens-de-Gameville
            </address>
            <p className="tech-spec mt-5">
              Horaires&nbsp;&nbsp;·&nbsp;&nbsp;<Ph name="HORAIRES_SHOWROOM" />
            </p>
            <p className="tech-spec mt-2">
              Zone&nbsp;&nbsp;·&nbsp;&nbsp;<Ph name="ZONE_INTERVENTION" />
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="label-caps mb-5">Contact</p>
            <ul className="space-y-3 text-body leading-[1.7]">
              <li>
                <Ph name="TELEPHONE" />
              </li>
              <li>
                <Ph name="EMAIL" />
              </li>
              <li className="pt-3">
                <a href="#devis" className="link-edito label-caps">
                  Demander un devis →
                </a>
              </li>
            </ul>
          </div>

          {/* Naviguer */}
          <div>
            <p className="label-caps mb-5">Naviguer</p>
            <ul className="space-y-3 text-body">
              {SITEMAP.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-edito">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — légal + copyright */}
        <div className="mt-section-md flex flex-col gap-4 border-t border-rule pt-6 text-mute md:flex-row md:items-baseline md:justify-between">
          <div className="tech-spec flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span>
              SIRET&nbsp;&nbsp;<Ph name="SIRET" />
            </span>
            <span>
              Décennale&nbsp;&nbsp;<Ph name="ASSUREUR" />
            </span>
            <a href="/mentions-legales" className="link-edito">
              Mentions légales
            </a>
            <a href="/confidentialite" className="link-edito">
              Confidentialité
            </a>
          </div>
          <p className="tech-spec">© 2026 ST O CARRELAGES</p>
        </div>
      </div>
    </footer>
  );
}
