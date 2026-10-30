import AboutUs from "@/components/home/AboutUs";
import Hero from "@/components/home/Hero";
// import CinemaVideo from "@/components/home/CinemaVideo";
import InstagramGrid from "@/components/home/InstagramGrid";
import IntroLogo from "@/components/home/IntroLogo";
import Phases from "@/components/home/Phases";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import FinalBand from "@/components/ui/FinalBand";

export const metadata = {
  description:
    "Fotografia e video di matrimonio in tutta Italia: wedding film cinematografici e reportage autentici per raccontare il vostro giorno così come l’avete vissuto.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <IntroLogo />
      <Hero />
      {/* ── PRESENTAZIONE GLORIA ── (nascosta finché il video non è disponibile)
      <section className="w-full py-8 md:py-16 px-5 md:px-20 lg:px-32 xl:px-48" data-aos="fade-up">
        <CinemaVideo />
      </section>
      */}
      <ServicesPreview />
      <Phases />
      <PortfolioPreview />
      <AboutUs />
      <InstagramGrid />
      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} image="/cta-finale.jpg" />
    </>
  );
}
