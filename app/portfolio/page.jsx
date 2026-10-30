import FinalBand from "@/components/ui/FinalBand";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import PhotoWorkCard from "@/components/portfolio/PhotoWorkCard";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";
import WeddingStory from "@/components/portfolio/WeddingStory";
import { getWeddings } from "@/lib/portfolio";

export const metadata = {
  title: "Portfolio",
  description:
    "Wedding film e reportage fotografici di matrimoni e anniversari in tutta Italia: guardate le storie di chi ci ha scelto e immaginate il vostro racconto.",
  alternates: { canonical: "/portfolio" },
};

const PHOTO_GROUPS = [
  { id: "matrimonio", title: "Matrimoni" },
  { id: "anniversario", title: "Anniversari di matrimonio" },
];

export default async function PortfolioPage() {
  const works = await getWeddings();
  const videos = works.filter((work) => work.kind === "video");
  const photos = works.filter((work) => work.kind === "foto");

  const videoPanel = videos.length ? (
    <div className="mt-10 space-y-px lg:mt-6 lg:space-y-0">
      {videos.map((wedding, index) => (
        <WeddingStory key={wedding.slug} wedding={wedding} index={index} />
      ))}
    </div>
  ) : (
    <Container>
      <p className="pb-14 pt-10 text-marrone-medio">I primi racconti arriveranno presto.</p>
    </Container>
  );

  const photoPanel = (
    <Container>
      {photos.length ? (
        <div className="space-y-16 pb-16 pt-10 lg:space-y-20 lg:pb-24 lg:pt-14">
          {PHOTO_GROUPS.map((group) => {
            const items = photos.filter((work) => work.category === group.id);
            if (!items.length) return null;
            return (
              <section key={group.id} aria-labelledby={`gruppo-${group.id}`}>
                <h2 id={`gruppo-${group.id}`} className="font-serif text-3xl lg:text-4xl">
                  {group.title}
                </h2>
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
                  {items.map((work) => (
                    <li key={work.slug}>
                      <PhotoWorkCard work={work} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="pb-14 pt-10 text-marrone-medio">Le prime gallerie arriveranno presto.</p>
      )}
    </Container>
  );

  return (
    <>
      {/* snap-start: l'inizio della pagina è un punto di aggancio, così su mobile si apre dal titolo */}
      <section className="snap-start bg-crema pt-14 lg:pb-10 lg:pt-20">
        <Container>
          <SectionTitle as="h1" size="xl">
            Portfolio
          </SectionTitle>
          <p className="mt-3 text-marrone-medio lg:mt-4 lg:text-lg">Le storie di chi ci ha scelto.</p>
        </Container>

        <PortfolioTabs video={videoPanel} foto={photoPanel} />
      </section>

      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} />
    </>
  );
}
