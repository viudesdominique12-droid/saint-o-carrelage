// Preview permanente du DESIGN SYSTEM — référence visuelle des tokens.
// Accessible à /design-system, hors flux marketing.

export default function DesignSystemPreview() {
  return (
    <main className="min-h-screen bg-paper pt-20 text-ink-soft md:pt-24">
      {/* Bandeau d'identification de la preview */}
      <div className="border-b border-rule px-6 py-3 md:px-12">
        <p className="section-index">
          DESIGN SYSTEM — preview étape 01/05 · à valider avant layout
        </p>
      </div>

      <div className="mx-auto max-w-(--container-wide) px-6 py-section-md md:px-12">
        {/* =====================================================================
            01 — TYPOGRAPHIE
            ===================================================================== */}
        <section className="border-b border-rule pb-section-md">
          <header className="mb-12 flex items-baseline justify-between">
            <p className="section-index">01 — Typographie</p>
            <p className="tech-spec">Fraunces · Manrope · JetBrains Mono</p>
          </header>

          {/* Échelle display */}
          <div className="space-y-8">
            <div>
              <p className="label-caps mb-2">display-2xl · hero hors-norme</p>
              <p className="display text-display-2xl">Le carreau</p>
            </div>
            <div>
              <p className="label-caps mb-2">display-xl · hero standard</p>
              <p className="display text-display-xl">Pose & matière</p>
            </div>
            <div>
              <p className="label-caps mb-2">display-lg · titre de section</p>
              <p className="display text-display-lg">Nos collections</p>
            </div>
            <div>
              <p className="label-caps mb-2">display-md · sous-titre</p>
              <p className="display text-display-md">Grès cérame · zellige · terrazzo</p>
            </div>
            <div>
              <p className="label-caps mb-2">display-sm · h3 éditorial</p>
              <p className="display text-display-sm">Le geste de pose</p>
            </div>
          </div>

          {/* Corps + chapeau */}
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="max-w-(--container-prose)">
              <p className="label-caps mb-3">lede · chapeau</p>
              <p className="text-lede leading-[1.5] text-ink-soft">
                Texte d'introduction éditoriale : ton posé, phrase qui pose le
                récit avant d'entrer dans la matière.
              </p>
            </div>
            <div className="max-w-(--container-prose)">
              <p className="label-caps mb-3">body · corps standard</p>
              <p className="text-body leading-[1.6] text-ink-soft">
                Corps de texte courant. Manrope sert ici de substitut à Switzer
                (Fontshare) — à remplacer par <code className="tech-spec">next/font/local</code>{" "}
                en production. La lecture doit rester aérée, jamais tassée.
              </p>
            </div>
          </div>

          {/* Labels & specs */}
          <div className="mt-16 flex flex-wrap gap-12">
            <div>
              <p className="label-caps mb-2">label · petites capitales</p>
              <p className="label-caps text-ink-soft">FOURNITURE & POSE</p>
            </div>
            <div>
              <p className="label-caps mb-2">tech-spec · fiche d'architecte</p>
              <p className="tech-spec text-ink-soft">60 × 60 CM · MAT · GRÈS CÉRAME</p>
            </div>
            <div>
              <p className="label-caps mb-2">section-index · numérotation</p>
              <p className="section-index">04 — RÉALISATIONS</p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            02 — COULEURS
            ===================================================================== */}
        <section className="border-b border-rule py-section-md">
          <header className="mb-12 flex items-baseline justify-between">
            <p className="section-index">02 — Couleurs</p>
            <p className="tech-spec">5 valeurs · 1 accent</p>
          </header>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            <Swatch name="Paper" hex="#F6F4F0" role="Fond principal" bg="bg-paper" textColor="text-ink-soft" border />
            <Swatch name="Ink" hex="#121110" role="Section drame" bg="bg-ink" textColor="text-paper-soft" />
            <Swatch name="Ink-soft" hex="#1A1916" role="Texte sur papier" bg="bg-ink-soft" textColor="text-paper-soft" />
            <Swatch name="Mute" hex="#8A8478" role="Légendes" bg="bg-mute" textColor="text-paper-soft" />
            <Swatch name="Terracotta" hex="#B0522F" role="Accent unique" bg="bg-terracotta" textColor="text-paper-soft" />
          </div>

          {/* Démonstration de l'accent terre cuite par petite touche */}
          <div className="mt-12 max-w-(--container-prose) text-body leading-[1.7]">
            L'accent terre cuite ne s'utilise <strong>jamais en aplat large</strong>.
            Uniquement par micro-touches — par exemple sur un{" "}
            <a href="#" className="link-edito">lien éditorial</a>, un état actif, ou
            la barre de soulignement animée. La couleur vient directement de la
            matière du métier (l'argile).
          </div>
        </section>

        {/* =====================================================================
            03 — ESPACEMENT & GRILLE
            ===================================================================== */}
        <section className="border-b border-rule py-section-md">
          <header className="mb-12 flex items-baseline justify-between">
            <p className="section-index">03 — Espacement</p>
            <p className="tech-spec">section-xs → section-xl</p>
          </header>

          <div className="space-y-3">
            {[
              { name: "section-xs", value: "48 px" },
              { name: "section-sm", value: "80 px" },
              { name: "section-md", value: "128 px" },
              { name: "section-lg", value: "192 px · défaut desktop" },
              { name: "section-xl", value: "256 px · drame" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-6">
                <p className="tech-spec w-40 shrink-0">{s.name}</p>
                <div
                  className="h-3 bg-ink-soft/90"
                  style={{ width: `var(--spacing-${s.name})` }}
                  aria-hidden
                />
                <p className="tech-spec">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            04 — MOTION
            ===================================================================== */}
        <section className="border-b border-rule py-section-md">
          <header className="mb-12 flex items-baseline justify-between">
            <p className="section-index">04 — Motion</p>
            <p className="tech-spec">3 easings · 4 durées</p>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="label-caps mb-4">Easings</p>
              <ul className="space-y-2 text-body">
                <li>
                  <span className="tech-spec">fluide</span> —{" "}
                  <span className="text-mute">défaut, transitions de matière</span>
                </li>
                <li>
                  <span className="tech-spec">drama</span> —{" "}
                  <span className="text-mute">swipes blanc → noir</span>
                </li>
                <li>
                  <span className="tech-spec">soft</span> —{" "}
                  <span className="text-mute">micro-interactions (hover, focus)</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4">Durées</p>
              <ul className="space-y-2 text-body">
                <li>
                  <span className="tech-spec">short</span> 600 ms ·{" "}
                  <span className="tech-spec">base</span> 800 ms
                </li>
                <li>
                  <span className="tech-spec">long</span> 1000 ms ·{" "}
                  <span className="tech-spec">xlong</span> 1200 ms
                </li>
              </ul>
            </div>
          </div>

          {/* Démo visuelle des easings sur hover */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {(["fluide", "drama", "soft"] as const).map((e) => (
              <div
                key={e}
                className="group relative h-32 cursor-pointer overflow-hidden border border-rule bg-paper"
              >
                <div
                  className="absolute inset-0 bg-ink-soft transition-transform group-hover:translate-x-0"
                  style={{
                    transform: "translateX(-100%)",
                    transitionDuration: "var(--duration-base)",
                    transitionTimingFunction: `var(--ease-${e})`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="tech-spec mix-blend-difference text-paper-soft">
                    hover · {e}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            05 — BOUTONS (préfiguration §8)
            ===================================================================== */}
        <section className="py-section-md">
          <header className="mb-12 flex items-baseline justify-between">
            <p className="section-index">05 — Boutons (préfiguration)</p>
            <p className="tech-spec">rectangulaires · jamais pilule</p>
          </header>

          <div className="flex flex-wrap items-center gap-6">
            <button className="group relative overflow-hidden border border-ink-soft px-8 py-4">
              <span className="label-caps relative z-10 text-ink-soft transition-colors duration-[var(--duration-short)] group-hover:text-paper-soft">
                Devis gratuit
              </span>
              <span
                className="absolute inset-0 -z-0 bg-ink-soft"
                style={{
                  transform: "translateX(-101%)",
                  transition: "transform var(--duration-base) var(--ease-fluide)",
                }}
              />
              <style>{`
                button:hover > span[class*="bg-ink-soft"] { transform: translateX(0); }
              `}</style>
            </button>

            <button className="border border-ink-soft bg-ink-soft px-8 py-4 transition-colors duration-[var(--duration-short)] hover:bg-paper">
              <span className="label-caps text-paper-soft transition-colors duration-[var(--duration-short)] hover:text-ink-soft">
                Visiter le showroom
              </span>
            </button>

            <a href="#" className="link-edito label-caps">
              En savoir plus
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Swatch({
  name,
  hex,
  role,
  bg,
  textColor,
  border,
}: {
  name: string;
  hex: string;
  role: string;
  bg: string;
  textColor: string;
  border?: boolean;
}) {
  return (
    <div className={`${bg} ${textColor} ${border ? "border border-rule" : ""} p-5 aspect-[4/5] flex flex-col justify-between`}>
      <p className="label-caps" style={{ color: "inherit", opacity: 0.7 }}>
        {name}
      </p>
      <div>
        <p className="tech-spec" style={{ color: "inherit", opacity: 0.6 }}>
          {hex}
        </p>
        <p className="text-body-sm mt-1" style={{ color: "inherit", opacity: 0.85 }}>
          {role}
        </p>
      </div>
    </div>
  );
}
