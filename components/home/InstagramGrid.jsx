import Label from "@/components/ui/Label";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { site } from "@/data/site";

// Segnaposto: da collegare in seguito al feed Instagram del profilo.
const posts = Array.from({ length: 6 }, (_, index) => ({ id: index, src: null }));

export default function InstagramGrid() {
  return (
    <section className="bg-sabbia py-20 lg:py-28">
      <a
        href={site.instagram.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto block max-w-7xl px-4 text-center hover:underline lg:px-12"
      >
        <Label>Seguici su Instagram · {site.instagram.handle}</Label>
      </a>

      <ul className="mt-10 grid grid-cols-3 gap-1.5 px-1.5 lg:mt-14 lg:grid-cols-6 lg:gap-2.5 lg:px-2.5">
        {posts.map((post, index) => (
          <li key={post.id}>
            <MediaPlaceholder tone={index % 2 === 0 ? "dark" : "light"} className="aspect-square" />
          </li>
        ))}
      </ul>

      <p className="mt-8 px-4 text-center text-sm text-marrone-medio lg:text-base">
        Gli ultimi 6 post del profilo, aggiornati in automatico
      </p>
    </section>
  );
}
