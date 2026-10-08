import Link from "next/link";
import { site } from "@/data/site";

/**
 * Logo del sito. Finché public/logo.svg non è disponibile mostra un segnaposto
 * testuale: per attivare il logo basta impostare site.media.logo = "/logo.svg".
 */
export default function Logo({ size = "sm", onNavigate }) {
  const large = size === "lg";

  return (
    <Link href="/" onNavigate={onNavigate} aria-label={`${site.name}, homepage`} className="inline-flex">
      {site.media.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={site.media.logo}
          alt={site.name}
          className={large ? "h-28 w-auto" : "h-11 w-auto lg:h-16"}
        />
      ) : (
        <span className="flex flex-col leading-none text-marrone">
          <span className={`font-serif ${large ? "text-4xl" : "text-2xl lg:text-3xl"}`}>
            Future <em>Memories</em>
          </span>
          <span className="mt-1 font-sans text-[0.55rem] uppercase tracking-[0.3em] text-marrone-medio">
            {site.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
