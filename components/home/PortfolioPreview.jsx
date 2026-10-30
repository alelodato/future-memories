import Link from "next/link";
import WeddingCard from "@/components/portfolio/WeddingCard";
import Container from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import { getVideoWorks } from "@/lib/portfolio";

export default async function PortfolioPreview() {
  const weddings = (await getVideoWorks()).slice(0, 3);
  if (!weddings.length) return null;

  return (
    <section className="bg-sabbia py-20 lg:py-32">
      <Container>
        <div data-reveal className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <SectionTitle>Portfolio</SectionTitle>
            <p className="mt-3 text-marrone-medio lg:text-lg">Le storie di chi ci ha scelto.</p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 self-start font-sans text-xs font-semibold uppercase tracking-[0.2em] hover:underline lg:mt-4"
          >
            Vedi tutti i lavori <ArrowRightIcon />
          </Link>
        </div>

        <ul
          data-reveal="fade"
          className="relative left-1/2 -mb-4 mt-6 flex w-screen -translate-x-1/2 snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:static lg:mt-10 lg:grid lg:w-full lg:translate-x-0 lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0"
        >
          {weddings.map((wedding) => (
            <li key={wedding.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <WeddingCard wedding={wedding} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
