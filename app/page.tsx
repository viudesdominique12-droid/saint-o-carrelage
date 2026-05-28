import { Hero } from "@/components/sections/Hero";
import { Manifeste } from "@/components/sections/Manifeste";
import { Collections } from "@/components/sections/Collections";
import { RealisationSignature } from "@/components/sections/RealisationSignature";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Galerie } from "@/components/sections/Galerie";
import { SavoirFaire } from "@/components/sections/SavoirFaire";
import { Atelier } from "@/components/sections/Atelier";
import { PreuveSociale } from "@/components/sections/PreuveSociale";
import { CTAFinal } from "@/components/sections/CTAFinal";

// Home — toutes les sections du §6 livrées dans l'ordre.
//   §6 ligne 2 (Hero)                     ✓
//   §6 ligne 3 (Manifeste)                ✓
//   §6 ligne 4 (Collections)              ✓
//   §6 ligne 5 (Réalisation signature)    ✓ NOIR swipe
//   §6 ligne 6 (Services)                 ✓
//   §6 ligne 7 (Process)                  ✓
//   §6 ligne 8 (Galerie)                  ✓
//   §6 ligne 9 (Savoir-faire)             ✓ NOIR swipe
//   §6 ligne 10 (Atelier 3D)              ✓
//   §6 ligne 11 (Preuve sociale)          ✓
//   §6 ligne 12 (CTA final)               ✓ NOIR swipe
//   §6 ligne 13 (Footer)                  ✓ (via layout)

export default function Home() {
  return (
    <main className="bg-paper text-ink-soft">
      <Hero />
      <Manifeste />
      <Collections />
      <RealisationSignature />
      <Services />
      <Process />
      <Galerie />
      <SavoirFaire />
      <Atelier />
      <PreuveSociale />
      <CTAFinal />
    </main>
  );
}
