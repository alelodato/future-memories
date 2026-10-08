import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

export default function PrevNext({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Altri lavori" className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:px-12 lg:py-14">
      <div>
        {previous && (
          <Link href={`/portfolio/${previous.slug}`} className="group inline-block">
            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio">
              <ArrowLeftIcon /> Precedente
            </span>
            <span className="mt-1 block font-serif text-xl group-hover:underline lg:text-3xl">{previous.couple}</span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link href={`/portfolio/${next.slug}`} className="group inline-block">
            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio">
              Successivo <ArrowRightIcon />
            </span>
            <span className="mt-1 block font-serif text-xl group-hover:underline lg:text-3xl">{next.couple}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
