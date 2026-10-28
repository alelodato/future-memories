import Link from "next/link";
import CoupleName from "@/components/portfolio/CoupleName";
import TeaserVideo from "@/components/portfolio/TeaserVideo";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function WeddingStory({ wedding, index, headingLevel: Heading = "h2" }) {
    const number = String(index + 1).padStart(2, "0");
    const reversed = index % 2 === 1;

    return (
        <article className="snap-start lg:py-14">
            <Link
                href={`/portfolio/${wedding.slug}`}
                className="group relative block lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12"
            >
                {/* Video: a schermo intero su mobile, riquadro verticale da lg */}
                <div
                    className={`relative h-[calc(100svh-var(--navbar-height))] overflow-hidden bg-beige-scuro lg:aspect-[9/16] lg:h-[min(78vh,760px)] lg:justify-self-center ${reversed ? "lg:order-2" : ""
                        }`}
                >
                    <TeaserVideo
                        src={wedding.teaser}
                        poster={wedding.cover}
                        posterPosition={wedding.coverPosition}
                        alt={`Anteprima del matrimonio di ${wedding.couple}`}
                        className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Testo sopra il video, solo mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-marrone/85 via-marrone/10 to-transparent lg:hidden" />
                    <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-crema lg:hidden">
                        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-crema/80">{number}</p>
                        <Heading className="mt-3 font-serif text-5xl leading-[1.05]">
                            <CoupleName couple={wedding.couple} />
                        </Heading>
                        <p className="mt-3 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-crema/80">
                            {wedding.location} · {wedding.date}
                        </p>
                        <p className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                            Guarda il racconto <ArrowRightIcon />
                        </p>
                    </div>
                </div>

                {/* Testo accanto al video, solo da lg */}
                <div className={`hidden lg:block ${reversed ? "lg:order-1 lg:text-right" : ""}`}>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-marrone-medio">{number}</p>
                    <Heading className="mt-6 font-serif text-6xl leading-[1.05] xl:text-7xl">
                        <CoupleName couple={wedding.couple} />
                    </Heading>
                    <p className="mt-5 font-sans text-xs uppercase tracking-[0.25em] text-marrone-medio">
                        {wedding.location} · {wedding.date}
                    </p>
                    <p className="mt-10 inline-flex items-center gap-2 border-b border-marrone pb-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all group-hover:gap-3">
                        Guarda il racconto <ArrowRightIcon />
                    </p>
                </div>
            </Link>
        </article>
    );
}