import Container from "@/components/ui/Container";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

/** Video istituzionale sotto la hero: segnaposto finché il video non è disponibile. */
export default function InstitutionalVideo() {
  return (
    <section aria-label="Video istituzionale" className="bg-sabbia py-16 lg:py-24">
      <Container>
        <MediaPlaceholder play label="Video istituzionale" className="mx-auto aspect-video max-w-5xl" />
      </Container>
    </section>
  );
}
