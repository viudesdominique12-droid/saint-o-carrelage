"use client";

import { FormEvent, ReactNode } from "react";
import { SwipeSection } from "@/components/SwipeSection";
import { Ph } from "@/components/Placeholder";

// §6 ligne 12 — CTA final · NOIR swipe · « Demandez votre devis gratuit ».
// Réutilise <SwipeSection> (3ᵉ et dernier balayage du site). Layout 5/7 :
// copy + coordonnées à gauche, formulaire court (§9) à droite.

const PROJET_OPTIONS = [
  { value: "", label: "Choisir une prestation…", disabled: true },
  { value: "sdb", label: "Rénovation salle de bain" },
  { value: "cuisine", label: "Cuisine" },
  { value: "terrasse", label: "Terrasse & extérieur" },
  { value: "sol", label: "Sol — pièce à vivre" },
  { value: "mosaique", label: "Mosaïque" },
  { value: "autre", label: "Autre / je précise" },
];

export function CTAFinal() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Maquette : aucun envoi. À câbler avec route API /api/devis ou service tiers.
  }

  return (
    <SwipeSection
      id="devis"
      imageSrc="/images/cta-final.jpg"
      imageAlt="Salle de bain en marbre — réalisation"
    >
      <div className="mx-auto flex min-h-screen max-w-(--container-wide) flex-col px-6 py-section-md md:px-12 md:py-section-lg">
        {/* Top — index */}
        <div>
          <div className="flex items-baseline justify-between pb-6">
            <p className="section-index">11 &nbsp;—&nbsp; Devis</p>
            <p className="label-caps text-mute">Sans engagement</p>
          </div>
          <div aria-hidden className="h-px w-full bg-rule-dark" />
        </div>

        {/* Middle — grid 5/7 */}
        <div className="mt-section-md grid flex-1 gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* LEFT — copy + coordonnées alternatives */}
          <div className="md:col-span-5">
            <h2 className="display text-display-xl leading-[1.0] tracking-tight text-paper-soft">
              Demandez
              <br />
              votre devis.
            </h2>
            <p className="mt-10 max-w-(--container-prose) text-lede leading-[1.5] text-paper-soft/80">
              Gratuit, sans engagement. Visite sur place ou en showroom,
              réponse sous quelques jours.
            </p>

            <div className="mt-section-sm space-y-7">
              <ContactRow label="Téléphone" v={<Ph name="TELEPHONE" />} />
              <ContactRow
                label="Atelier"
                v="33 av. de Toulouse · Saint-Orens-de-Gameville"
              />
              <ContactRow label="Horaires" v={<Ph name="HORAIRES_SHOWROOM" />} />
            </div>
          </div>

          {/* RIGHT — formulaire court (§9 : nom, téléphone, type, message) */}
          <div className="md:col-span-7">
            <form className="space-y-9" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-x-8 gap-y-9 md:grid-cols-2">
                <Field label="Nom" name="nom" required />
                <Field label="Téléphone" name="tel" type="tel" required />
              </div>

              <SelectField
                label="Type de projet"
                name="projet"
                required
                options={PROJET_OPTIONS}
              />

              <TextareaField label="Message" name="message" optional />

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
                <button
                  type="submit"
                  className="group relative inline-flex overflow-hidden border border-paper-soft px-8 py-4"
                >
                  <span className="label-caps relative z-10 text-paper-soft transition-colors duration-short ease-soft group-hover:text-ink-soft">
                    Envoyer la demande →
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-paper-soft transition-transform duration-base ease-fluide group-hover:translate-x-0"
                  />
                </button>
                <p className="tech-spec text-mute">
                  Aucune donnée partagée &nbsp;·&nbsp; réponse personnelle
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SwipeSection>
  );
}

function ContactRow({ label, v }: { label: string; v: ReactNode }) {
  return (
    <div>
      <p className="label-caps text-mute">{label}</p>
      <p className="mt-2 text-body text-paper-soft">{v}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label-caps text-mute">
        {label}
        {required && <span className="text-terracotta">&nbsp;*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-3 block w-full border-0 border-b border-paper-soft/30 bg-transparent py-3 text-body text-paper-soft outline-none transition-colors duration-base ease-fluide focus:border-terracotta"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required = false,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
}) {
  return (
    <label className="block">
      <span className="label-caps text-mute">
        {label}
        {required && <span className="text-terracotta">&nbsp;*</span>}
      </span>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="mt-3 block w-full appearance-none border-0 border-b border-paper-soft/30 bg-transparent py-3 pr-8 text-body text-paper-soft outline-none transition-colors duration-base ease-fluide focus:border-terracotta"
        >
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              disabled={o.disabled}
              className="bg-ink text-paper-soft"
            >
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-0 text-paper-soft/50"
        >
          ↓
        </span>
      </div>
    </label>
  );
}

function TextareaField({
  label,
  name,
  optional = false,
}: {
  label: string;
  name: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="label-caps text-mute">
        {label}
        {optional && <span>&nbsp;(facultatif)</span>}
      </span>
      <textarea
        name={name}
        rows={4}
        className="mt-3 block w-full resize-y border-0 border-b border-paper-soft/30 bg-transparent py-3 text-body text-paper-soft outline-none transition-colors duration-base ease-fluide focus:border-terracotta"
      />
    </label>
  );
}
