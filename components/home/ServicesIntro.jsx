import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

const video = services.find((service) => service.id === "video");

/**
 * Presentazione dei servizi in home. Ordine su mobile: titolo, immagine, testo e pulsante.
 * Da lg testo a sinistra (centrato in verticale) e immagine a destra, come Chi siamo ma specchiato.
 */
export default function ServicesIntro() {
  return (
    <section aria-label="Servizi" className="bg-beige py-20 lg:py-32">
      <Container className="grid gap-y-0 lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16">
        <div data-reveal className="lg:col-start-1 lg:row-start-2">
          <SectionTitle label="Servizi">Foto, video e molto di più</SectionTitle>
        </div>

        <div
          data-reveal="image"
          className="relative mt-12 aspect-[4/5] overflow-hidden bg-beige-scuro lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:self-center"
        >
          <Image
            src="/servizio-video.jpg"
            alt=""
            fill
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: video?.imagePosition ?? "50% 50%" }}
          />
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" }} className="mt-10 lg:col-start-1 lg:row-start-3 lg:mt-8">
          <p className="leading-relaxed lg:text-lg">
            Foto e video del vostro matrimonio, riprese con il drone, wedding trailer, video live, discorsi integrali, videoclip, reel social e servizi pre e post wedding: scegliete ciò che vi rappresenta e costruiamo insieme il vostro racconto.
          </p>
          <div className="mt-10 lg:mt-14">
            <Button href="/servizi" variant="outline" fullWidth>
              Scopri i servizi
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
