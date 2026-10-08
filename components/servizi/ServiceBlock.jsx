import ServiceMedia from "@/components/servizi/ServiceMedia";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";

/** Blocco di un servizio: immagine e testo, alternati a destra e sinistra. */
export default function ServiceBlock({ service, index }) {
  const imageFirst = index % 2 === 0;

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-titolo`}
      className={index % 2 === 0 ? "bg-crema py-16 lg:py-28" : "bg-sabbia py-16 lg:py-28"}
    >
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className={imageFirst ? "lg:order-first" : "lg:order-last"}>
          <ServiceMedia
            service={service}
            tone={imageFirst ? "light" : "dark"}
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="aspect-square"
          />
        </div>

        <div>
          <Label className="mb-5">
            Servizio {service.number} · {service.name}
          </Label>
          <h2 id={`${service.id}-titolo`} className="font-serif text-4xl leading-tight text-balance lg:text-6xl">
            {service.title}
          </h2>
          <p className="mt-6 leading-relaxed lg:mt-8 lg:text-lg">{service.text}</p>

          <Label as="h3" className="mb-4 mt-10 lg:mt-12">
            Cosa include
          </Label>
          <ul className="list-disc space-y-2 pl-5 marker:text-marrone">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-10 lg:mt-12">
            <Button href="/preventivo" variant="outline" fullWidth>
              Richiedi un preventivo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
