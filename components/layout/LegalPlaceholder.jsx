import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

/** Pagina legale segnaposto, in attesa dei testi definitivi. */
export default function LegalPlaceholder({ title }) {
  return (
    <section className="bg-crema py-16 lg:py-24">
      <Container className="max-w-3xl">
        <SectionTitle as="h1" size="lg">{title}</SectionTitle>
        <p className="mt-8 leading-relaxed text-marrone-medio">[Testo in arrivo]</p>
      </Container>
    </section>
  );
}
