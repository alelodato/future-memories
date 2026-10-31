import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 border px-7 py-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marrone disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  solid: "border-marrone bg-marrone text-crema hover:border-marrone-medio hover:bg-marrone-medio",
  outline: "border-marrone bg-transparent text-marrone hover:bg-marrone hover:text-crema",
  light: "border-crema bg-transparent text-crema hover:bg-crema hover:text-marrone",
  cream: "border-crema bg-crema text-marrone hover:border-white hover:bg-white",
  // Responsive: sotto lg come "solid" / "outline", da lg come "cream" / "light" (per i riquadri con foto scura)
  "solid-cream":
    "border-marrone bg-marrone text-crema hover:border-marrone-medio hover:bg-marrone-medio lg:border-crema lg:bg-crema lg:text-marrone lg:hover:border-white lg:hover:bg-white lg:focus-visible:outline-crema",
  "outline-light":
    "border-marrone bg-transparent text-marrone hover:bg-marrone hover:text-crema lg:border-crema lg:text-crema lg:hover:bg-crema lg:hover:text-marrone lg:focus-visible:outline-crema",
};

/**
 * Pulsante rettangolare del brand.
 * - variant: "solid" (pieno) | "outline" (solo bordo) | "light" | "cream" (su fondo scuro)
 *   | "solid-cream" | "outline-light" (come solid/outline sotto lg, come cream/light da lg)
 * - href: se presente rende un link (esterno se inizia con http)
 * - fullWidth: a tutta larghezza su mobile, larghezza naturale da lg in su
 */
export default function Button({
  children,
  href,
  variant = "solid",
  fullWidth = false,
  className = "",
  ...props
}) {
  const classes = [
    base,
    variants[variant],
    fullWidth ? "w-full lg:w-auto" : "",
    className,
  ].join(" ");

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
