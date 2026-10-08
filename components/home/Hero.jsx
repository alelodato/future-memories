import HeroVideo from "@/components/home/HeroVideo";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";

export default function Hero() {
  const { showreel, showreelVertical, showreelPoster } = site.media;
  const hasVideo = Boolean(showreel || showreelVertical);

  return (
    <section
      className="relative flex items-end overflow-hidden bg-beige-scuro lg:items-center"
      style={{ minHeight: "calc(100svh - var(--navbar-height))" }}
    >
      {hasVideo ? (
        <>
          <HeroVideo src={showreel} verticalSrc={showreelVertical} poster={showreelPoster} />
          <div className="absolute inset-0 bg-marrone/45" aria-hidden="true" />
        </>
      ) : (
        <p className="absolute left-4 top-5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-marrone-medio lg:left-10 lg:top-6 lg:text-xs">
          Video showreel a tutto schermo · in loop, senza audio
        </p>
      )}

      <div
        className={`relative mx-auto w-full max-w-6xl px-4 pb-10 pt-24 lg:px-12 lg:py-24 lg:text-center ${
          hasVideo ? "text-crema" : "text-marrone"
        }`}
      >
        <Label className={hasVideo ? "mb-5 text-crema lg:mb-8" : "mb-5 lg:mb-8"}>
          Wedding film &amp; photography
        </Label>
        <h1 className="font-serif text-5xl leading-[1.05] text-balance lg:text-8xl">
          Raccontiamo il vostro giorno in chiave <em>cinematografica</em>
        </h1>
        <p className="mt-5 text-base lg:mt-6 lg:text-xl">
          Un ricordo indelebile strutturato ad hoc per voi
        </p>
        <div className="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:justify-center lg:gap-5">
          <Button href="/portfolio" fullWidth>
            Guarda i nostri lavori
          </Button>
          <Button
            href="/preventivo"
            variant="outline"
            fullWidth
            className={hasVideo ? "border-crema text-crema hover:bg-crema hover:text-marrone" : ""}
          >
            Richiedi un preventivo
          </Button>
        </div>
      </div>
    </section>
  );
}
