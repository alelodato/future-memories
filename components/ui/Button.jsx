import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 border px-7 py-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marrone disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  solid: "border-marrone bg-marrone text-crema hover:border-marrone-medio hover:bg-marrone-medio",
  outline: "border-marrone bg-transparent text-marrone hover:bg-marrone hover:text-crema",
};

/**
 * Pulsante rettangolare del brand.
 * - variant: "solid" (pieno) | "outline" (solo bordo)
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
