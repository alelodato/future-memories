/** Etichetta in maiuscolo spaziato (sopratitoli, voci dei dati, didascalie). */
export default function Label({ children, as: Tag = "p", className = "" }) {
  return (
    <Tag
      className={`font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-marrone-medio lg:text-xs ${className}`}
    >
      {children}
    </Tag>
  );
}
