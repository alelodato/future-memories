import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import Container from "@/components/ui/Container";
import FinalBand from "@/components/ui/FinalBand";
import SectionTitle from "@/components/ui/SectionTitle";
import { portfolio } from "@/data/portfolio";

export const metadata = {
  title: "Portfolio",
  description: "Il vostro matrimonio raccontato in un unico flusso cinematografico",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-crema py-14 lg:py-20">
        <Container>
          <SectionTitle as="h1" size="xl">
            Portfolio
          </SectionTitle>
          <p className="mt-3 text-marrone-medio lg:mt-4 lg:text-lg">
            Il vostro matrimonio raccontato in un unico flusso cinematografico
          </p>

          <div className="mt-10 lg:mt-14">
            <PortfolioGrid works={portfolio} headingLevel="h2" />
          </div>
        </Container>
      </section>

      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} />
    </>
  );
}
