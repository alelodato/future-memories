import Link from "next/link";
import CoupleName from "@/components/portfolio/CoupleName";
import TeaserVideo from "@/components/portfolio/TeaserVideo";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function WeddingStory({ wedding, index, headingLevel: Heading = "h2" }) {
  const number = String(index + 1).padStart(2, "0");
  const alt = `Anteprima del matrimonio di ${wedding.couple}`;

  return (
    <article className="snap-start lg:py-16">
      <Link href={`/portfolio/${wedding.slug}`} className="group block lg:mx-auto lg:max-w-6xl lg:px-12">
        {/* Testo sopra il video, solo da lg */}
        <div className="hidden lg:mb-8 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-marrone-medio">
              {number} · {wedding.typeLabel}
            </p>
            <Heading className="mt-4 font-serif text-6xl leading-[1.05] xl:text-7xl">
              <CoupleName couple={wedding.couple} />
            </Heading>
          </div>
          <div className="shrink-0 pb-2 text-right">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-marrone-medio">
              {wedding.location} · {wedding.date}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 border-b border-marrone pb-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all group-hover:gap-3">
              Guarda il racconto <ArrowRightIcon />
            </p>
          </div>
        </div>

        {/* Video: a schermo intero verticale su mobile, 16:9 da lg */}
        <div className="relative h-[calc(100svh-var(--navbar-height))] overflow-hidden bg-beige-scuro lg:aspect-video lg:h-auto">
          <div className="absolute inset-0 lg:hidden">
            <TeaserVideo
              src={wedding.teaser}
              poster={wedding.cover}
              posterPosition={wedding.coverPosition}
              alt={alt}
              className="h-full w-full"
            />
          </div>
          <div className="absolute inset-0 hidden lg:block">
            <TeaserVideo
              src={wedding.teaserLandscape}
              poster={wedding.cover}
              posterPosition={wedding.coverPositionDesktop}
              alt={alt}
              className="h-full w-full transition duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* Testo sopra il video, solo mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-marrone/85 via-marrone/10 to-transparent lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-crema lg:hidden">
            <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-crema/80">
              {number} · {wedding.typeLabel}
            </p>
            <Heading className="mt-3 font-serif text-5xl leading-[1.05]">
              <CoupleName couple={wedding.couple} />
            </Heading>
            <p className="mt-3 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-crema/80">
              {wedding.location} · {wedding.date}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              Guarda il racconto <ArrowRightIcon />
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
