import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

export const metadata = {
  title: "Contatti",
  description: `Scriveteci, vi rispondiamo entro ${site.responseTime}.`,
};

const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Telefono / WhatsApp", value: site.phone, href: site.phoneHref },
  { label: "Instagram", value: site.instagram.handle, href: site.instagram.href, external: true },
  { label: "Zona di lavoro", value: site.workArea },
];

export default function ContattiPage() {
  return (
    <section className="bg-crema py-14 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionTitle as="h1" size="xl">
            Contatti
          </SectionTitle>
          <p className="mt-4 lg:text-lg">Scriveteci, vi rispondiamo entro {site.responseTime}.</p>

          <dl className="mt-10 lg:mt-14">
            {contacts.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 border-b border-beige py-5 lg:grid-cols-[16rem_1fr] lg:items-baseline lg:gap-6 lg:py-7"
              >
                <dt>
                  <Label as="span">{item.label}</Label>
                </dt>
                <dd className="text-lg lg:text-xl">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-words hover:underline"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="flex flex-col justify-center bg-beige p-8 lg:col-span-5 lg:p-10">
          <h2 className="font-serif text-3xl leading-tight text-balance lg:text-5xl">
            Pronti a raccontare il <em>vostro giorno</em>?
          </h2>
          <div className="mt-10 flex flex-col gap-4 lg:mt-16">
            <Button href="/preventivo" className="w-full">
              Richiedi un preventivo
            </Button>
            <Button href={site.whatsappHref} variant="outline" className="w-full">
              Scrivici su WhatsApp
            </Button>
          </div>
        </aside>
      </Container>
    </section>
  );
}
