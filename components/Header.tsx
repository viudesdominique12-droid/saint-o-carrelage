"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 4 liens max (§6). Anchors qui pointent vers les sections à venir.
const NAV = [
  { label: "Collections", href: "#collections" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Atelier", href: "#atelier" },
  { label: "Contact", href: "#contact" },
];

const SCROLL_THRESHOLD = 24;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparent → opaque au-delà du seuil. Pas de backdrop-blur (glassmorphism §3.1).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + ESC quand le menu mobile est ouvert.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-base ease-fluide ${
          scrolled
            ? "border-b border-rule bg-paper"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-(--container-wide) items-center justify-between gap-8 px-6 py-5 md:px-12">
          <Link
            href="/"
            className="display text-lg leading-none tracking-tight"
            aria-label="ST O Carrelages — accueil"
          >
            ST O <span className="text-mute">Carrelages</span>
          </Link>

          {/* Nav desktop */}
          <nav
            className="hidden items-center gap-10 md:flex"
            aria-label="Navigation principale"
          >
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="link-edito label-caps">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop — rectangulaire, balayage au hover (§8) */}
          <a
            href="#devis"
            className="group relative hidden overflow-hidden border border-ink-soft px-6 py-3 md:inline-flex"
          >
            <span className="label-caps relative z-10 text-ink-soft transition-colors duration-short ease-soft group-hover:text-paper-soft">
              Devis gratuit
            </span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-ink-soft transition-transform duration-base ease-fluide group-hover:translate-x-0"
            />
          </a>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="label-caps text-ink-soft md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Overlay menu mobile — plein écran noir, typo display */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ink text-paper-soft transition-opacity duration-base ease-drama md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="display text-lg leading-none text-paper-soft">
            ST O <span className="text-mute">Carrelages</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="label-caps text-paper-soft"
            aria-label="Fermer le menu"
          >
            Fermer
          </button>
        </div>

        <nav
          className="mt-16 flex flex-1 flex-col gap-8 px-6"
          aria-label="Menu mobile"
        >
          {NAV.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display text-display-md leading-[1.05] text-paper-soft"
            >
              <span className="section-index mr-4 text-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-rule-dark px-6 py-6">
          <a
            href="#devis"
            onClick={() => setOpen(false)}
            className="label-caps inline-block border border-paper-soft px-8 py-4 text-paper-soft"
          >
            Devis gratuit
          </a>
        </div>
      </div>
    </>
  );
}
