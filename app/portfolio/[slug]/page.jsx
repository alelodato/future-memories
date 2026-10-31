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
    title: `${wedding.couple} · ${wedding.typeLabel}`,
    description: `${wedding.typeLabel} di ${wedding.couple} · ${wedding.location}, ${wedding.date.toLowerCase()}. Un racconto firmato Future Memories, foto e video in tutta Italia.`,
    alternates: { canonical: `/portfolio/${slug}` },
    // Senza copertina la chiave manca del tutto, così la scheda eredita l'Open Graph del layout.
    ...(wedding.cover && {
      openGraph: { type: "website", locale: "it_IT", siteName: "Future Memories", images: [wedding.cover] },
    }),
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
  const isPhoto = wedding.kind === "foto";
  const galleryLabel = `${wedding.category === "anniversario" ? "Anniversario" : "Matrimonio"} di ${wedding.couple}`;

  return (
    <>
      <section className="bg-sabbia pb-14 pt-8 lg:pb-20 lg:pt-10">
        <Container>
          <div id="racconto-intestazione" data-reveal className="text-center">
            <Link
              href={isPhoto ? "/portfolio#foto" : "/portfolio"}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio hover:underline"
            >
              <ArrowLeftIcon /> Tutti i lavori
            </Link>
            <p className="mt-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-marrone-medio">
              {wedding.typeLabel}
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-tight lg:text-7xl">
              <CoupleName couple={wedding.couple} />
            </h1>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio lg:text-sm">
              {wedding.location} · {wedding.date}
            </p>
          </div>

          {!isPhoto && (
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
                    style={{ objectFit: "cover", objectPosition: wedding.coverPositionDesktop }}
                  />
                )
              )}
            </div>
          )}
        </Container>
      </section>

      {wedding.photos.length > 0 && (
        <section aria-label="Galleria fotografica" className="bg-sabbia pb-14 lg:pb-24">
          <Container>
            <AlbumGallery photos={wedding.photos} label={galleryLabel} />
          </Container>
        </section>
      )}

      <FinalBand layout="row" title={<>Volete un ricordo <em>così</em>?</>} />

      {previous && next && <PrevNext previous={previous} next={next} />}

      <StickyQuoteBar targetId={isPhoto ? "racconto-intestazione" : "racconto-video"} />
    </>
  );
}
