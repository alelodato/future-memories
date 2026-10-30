import ServiceBlock from "@/components/servizi/ServiceBlock";
import ServicesGrid from "@/components/servizi/ServicesGrid";
import Container from "@/components/ui/Container";
import FinalBand from "@/components/ui/FinalBand";
import SectionTitle from "@/components/ui/SectionTitle";
import { anniversary, services } from "@/data/services";

export const metadata = {
  title: "Servizi",
  description:
    "Foto e video del vostro matrimonio, più tutto ciò che serve per raccontarlo e condividerlo.",
};

export default function ServiziPage() {
  return (
    <>
      <section className="bg-sabbia py-14 lg:py-20">
        <Container>
          <SectionTitle as="h1" size="xl">
            Servizi
          </SectionTitle>
          <p className="mt-5 max-w-xl leading-relaxed lg:mt-6 lg:text-lg">
            Foto, video e molto di più: scegliete come rivivere e condividere il vostro giorno.
          </p>

          <div className="mt-10 lg:mt-14">
            <ServicesGrid services={services} />
          </div>
        </Container>
      </section>

      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      <ServiceBlock service={anniversary} index={services.length} />

      <FinalBand
        label="Un preventivo su misura"
        title="Ogni matrimonio è diverso: componete il vostro pacchetto e vi invieremo una proposta personalizzata."
      />
    </>
  );
}
