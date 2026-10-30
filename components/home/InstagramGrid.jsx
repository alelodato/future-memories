import InstagramCarousel from "@/components/home/InstagramCarousel";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";
import { getInstagramFeed } from "@/lib/instagram";

export default async function InstagramFeed() {
  const { profile, posts } = await getInstagramFeed(12);

  return (
    <section aria-label="Instagram" className="bg-crema py-20 lg:py-28">
      <Container>
        <div data-reveal className="text-center">
          <Label as="h2">Seguici su Instagram</Label>
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-serif text-3xl hover:underline lg:text-4xl"
          >
            {site.instagram.handle}
          </a>
        </div>

        {posts.length ? (
          <div data-reveal="fade" className="mt-10 lg:mt-14">
            <InstagramCarousel posts={posts} profile={profile} />
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-3 gap-1 lg:mt-14 lg:grid-cols-6 lg:gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} aria-hidden="true">
                <div className="aspect-square bg-beige-scuro" />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 text-center lg:mt-14">
          <Button href={site.instagram.href} variant="outline" fullWidth>
            Seguici su Instagram
          </Button>
        </div>
      </Container>
    </section>
  );
}