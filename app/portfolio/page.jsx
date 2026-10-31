import Image from "next/image";
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
                <h2 id={`gruppo-${group.id}`} data-reveal className="font-serif text-3xl lg:text-4xl">
                  {group.title}
                </h2>
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
                  {items.map((work, index) => (
                    <li key={work.slug} data-reveal style={{ "--reveal-delay": `${Math.min(index, 4) * 120}ms` }}>
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

  // Da lg: tre foto verticali sfalsate a destra del titolo (la centrale più in basso).
  const heroPhotos = ["/portfolio-1.jpg", "/portfolio-2.jpg", "/portfolio-3.jpg"];

  const hero = (
    <>
      {/* Sotto lg: foto a schermo intero con velo marrone, senza animazioni */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <Image src="/portfolio-1.jpg" alt="" fill sizes="100vw" fetchPriority="high" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-marrone/35 to-marrone/80" />
      </div>

      <Container className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="max-lg:[&_h1]:text-crema">
          <div data-reveal="fade">
            <SectionTitle as="h1" size="xl">
              Portfolio
            </SectionTitle>
          </div>
          <p data-reveal="fade" style={{ "--reveal-delay": "120ms" }} className="mt-3 text-crema lg:mt-4 lg:text-lg lg:text-marrone-medio">Le storie di chi ci ha scelto.</p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 lg:items-start lg:gap-4">
          {heroPhotos.map((src, index) => (
            <div
              key={src}
              data-reveal="image-fade"
              style={{ "--reveal-delay": `${index * 150}ms` }}
              className={`relative aspect-[2/3] overflow-hidden bg-beige-scuro ${index === 1 ? "mt-12" : ""}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 80rem) 176px, 14vw"
                fetchPriority={index === 0 ? "high" : undefined}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>

      {/* Sotto lg: invito a scorrere */}
      <svg
        viewBox="0 0 16 40"
        fill="none"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 h-10 w-4 -translate-x-1/2 animate-bounce text-crema [animation-duration:2.4s] motion-reduce:animate-none lg:hidden"
      >
        <path d="M8 1v37M2 32l6 6 6-6" stroke="currentColor" strokeWidth="1" />
      </svg>
    </>
  );

  return (
    <>
      {/* Il punto di aggancio su mobile è la hero (in PortfolioTabs), alta come le storie video */}
      <section className="bg-crema lg:pb-10 lg:pt-20">
        <PortfolioTabs hero={hero} video={videoPanel} foto={photoPanel} />
      </section>

      <FinalBand title={<>Raccontaci il <em>vostro giorno</em></>} />
    </>
  );
}
