import { PlayIcon } from "@/components/ui/Icons";

const tones = {
  dark: "bg-beige-scuro",
  light: "bg-beige",
};

/**
 * Riquadro beige al posto di foto e video non ancora disponibili.
 * Le proporzioni si passano con className (es. "aspect-video").
 */
export default function MediaPlaceholder({
  label,
  play = false,
  tone = "dark",
  className = "",
  children,
}) {
  return (
    <div
      role="img"
      aria-label={label || "Contenuto multimediale in arrivo"}
      className={`relative flex items-center justify-center overflow-hidden text-marrone ${tones[tone]} ${className}`}
    >
      {play && <PlayIcon className="h-14 w-14 lg:h-20 lg:w-20" />}
      {label && (
        <span className="absolute bottom-4 left-4 right-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-marrone-medio lg:bottom-6 lg:left-6 lg:text-xs">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
