import ServiceBlock from "@/components/servizi/ServiceBlock";
import ServicesGrid from "@/components/servizi/ServicesGrid";
import Container from "@/components/ui/Container";
import FinalBand from "@/components/ui/FinalBand";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

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
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <SectionTitle as="h1" size="xl">
              Servizi
            </SectionTitle>
            <p className="max-w-xl leading-relaxed lg:mt-3 lg:text-lg">
              Foto e video del vostro matrimonio, più tutto ciò che serve per raccontarlo e condividerlo.
            </p>
          </div>

          <div className="mt-10 lg:mt-14">
            <ServicesGrid services={services} />
          </div>
        </Container>
      </section>

      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      <FinalBand
        label="Un preventivo su misura"
        title={
          <>
            Ogni matrimonio è diverso: scegliete i servizi e vi prepariamo una proposta su <em>misura</em>
          </>
        }
      />
    </>
  );
}
