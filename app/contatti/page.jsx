import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

export const metadata = {
  title: "Contatti",
  description:
    "Contattate Future Memories per foto e video del vostro matrimonio in tutta Italia: email, telefono, WhatsApp e Instagram. Vi rispondiamo entro 24 ore.",
  alternates: { canonical: "/contatti" },
};

const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Telefono / WhatsApp", value: site.phone, href: site.phoneHref },
  { label: "Instagram", value: site.instagram.handle, href: site.instagram.href, external: true },
  { label: "Zona di lavoro", value: site.workArea },
];

export default function ContattiPage() {
  return (
    <section className="bg-beige-scuro py-14 lg:bg-crema lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-7">
          <SectionTitle as="h1" size="xl">
            Contatti
          </SectionTitle>
          <p className="mt-4 lg:text-lg">Parliamo del vostro matrimonio: vi rispondiamo entro {site.responseTime}.</p>

          <dl className="mt-10 lg:mt-14">
            {contacts.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 border-b border-crema py-5 lg:grid-cols-[16rem_1fr] lg:items-baseline lg:gap-6 lg:border-beige lg:py-7"
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

        <aside data-reveal style={{ "--reveal-delay": "120ms" }} className="relative flex flex-col justify-center overflow-hidden bg-crema p-8 lg:col-span-5 lg:bg-beige lg:p-10">
          {/* Da lg: foto di sfondo con velo marrone (sotto lg non viene caricata) */}
          <div data-reveal="image-fade" className="absolute inset-0 hidden lg:block" aria-hidden="true">
            <Image src="/contatti.jpg" alt="" fill sizes="(min-width: 80rem) 520px, 40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-marrone/55 to-marrone/75" />
          </div>
          <h2 className="relative font-serif text-3xl leading-tight text-balance lg:text-5xl lg:text-crema">
            Pronti a raccontare il <em>vostro giorno</em>?
          </h2>
          <div className="relative mt-10 flex flex-col gap-4 lg:mt-16">
            <Button href="/preventivo" variant="solid-cream" className="w-full">
              Richiedi un preventivo
            </Button>
            <Button href={site.whatsappHref} variant="outline-light" className="w-full">
              Scrivici su WhatsApp
            </Button>
          </div>
        </aside>
      </Container>
    </section>
  );
}
