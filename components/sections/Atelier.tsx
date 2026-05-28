"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatedRule } from "@/components/AnimatedRule";

// §6 ligne 10 — Configurateur « Atelier » (Werkbank-inspired §7.2 idée 8).
// La scène 3D est chargée dynamiquement côté client uniquement — three.js
// n'aime pas le SSR, et on évite de coller ~650 ko à chaque route.
const TileScene = dynamic(
  () => import("@/components/atelier/TileScene").then((m) => m.TileScene),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
);

type Format = {
  id: string;
  label: string;
  w: number;
  h: number;
  d: number;
};

const MOTIFS = [
  { id: "droit", label: "Droit" },
  { id: "chevron", label: "Chevron" },
] as const;

const COLORS = [
  { id: "creme", label: "Crème", hex: "#F0EBE0" },
  { id: "pierre", label: "Pierre", hex: "#C8C2B5" },
  { id: "anthracite", label: "Anthracite", hex: "#26241F" },
  { id: "terracotta", label: "Terre cuite", hex: "#B0522F" },
] as const;

const FORMATS: Format[] = [
  { id: "30x30", label: "30 × 30 cm", w: 1, h: 1, d: 0.06 },
  { id: "60x60", label: "60 × 60 cm", w: 1.7, h: 1.7, d: 0.08 },
  { id: "60x120", label: "60 × 120 cm", w: 1.4, h: 2.8, d: 0.08 },
];

type MotifId = (typeof MOTIFS)[number]["id"];
type ColorId = (typeof COLORS)[number]["id"];
type FormatId = (typeof FORMATS)[number]["id"];

export function Atelier() {
  const [motif, setMotif] = useState<MotifId>("droit");
  const [colorId, setColorId] = useState<ColorId>("pierre");
  const [formatId, setFormatId] = useState<FormatId>("60x60");

  const colorObj = COLORS.find((c) => c.id === colorId)!;
  const formatObj = FORMATS.find((f) => f.id === formatId)!;
  const motifLabel = MOTIFS.find((m) => m.id === motif)!.label;

  return (
    <section id="atelier" className="relative">
      {/* En-tête */}
      <div className="mx-auto max-w-(--container-wide) px-6 pt-section-lg pb-section-md md:px-12">
        <div className="flex items-baseline justify-between pb-6">
          <p className="section-index">09 &nbsp;—&nbsp; Atelier</p>
          <p className="label-caps text-mute">Configurateur</p>
        </div>
        <AnimatedRule delay={100} />

        <div className="mt-section-sm grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <h2 className="display text-display-lg leading-[1.05] tracking-tight md:col-span-7">
            Composez votre mur.
          </h2>
          <p className="text-lede leading-[1.55] text-mute md:col-span-5 md:self-end">
            Motif, couleur, format. La scène s'assemble en direct, le carreau
            tourne, vous décidez.
          </p>
        </div>
      </div>

      {/* Grille principale : scène 3D + contrôles */}
      <div className="mx-auto max-w-(--container-wide) px-6 pb-section-lg md:px-12">
        <div className="grid gap-x-10 gap-y-section-sm md:grid-cols-12">
          {/* Scène 3D */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-paper">
              <TileScene
                motif={motif}
                color={colorObj.hex}
                format={formatObj}
              />
            </div>
            <p className="tech-spec mt-3 text-mute">
              Glisser pour orbiter &nbsp;·&nbsp; le carreau tourne en continu
              &nbsp;·&nbsp; éclairage révèle le relief
            </p>
          </div>

          {/* Panneau de contrôle */}
          <div className="md:col-span-5">
            <div className="space-y-10">
              <ControlGroup
                label="Motif"
                options={MOTIFS.map((m) => ({ id: m.id, label: m.label }))}
                value={motif}
                onChange={(v) => setMotif(v as MotifId)}
              />

              <SwatchGroup
                label="Couleur"
                options={COLORS}
                value={colorId}
                onChange={(v) => setColorId(v as ColorId)}
              />

              <ControlGroup
                label="Format"
                options={FORMATS.map((f) => ({ id: f.id, label: f.label }))}
                value={formatId}
                onChange={(v) => setFormatId(v as FormatId)}
              />

              {/* Récap configuration + CTA */}
              <div className="mt-section-sm border-t border-rule pt-8">
                <p className="label-caps mb-5">Configuration</p>
                <dl className="space-y-2 text-body">
                  <Row k="Motif" v={motifLabel} />
                  <Row k="Couleur" v={colorObj.label} />
                  <Row k="Format" v={formatObj.label} />
                </dl>

                <a
                  href="#devis"
                  className="group relative mt-10 inline-flex overflow-hidden border border-ink-soft px-8 py-4"
                >
                  <span className="label-caps relative z-10 text-ink-soft transition-colors duration-short ease-soft group-hover:text-paper-soft">
                    Demander ce modèle →
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-ink-soft transition-transform duration-base ease-fluide group-hover:translate-x-0"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label-caps mb-3">{label}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={`label-caps border px-5 py-3 transition-colors duration-short ease-soft ${
                active
                  ? "border-ink-soft bg-ink-soft text-paper-soft"
                  : "border-rule text-ink-soft hover:border-ink-soft"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function SwatchGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: string; label: string; hex: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const activeOption = options.find((o) => o.id === value);
  return (
    <fieldset>
      <legend className="label-caps mb-3">
        Couleur{" "}
        {activeOption && (
          <span className="ml-3 text-mute">— {activeOption.label}</span>
        )}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              aria-label={`Couleur ${o.label}`}
              title={o.label}
              className={`relative h-12 w-12 border transition-all duration-short ease-soft ${
                active
                  ? "border-ink-soft scale-95"
                  : "border-rule hover:border-ink-soft"
              }`}
              style={{ backgroundColor: o.hex }}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute -inset-1 border border-ink-soft"
                />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-2">
      <dt className="tech-spec text-mute">{k}</dt>
      <dd className="text-body text-ink-soft">{v}</dd>
    </div>
  );
}

function SceneLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-paper">
      <p className="tech-spec text-mute">
        Chargement de la scène 3D &nbsp;·&nbsp; ~650 ko
      </p>
    </div>
  );
}
