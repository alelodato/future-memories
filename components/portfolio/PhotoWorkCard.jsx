import Link from "next/link";
import CoupleName from "@/components/portfolio/CoupleName";

/** Scheda di un lavoro fotografico nella sezione Foto del portfolio. */
export default function PhotoWorkCard({ work, headingLevel: Heading = "h3" }) {
  return (
    <Link href={`/portfolio/${work.slug}`} className="hover-lift group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige-scuro">
        {work.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.cover}
            alt={`${work.typeLabel} di ${work.couple}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.03]"
            style={{ objectFit: "cover", objectPosition: work.coverPosition }}
          />
        )}
      </div>
      <Heading className="mt-4 font-serif text-2xl leading-tight lg:text-3xl">
        <CoupleName couple={work.couple} />
      </Heading>
      <p className="mt-1 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-marrone-medio">
        {work.location} · {work.date}
      </p>
    </Link>
  );
}
