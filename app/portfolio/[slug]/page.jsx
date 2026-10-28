import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlbumGallery from "@/components/portfolio/AlbumGallery";
import CoupleName from "@/components/portfolio/CoupleName";
import PrevNext from "@/components/portfolio/PrevNext";
import StickyQuoteBar from "@/components/portfolio/StickyQuoteBar";
import VimeoPlayer from "@/components/portfolio/VimeoPlayer";
import Container from "@/components/ui/Container";
import FinalBand from "@/components/ui/FinalBand";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { getWedding, getWeddings } from "@/lib/portfolio";

export async function generateStaticParams() {
  const weddings = await getWeddings();
  // Con Cache Components serve almeno un parametro: il segnaposto porta a una pagina 404.
  return weddings.length ? weddings.map((wedding) => ({ slug: wedding.slug })) : [{ slug: "nessun-matrimonio" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getWedding(slug);
  if (!result) return {};
  const { wedding } = result;
  return {
    title: wedding.couple,
    description: `${wedding.couple} · ${wedding.location} · ${wedding.date}`,
    openGraph: wedding.cover ? { images: [wedding.cover] } : undefined,
  };
}

export default function WeddingPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-sabbia" />}>
      <WeddingContent params={params} />
    </Suspense>
  );
}

async function WeddingContent({ params }) {
  const { slug } = await params;
  const result = await getWedding(slug);
  if (!result) notFound();

  const { wedding, previous, next } = result;

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
            <h1 className="mt-6 font-serif text-5xl leading-tight lg:text-7xl">
              <CoupleName couple={wedding.couple} />
            </h1>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio lg:text-sm">
              {wedding.location} · {wedding.date}
            </p>
          </div>

          <div id="racconto-video" className="mx-auto mt-10 max-w-5xl lg:mt-12">
            {wedding.vimeoId ? (
              <VimeoPlayer vimeoId={wedding.vimeoId} title={`Video del matrimonio di ${wedding.couple}`} />
            ) : (
              wedding.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={wedding.cover}
                  alt={`Matrimonio di ${wedding.couple}`}
                  className="aspect-video w-full"
                  style={{ objectFit: "cover", objectPosition: wedding.coverPosition }}
                />
              )
            )}
          </div>
        </Container>
      </section>

      {wedding.photos.length > 0 && (
        <section aria-label="Galleria fotografica" className="bg-sabbia pb-14 lg:pb-24">
          <Container>
            <AlbumGallery photos={wedding.photos} label={`Matrimonio di ${wedding.couple}`} />
          </Container>
        </section>
      )}

      <FinalBand layout="row" title={<>Volete un ricordo <em>così</em>?</>} />

      {previous && next && <PrevNext previous={previous} next={next} />}

      <StickyQuoteBar targetId="racconto-video" />
    </>
  );
}