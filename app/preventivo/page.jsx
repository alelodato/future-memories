import QuoteForm from "@/components/preventivo/QuoteForm";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

export const metadata = {
  title: "Richiedi un preventivo",
  description: "Raccontateci il vostro giorno, vi prepariamo una proposta su misura.",
};

function DirectContact({ className }) {
  return (
    <div className={className}>
      <p className="text-marrone-medio">Preferite contattarci direttamente?</p>
      <div className="mt-4">
        <Button href={site.whatsappHref} variant="outline" fullWidth>
          Scrivici su WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default function PreventivoPage() {
  return (
    <section className="bg-sabbia py-14 lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionTitle as="h1" size="lg">
            Richiedi un <em>preventivo</em>
          </SectionTitle>
          <p className="mt-6 leading-relaxed lg:text-lg">
            Raccontateci il vostro giorno, vi prepariamo una proposta su misura.
          </p>
          <DirectContact className="mt-16 hidden lg:block" />
        </div>

        <div className="lg:col-span-8">
          <QuoteForm />
          <DirectContact className="mt-12 lg:hidden" />
        </div>
      </Container>
    </section>
  );
}
