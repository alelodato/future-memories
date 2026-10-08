import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { phases } from "@/data/phases";

export default function Phases() {
  return (
    <section id="come-lavoriamo" className="bg-crema py-20 lg:py-32">
      <Container>
        <SectionTitle label="Come lavoriamo">
          Sei fasi, dal primo incontro alla <em>consegna</em>
        </SectionTitle>

        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
          {phases.map((phase) => (
            <li key={phase.number} className="flex gap-5 border-t border-marrone pt-6 lg:gap-6">
              <span className="font-serif text-5xl leading-none text-marrone-medio lining-nums lg:text-6xl">
                {phase.number}
              </span>
              <div>
                <h3 className="font-serif text-2xl leading-tight lg:text-3xl">{phase.title}</h3>
                <p className="mt-3 leading-relaxed text-marrone-medio">{phase.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-3 lg:mt-20 lg:flex-row lg:justify-center lg:gap-5">
          <Button href="/portfolio" fullWidth>
            Guarda i nostri lavori
          </Button>
          <Button href="/preventivo" variant="outline" fullWidth>
            Richiedi un preventivo
          </Button>
        </div>
      </Container>
    </section>
  );
}
