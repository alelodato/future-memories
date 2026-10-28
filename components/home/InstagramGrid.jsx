import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";
import { getInstagramPosts } from "@/lib/instagram";

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function CarouselIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="7" y="7" width="13" height="13" />
      <path d="M4 16V4h12" />
    </svg>
  );
}

export default async function InstagramFeed() {
  const posts = await getInstagramPosts(6);

  return (
    <section aria-label="Instagram" className="bg-crema py-20 lg:py-28">
      <Container>
        <div className="text-center">
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

        <ul className="mt-10 grid grid-cols-3 gap-1 lg:mt-14 lg:grid-cols-6 lg:gap-3">
          {posts.length
            ? posts.map((post) => (
              <li key={post.id}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={post.caption ? `Apri su Instagram: ${post.caption}` : "Apri il post su Instagram"}
                  className="group relative block aspect-square overflow-hidden bg-beige-scuro"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="absolute inset-0 bg-marrone/0 transition-colors duration-300 group-hover:bg-marrone/20" />
                  {(post.isVideo || post.isCarousel) && (
                    <span className="absolute right-2 top-2 text-crema drop-shadow">
                      {post.isVideo ? <VideoIcon /> : <CarouselIcon />}
                    </span>
                  )}
                </a>
              </li>
            ))
            : Array.from({ length: 6 }, (_, i) => (
              <li key={i} aria-hidden="true">
                <div className="aspect-square bg-beige-scuro" />
              </li>
            ))}
        </ul>

        <div className="mt-10 text-center lg:mt-14">
          <Button href={site.instagram.href} variant="outline" fullWidth>
            Seguici su Instagram
          </Button>
        </div>
      </Container>
    </section>
  );
}