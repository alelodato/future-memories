import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/portfolio/Gallery";
import PrevNext from "@/components/portfolio/PrevNext";
import VimeoPlayer from "@/components/portfolio/VimeoPlayer";
import Container from "@/components/ui/Container";
import FinalBand from "@/components/ui/FinalBand";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { getAdjacentWorks, getWork, portfolio } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolio.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.couple,
    description: `${work.couple} · ${work.location} · ${work.date}`,
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const { previous, next } = getAdjacentWorks(slug);

  return (
    <>
      <section className="bg-sabbia pb-14 pt-8 lg:pb-20 lg:pt-10">
        <Container>
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio hover:underline"
            >
              <ArrowLeftIcon /> Tutti i lavori
            </Link>
            <h1 className="mt-6 font-serif text-5xl leading-tight lg:text-7xl">{work.couple}</h1>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio lg:text-sm">
              {work.location} · {work.date}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl lg:mt-12">
            <VimeoPlayer vimeoId={work.vimeoId} title={`Video del matrimonio di ${work.couple}`} />
          </div>
        </Container>
      </section>

      <section aria-label="Galleria fotografica" className="bg-sabbia pb-14 lg:pb-20">
        <Container>
          <Gallery photos={work.gallery} title="Galleria" />
        </Container>
      </section>

      <FinalBand layout="row" title={<>Volete un ricordo <em>così</em>?</>} />

      <PrevNext previous={previous} next={next} />
    </>
  );
}
