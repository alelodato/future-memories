import Image from "next/image";
import Link from "next/link";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { PlayIcon } from "@/components/ui/Icons";

export default function PortfolioCard({ work, tone = "dark", headingLevel = "h3" }) {
  const Heading = headingLevel;

  return (
    <Link href={`/portfolio/${work.slug}`} className="group block">
      {work.cover ? (
        <div className="relative aspect-[4/5] overflow-hidden bg-beige-scuro lg:aspect-[6/5]">
          <Image
            src={work.cover}
            alt={work.couple}
            fill
            sizes="(min-width: 64rem) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center text-crema">
            <PlayIcon className="h-14 w-14 lg:h-20 lg:w-20" />
          </span>
        </div>
      ) : (
        <MediaPlaceholder
          play
          tone={tone}
          className="aspect-[4/5] transition-opacity group-hover:opacity-90 lg:aspect-[6/5]"
        />
      )}
      <Heading className="mt-4 font-serif text-2xl lg:text-3xl">{work.couple}</Heading>
      <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio">
        {work.location} · {work.date}
      </p>
    </Link>
  );
}
