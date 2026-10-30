import Image from "next/image";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";

/**
 * Fascia finale di invito al preventivo.
 * - layout "center": titolo centrato con preventivo + WhatsApp
 * - layout "row": titolo a sinistra e pulsante a destra (scheda portfolio)
 * - image (facoltativa, solo layout "center"): foto di sfondo con velo scuro e testi crema
 */
export default function FinalBand({ label, title, layout = "center", whatsapp = true, image, imagePosition = "center" }) {
  if (layout === "row") {
    return (
      <section className="bg-beige">
        <div data-reveal className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-14">
          <h2 className="font-serif text-3xl text-balance lg:text-5xl">{title}</h2>
          <Button href="/preventivo" fullWidth>
            Richiedi un preventivo
          </Button>
        </div>
      </section>
    );
  }

  if (image) {
    return (
      <section className="relative overflow-hidden bg-marrone">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-marrone/70" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center text-crema lg:px-12 lg:py-32">
          {label && (
            <div data-reveal>
              <Label className="mb-6 text-crema/80!">{label}</Label>
            </div>
          )}
          <h2 data-reveal style={{ "--reveal-delay": "120ms" }} className="font-serif text-4xl leading-tight text-balance lg:text-6xl">{title}</h2>
          <div data-reveal style={{ "--reveal-delay": "240ms" }} className="mt-10 flex flex-col gap-4 lg:mt-14 lg:flex-row lg:justify-center">
            <Button href="/preventivo" variant="cream" fullWidth>
              Richiedi un preventivo
            </Button>
            {whatsapp && (
              <Button href={site.whatsappHref} variant="light" fullWidth>
                Scrivici su WhatsApp
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center lg:px-12 lg:py-32">
        {label && (
          <div data-reveal>
            <Label className="mb-6">{label}</Label>
          </div>
        )}
        <h2 data-reveal style={{ "--reveal-delay": "120ms" }} className="font-serif text-4xl leading-tight text-balance lg:text-6xl">{title}</h2>
        <div data-reveal style={{ "--reveal-delay": "240ms" }} className="mt-10 flex flex-col gap-4 lg:mt-14 lg:flex-row lg:justify-center">
          <Button href="/preventivo" fullWidth>
            Richiedi un preventivo
          </Button>
          {whatsapp && (
            <Button href={site.whatsappHref} variant="outline" fullWidth>
              Scrivici su WhatsApp
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
