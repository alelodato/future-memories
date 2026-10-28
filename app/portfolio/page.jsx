import WeddingStory from "@/components/portfolio/WeddingStory";
import Container from "@/components/ui/Container";
import FinalBand from "@/components/ui/FinalBand";
import SectionTitle from "@/components/ui/SectionTitle";
import { getWeddings } from "@/lib/portfolio";

export const metadata = {
  title: "Portfolio",
  description: "Il vostro matrimonio raccontato in un unico flusso cinematografico",
};

export default async function PortfolioPage() {
  const weddings = await getWeddings();

  return (
    <>
      <section className="bg-crema pt-14 lg:pb-10 lg:pt-20">
        <Container>
          <SectionTitle as="h1" size="xl">
            Portfolio
          </SectionTitle>
          <p className="mt-3 text-marrone-medio lg:mt-4 lg:text-lg">
            Il vostro matrimonio raccontato in un unico flusso cinematografico
          </p>
        </Container>

        {weddings.length ? (
          <div data-snap-stories className="mt-10 space-y-px lg:mt-6 lg:space-y-0">
            {weddings.map((wedding, index) => (
              <WeddingStory key={wedding.slug} wedding={wedding} index={index} />
            ))}
          </div>
        ) : (
          <Container>
            <p className="pb-14 pt-10 text-marrone-medio">I primi racconti arriveranno presto.</p>
          </Container>
        )}
      </section>

      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} />
    </>
  );
}