import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Serif display à fort caractère — geste anti-IA n°1 (brief §4.2).
// Fraunces est variable : poids 100→900, axe opsz, SOFT, WONK.
const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-source",
  display: "swap",
});

// Grotesque charpenté pour le corps. Substitut Google Fonts à Switzer/General Sans
// (Fontshare). À remplacer par next/font/local + Switzer.woff2 en prod si licence OK.
const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body-source",
  display: "swap",
});

// Mono pour les fiches techniques sous les carreaux (format, finition).
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{NOM_ENTREPRISE}} — Carrelage & pose",
  description: "{{META_DESCRIPTION}}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
