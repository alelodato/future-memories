import Link from "next/link";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import Container from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import { portfolio } from "@/data/portfolio";

export default function PortfolioPreview() {
  return (
    <section className="bg-sabbia py-20 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionTitle>Portfolio</SectionTitle>
            <p className="mt-3 text-marrone-medio lg:text-lg">
              Il vostro matrimonio raccontato in un unico flusso cinematografico
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 self-start font-sans text-xs font-semibold uppercase tracking-[0.2em] hover:underline lg:mt-4"
          >
            Vedi tutti i lavori <ArrowRightIcon />
          </Link>
        </div>

        <div className="mt-10 lg:mt-14">
          <PortfolioGrid works={portfolio.slice(0, 3)} />
        </div>
      </Container>
    </section>
  );
}
