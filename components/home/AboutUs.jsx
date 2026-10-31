import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { site } from "@/data/site";

const team = [{ name: "[Nome]", role: "Video", photo: null }];

export default function AboutUs() {
  return (
    <section id="chi-siamo" className="bg-crema py-20 lg:py-32">
      {/* Ordine su mobile: citazione, foto, storia, pulsante. Da lg la foto occupa la colonna sinistra. */}
      <Container className="grid gap-y-0 lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-16">
        <div data-reveal className="lg:col-start-2 lg:row-start-2">
          <Label className="mb-6">Chi siamo</Label>
          <blockquote className="font-serif text-3xl leading-tight text-balance lg:text-5xl">
            “Raccontiamo il vostro matrimonio attraverso immagini che <em>restano</em>.”
          </blockquote>
        </div>

        <figure className="mt-12 lg:col-start-1 lg:row-span-5 lg:row-start-1 lg:mt-0 lg:self-center">
          {site.media.aboutPhoto ? (
            <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-beige-scuro lg:aspect-square">
              <Image
                src={site.media.aboutPhoto}
                alt="Il team Future Memories nel backstage"
                fill
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="object-cover object-[50%_15%]"
              />
            </div>
          ) : (
            <MediaPlaceholder label="" className="aspect-square" />
          )}
          <Label as="figcaption" className="mt-4">
            Gloria Margarino · Fondatrice di Future Memories
          </Label>
        </figure>

        <div data-reveal style={{ "--reveal-delay": "120ms" }} className="lg:col-start-2 lg:row-start-3">
          <Label as="h3" className="mb-3 mt-10 lg:mt-14">
            La nostra storia
          </Label>
          <p className="leading-relaxed lg:text-lg">
            Oltre 10 anni di esperienza, un’unica squadra per foto e video e un solo obiettivo: restituirvi il vostro giorno così come l’avete vissuto, attraverso un reportage autentico e cinematografico.
          </p>
        </div>

        <div data-reveal style={{ "--reveal-delay": "240ms" }} className="mt-10 lg:col-start-2 lg:row-start-4 lg:mt-14">
          <Button href="/portfolio" variant="outline" fullWidth>
            Guarda i nostri lavori
          </Button>
        </div>
      </Container>
    </section>
  );
}
