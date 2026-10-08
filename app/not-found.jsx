import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = { title: "Pagina non trovata" };

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="text-center">
        <SectionTitle as="h1" size="lg" align="center" label="Errore 404">
          Pagina non <em>trovata</em>
        </SectionTitle>
        <div className="mt-10">
          <Button href="/">Torna alla homepage</Button>
        </div>
      </Container>
    </section>
  );
}
