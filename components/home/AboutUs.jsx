import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { site } from "@/data/site";

const team = [{ name: "[Nome]", role: "Video", photo: null }];

export default function AboutUs() {
  return (
    <section id="chi-siamo" className="bg-crema py-20 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {site.media.aboutPhoto ? (
          <div className="relative aspect-square overflow-hidden bg-beige-scuro">
            <Image
              src={site.media.aboutPhoto}
              alt="Il team Future Memories nel backstage"
              fill
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <MediaPlaceholder label="Foto del team nel backstage" className="aspect-square" />
        )}

        <div>
          <Label className="mb-6">Chi siamo</Label>
          <blockquote className="font-serif text-3xl leading-tight text-balance lg:text-5xl">
            “Raccontiamo il vostro matrimonio attraverso immagini che <em>restano</em>.”
          </blockquote>

          <Label as="h3" className="mb-3 mt-10 lg:mt-14">
            La nostra storia
          </Label>
          <p className="leading-relaxed lg:text-lg">
            Gloria Margarino, anni di esperienza, specializzata in fotografia e videografia.
          </p>

          <Label as="h3" className="mb-5 mt-10 lg:mt-12">
            Il team
          </Label>
          <ul className="space-y-5">
            {team.map((member, index) => (
              <li key={index} className="flex items-center gap-5">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={88}
                    height={88}
                    className="h-20 w-20 rounded-full object-cover lg:h-22 lg:w-22"
                  />
                ) : (
                  <span className="h-20 w-20 shrink-0 rounded-full bg-beige-scuro lg:h-22 lg:w-22" aria-hidden="true" />
                )}
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-marrone-medio">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 lg:mt-14">
            <Button href="/portfolio" variant="outline" fullWidth>
              Guarda i nostri lavori
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
