import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";

/**
 * Fascia finale di invito al preventivo.
 * - layout "center": titolo centrato con preventivo + WhatsApp
 * - layout "row": titolo a sinistra e pulsante a destra (scheda portfolio)
 */
export default function FinalBand({ label, title, layout = "center", whatsapp = true }) {
  if (layout === "row") {
    return (
      <section className="bg-beige">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-14">
          <h2 className="font-serif text-3xl text-balance lg:text-5xl">{title}</h2>
          <Button href="/preventivo" fullWidth>
            Richiedi un preventivo
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center lg:px-12 lg:py-32">
        {label && <Label className="mb-6">{label}</Label>}
        <h2 className="font-serif text-4xl leading-tight text-balance lg:text-6xl">{title}</h2>
        <div className="mt-10 flex flex-col gap-4 lg:mt-14 lg:flex-row lg:justify-center">
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
