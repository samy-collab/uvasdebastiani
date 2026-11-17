import { useEffect } from 'react';
import { AboutSection } from './components/AboutSection/AboutSection';
import { BackToTop } from './components/BackToTop/BackToTop';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { LocationSection } from './components/LocationSection/LocationSection';
import { Marquee } from './components/Marquee/Marquee';
import { ProductsSection } from './components/ProductsSection/ProductsSection';
import { site } from './data/site';

const highlights = [
  'Uvas de mesa',
  'Geleias',
  'Sucos',
  `${site.city}, ${site.stateAbbr}`,
  'Cultivo em família',
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
        <ProductsSection />
        <AboutSection />
        <LocationSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
