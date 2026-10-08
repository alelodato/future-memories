import AboutUs from "@/components/home/AboutUs";
import Hero from "@/components/home/Hero";
import InstagramGrid from "@/components/home/InstagramGrid";
import Phases from "@/components/home/Phases";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import FinalBand from "@/components/ui/FinalBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Phases />
      <PortfolioPreview />
      <AboutUs />
      <InstagramGrid />
      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} />
    </>
  );
}
