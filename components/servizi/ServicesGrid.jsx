import Link from "next/link";
import ServiceMedia from "@/components/servizi/ServiceMedia";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function ServicesGrid({ services }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
      {services.map((service, index) => (
        <li key={service.id}>
          <a href={`#${service.id}`} className="group block">
            <ServiceMedia
              service={{ ...service, media: { ...service.media, label: null } }}
              tone={index % 2 === 0 ? "dark" : "light"}
              sizes="(min-width: 64rem) 25vw, 50vw"
              className="aspect-[4/3] transition-opacity group-hover:opacity-90"
            />
            <p className="mt-3 flex items-baseline gap-3 font-serif text-xl lg:mt-4 lg:gap-5 lg:text-3xl">
              <span className="text-marrone-medio lining-nums">{service.number}</span>
              <span className="group-hover:underline">{service.name}</span>
            </p>
          </a>
        </li>
      ))}

      <li className="col-span-2 lg:col-span-1">
        <Link
          href="/preventivo"
          className="group flex h-full min-h-48 flex-col justify-center gap-6 bg-marrone p-6 text-crema lg:p-7"
        >
          <span className="font-serif text-3xl leading-tight">Componete il vostro racconto</span>
          <span className="inline-flex items-center gap-2 self-start font-sans text-xs font-semibold uppercase tracking-[0.2em] group-hover:underline">
            Richiedi un preventivo <ArrowRightIcon />
          </span>
        </Link>
      </li>
    </ul>
  );
}
