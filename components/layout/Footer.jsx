import Link from "next/link";
import Logo from "@/components/layout/Logo";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-crema pb-24 text-marrone lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 pt-14 lg:px-12 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo size="lg" />
          </div>

          <div className="lg:col-span-3">
            <Label as="h2" className="mb-3 text-marrone">Contatti</Label>
            <ul className="space-y-1 text-sm leading-relaxed">
              <li>
                <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
              </li>
              <li>
                <a href={site.phoneHref} className="hover:underline">{site.phone}</a>
              </li>
              <li>{site.workArea}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Label as="h2" className="mb-3 text-marrone">Seguici</Label>
            <ul className="space-y-1 text-sm leading-relaxed">
              <li>Instagram</li>
              <li>
                <a href={site.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {site.instagram.handle}
                </a>
              </li>
              <li>
                <a href={site.instagramPersonal.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {site.instagramPersonal.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-beige-scuro py-6 text-xs text-marrone-medio lg:flex-row lg:justify-between">
          <p>
            © {site.name} · {site.vatNumber}
          </p>
          <p>
            <Link href="/privacy-policy" className="hover:underline">Privacy policy</Link>
            {" · "}
            <Link href="/cookie-policy" className="hover:underline">Cookie policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
