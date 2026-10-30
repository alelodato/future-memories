import Image from "next/image";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { anniversary } from "@/data/services";

/**
 * Schede dei servizi della pagina Servizi: carosello su mobile e tablet, griglia di 3 colonne da lg.
 * In fondo la scheda dell'Anniversario, senza numero: da lg occupa tutta la riga.
 */
export default function ServicesCards({ services }) {
  return (
    <ul
      data-reveal="fade"
      className="relative left-1/2 -my-4 flex w-screen -translate-x-1/2 snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:static lg:grid lg:w-full lg:translate-x-0 lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
    >
      {services.map((service) => (
        <li key={service.id} className="w-[75%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
          <a href={`#${service.id}`} className="hover-lift group relative block aspect-[4/5] overflow-hidden bg-beige-scuro lg:aspect-[4/3]">
            {service.media.image ? (
              <Image
                src={service.media.image}
                alt={service.title}
                fill
                sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 40vw, 75vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: service.imagePosition ?? "50% 50%" }}
              />
            ) : (
              <MediaPlaceholder play={service.media.type === "video"} className="absolute inset-0" />
            )}
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-marrone/85 to-transparent" aria-hidden="true" />
            <span className="absolute bottom-0 left-0 p-5 text-crema lg:p-6">
              <span className="block font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-crema/80 lining-nums">
                {service.number}
              </span>
              <span className="mt-1 block font-serif text-2xl leading-tight lg:text-3xl">{service.name}</span>
            </span>
          </a>
        </li>
      ))}

      <li className="w-[75%] shrink-0 snap-start sm:w-[40%] lg:col-span-3 lg:w-auto">
        <a href={`#${anniversary.id}`} className="hover-lift group relative block aspect-[4/5] overflow-hidden bg-beige-scuro lg:aspect-[4/1]">
          {anniversary.media.image ? (
            <Image
              src={anniversary.media.image}
              alt={anniversary.title}
              fill
              sizes="(min-width: 64rem) 100vw, (min-width: 40rem) 40vw, 75vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: anniversary.imagePosition ?? "50% 50%" }}
            />
          ) : (
            <MediaPlaceholder play={anniversary.media.type === "video"} className="absolute inset-0" />
          )}
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-marrone/85 to-transparent" aria-hidden="true" />
          <span className="absolute bottom-0 left-0 p-5 text-crema lg:p-6">
            <span className="block font-serif text-2xl leading-tight lg:text-3xl">{anniversary.label}</span>
          </span>
        </a>
      </li>
    </ul>
  );
}
