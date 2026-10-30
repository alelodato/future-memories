import Link from "next/link";
import ServicesCards from "@/components/servizi/ServicesCards";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function ServicesGrid({ services }) {
  return (
    <>
    <ServicesCards services={services} />

    <Link
      href="/preventivo"
      data-reveal
      className="group mt-8 flex min-h-48 w-full flex-col justify-center gap-6 bg-marrone p-6 text-crema lg:mt-12 lg:p-7"
    >
      <span className="font-serif text-3xl leading-tight">Costruiamo insieme il vostro racconto</span>
      <span className="inline-flex items-center gap-2 self-start font-sans text-xs font-semibold uppercase tracking-[0.2em] group-hover:underline">
        Richiedi un preventivo <ArrowRightIcon />
      </span>
    </Link>
    </>
  );
}
