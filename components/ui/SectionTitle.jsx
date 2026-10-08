import Label from "@/components/ui/Label";

const sizes = {
  xl: "text-5xl leading-[1.05] lg:text-7xl",
  lg: "text-4xl leading-tight lg:text-6xl",
  md: "text-3xl leading-tight lg:text-5xl",
};

/**
 * Titolo di sezione: etichetta opzionale + titolo in Cormorant Garamond.
 * Le parole chiave in corsivo si passano come <em> dentro children.
 */
export default function SectionTitle({
  label,
  children,
  as: Tag = "h2",
  size = "lg",
  align = "left",
  className = "",
}) {
  const alignment = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${alignment} ${className}`}>
      {label && <Label className="mb-4 lg:mb-6">{label}</Label>}
      <Tag className={`font-serif font-normal text-marrone text-balance ${sizes[size]}`}>
        {children}
      </Tag>
    </div>
  );
}
