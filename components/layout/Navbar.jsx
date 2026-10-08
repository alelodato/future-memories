"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { navLinks } from "@/data/site";

function isActive(pathname, href) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Con Cache Components la pagina resta montata in background:
  // il menu va chiuso quando viene nascosta.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-beige-scuro bg-sabbia">
      <nav
        aria-label="Navigazione principale"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:h-24 lg:px-12"
      >
        <Logo onNavigate={close} />

        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] underline-offset-8 transition-colors hover:text-marrone-medio ${
                      active ? "underline" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button href="/preventivo">Richiedi un preventivo</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          className="-mr-2 p-2 lg:hidden"
        >
          {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </nav>

      {open && (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-beige-scuro bg-sabbia shadow-lg lg:hidden"
        >
          <ul className="flex flex-col px-4 py-4">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href} className="border-b border-beige">
                  <Link
                    href={link.href}
                    onNavigate={close}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`block py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] underline-offset-8 ${
                      active ? "underline" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-6">
            <Button href="/preventivo" onNavigate={close} fullWidth>
              Richiedi un preventivo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
