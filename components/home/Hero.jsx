import HeroVideo from "@/components/home/HeroVideo";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";

// Ombra leggera e morbida per staccare i testi dai fotogrammi chiari dello showreel.
const TEXT_SHADOW = { textShadow: "0 1px 12px rgba(42, 30, 22, 0.35)" };

export default function Hero() {
  const { showreel, showreelVertical, showreelPoster } = site.media;
  const hasVideo = Boolean(showreel || showreelVertical);
  const textShadow = hasVideo ? TEXT_SHADOW : undefined;

  return (
    <section
      className="relative flex items-end overflow-hidden bg-beige-scuro lg:items-center"
      style={{ minHeight: "calc(100svh - var(--navbar-height))" }}
    >
      {hasVideo ? (
        <>
          <HeroVideo src={showreel} verticalSrc={showreelVertical} poster={showreelPoster} />
          <div className="absolute inset-0 bg-gradient-to-t from-marrone/75 via-marrone/40 to-marrone/25" aria-hidden="true" />
        </>
      ) : (
        <p className="absolute left-4 top-5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-marrone-medio lg:left-10 lg:top-6 lg:text-xs">
          Video showreel a tutto schermo · in loop, senza audio
        </p>
      )}

      <div
        className={`relative mx-auto w-full max-w-7xl px-4 pb-10 pt-24 lg:px-12 lg:py-24 lg:text-center ${
          hasVideo ? "text-crema" : "text-marrone"
        }`}
      >
        <Label className={hasVideo ? "mb-5 text-crema! lg:mb-8" : "mb-5 lg:mb-8"}>
          <span style={textShadow}>Wedding film &amp; photography</span>
        </Label>
        <h1 className="font-serif text-5xl leading-[1.05] text-balance lg:text-6xl xl:text-7xl" style={textShadow}>
          Il vostro matrimonio, autentico come l’avete vissuto, emozionale come un <em>film</em>
        </h1>
        <p className="mt-5 text-base lg:mt-6 lg:text-xl" style={textShadow}>
          Un ricordo indelebile, pensato su misura per voi.
        </p>
        <div className="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:justify-center lg:gap-5">
          <Button href="/portfolio" fullWidth>
            Guarda i nostri lavori
          </Button>
          <Button href="/preventivo" variant={hasVideo ? "light" : "outline"} fullWidth>
            Richiedi un preventivo
          </Button>
        </div>
      </div>
    </section>
  );
}
