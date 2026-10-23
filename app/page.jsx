import AboutUs from "@/components/home/AboutUs";
import Hero from "@/components/home/Hero";
import CinemaVideo from "@/components/home/CinemaVideo";
import InstagramGrid from "@/components/home/InstagramGrid";
import Phases from "@/components/home/Phases";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import FinalBand from "@/components/ui/FinalBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* ── PRESENTAZIONE GLORIA ── */}
      <section className="w-full py-8 md:py-16 px-5 md:px-20 lg:px-32 xl:px-48" data-aos="fade-up">
        <CinemaVideo />
      </section>
      <Phases />
      <PortfolioPreview />
      <AboutUs />
      <InstagramGrid />
      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} />
    </>
  );
}
