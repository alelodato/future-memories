import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

/** Anteprima dei servizi in home: carosello su mobile e tablet, griglia di 3 colonne da lg. */
export default function ServicesPreview() {
  return (
    <section aria-labelledby="servizi-anteprima" className="bg-sabbia py-20 lg:py-32">
      <Container>
        <SectionTitle label="Servizi">
          <span id="servizi-anteprima">
            Foto, video e molto di più: scegliete come rivivere e condividere il vostro giorno.
          </span>
        </SectionTitle>

        <ul className="relative left-1/2 mt-10 flex w-screen -translate-x-1/2 snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:static lg:mt-14 lg:grid lg:w-full lg:translate-x-0 lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
          {services.map((service) => (
            <li key={service.id} className="w-[75%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
              <Link href={`/servizi#${service.id}`} className="group relative block aspect-[4/5] overflow-hidden bg-beige-scuro">
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
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center lg:mt-14">
          <Button href="/servizi" variant="outline" fullWidth>
            Scopri tutti i servizi
          </Button>
        </div>
      </Container>
    </section>
  );
}
