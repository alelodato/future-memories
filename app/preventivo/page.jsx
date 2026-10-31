import Image from "next/image";
import QuoteForm from "@/components/preventivo/QuoteForm";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

export const metadata = {
  title: "Richiedi un preventivo",
  description:
    "Richiedete un preventivo per foto e video del vostro matrimonio in tutta Italia: raccontateci il vostro giorno e vi prepariamo una proposta su misura.",
  alternates: { canonical: "/preventivo" },
};

function DirectContact({ className, variant = "outline" }) {
  return (
    <div className={className}>
      <p className="text-marrone-medio lg:text-crema/80">Preferite contattarci direttamente?</p>
      <div className="mt-4">
        <Button href={site.whatsappHref} variant={variant} fullWidth>
          Scrivici su WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default function PreventivoPage() {
  return (
    <section className="bg-beige-scuro py-14 lg:bg-sabbia lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:relative lg:col-span-4 lg:overflow-hidden lg:p-12 lg:[&_h1]:text-crema">
          {/* Da lg: la colonna diventa un riquadro con foto di sfondo e velo marrone (sotto lg non viene caricata) */}
          <div data-reveal="image-fade" className="absolute inset-0 hidden lg:block" aria-hidden="true">
            <Image src="/preventivo.jpg" alt="" fill sizes="(min-width: 80rem) 400px, 33vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-marrone/55 to-marrone/75" />
          </div>
          <SectionTitle as="h1" size="lg" className="lg:relative">
            Richiedi un <em>preventivo</em>
          </SectionTitle>
          <p className="mt-6 leading-relaxed lg:relative lg:text-lg lg:text-crema">
            Raccontateci il vostro giorno, vi prepariamo una proposta su misura.
          </p>
          <DirectContact className="mt-16 hidden lg:relative lg:block" variant="outline-light" />
        </div>

        <div data-reveal="fade" style={{ "--reveal-delay": "120ms" }} className="lg:col-span-8">
          <QuoteForm />
          <DirectContact className="mt-12 lg:hidden" />
        </div>
      </Container>
    </section>
  );
}
