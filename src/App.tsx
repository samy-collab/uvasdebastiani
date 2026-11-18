import { useEffect } from 'react';
import { AboutSection } from './components/AboutSection/AboutSection';
import { BackToTop } from './components/BackToTop/BackToTop';
import { Footer } from './components/Footer/Footer';
import { GrapeSection } from './components/GrapeSection/GrapeSection';
import { HarvestSection } from './components/HarvestSection/HarvestSection';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { LocationSection } from './components/LocationSection/LocationSection';
import { Marquee } from './components/Marquee/Marquee';
import { OrganicSection } from './components/OrganicSection/OrganicSection';
import { ProductsSection } from './components/ProductsSection/ProductsSection';
import { grapeTypes } from './data/grapes';
import { site } from './data/site';

const highlights = [
  'Uvas de mesa',
  'Uvas tradicionais',
  'Cultivo orgânico',
  'Sucos',
  'Geleias',
  'Kits presente',
  `${site.city}, ${site.stateAbbr}`,
  `Desde ${site.since}`,
];

export default function App() {
  // why: the browser resolves a #hash before React renders the sections, so shared deep links would otherwise open at the top
  useEffect(() => {
    const { hash } = window.location;
    if (hash.length > 1) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee items={highlights} />
        {grapeTypes.map((grape, index) => (
          <GrapeSection key={grape.id} grape={grape} reversed={index % 2 === 1} />
        ))}
        <OrganicSection />
        <ProductsSection />
        <HarvestSection />
        <AboutSection />
        <LocationSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
