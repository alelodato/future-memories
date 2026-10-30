import Link from "next/link";
import CoupleName from "@/components/portfolio/CoupleName";
import TeaserVideo from "@/components/portfolio/TeaserVideo";

export default function WeddingCard({ wedding, headingLevel: Heading = "h3" }) {
  return (
    <Link href={`/portfolio/${wedding.slug}`} className="hover-lift group block">
      <div className="relative aspect-[9/16] overflow-hidden bg-beige-scuro lg:aspect-[4/5]">
        <TeaserVideo
          src={wedding.teaser}
          poster={wedding.cover}
          posterPosition={wedding.coverPosition}
          alt={`Anteprima del matrimonio di ${wedding.couple}`}
          className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-marrone-medio">
        {wedding.typeLabel}
      </p>
      <Heading className="mt-1 font-serif text-2xl leading-tight lg:text-3xl">
        <CoupleName couple={wedding.couple} />
      </Heading>
      <p className="mt-1 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-marrone-medio">
        {wedding.location} · {wedding.date}
      </p>
    </Link>
  );
}
