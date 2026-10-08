import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

/** Player Vimeo con audio attivabile dall'utente; segnaposto se manca l'id. */
export default function VimeoPlayer({ vimeoId, title }) {
  if (!vimeoId) {
    return (
      <MediaPlaceholder
        play
        label="Film o trailer · player Vimeo, audio attivabile"
        className="aspect-video"
      />
    );
  }

  return (
    <div className="relative aspect-video bg-beige-scuro">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?dnt=1&title=0&byline=0&portrait=0`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
