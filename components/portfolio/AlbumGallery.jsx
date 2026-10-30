"use client";

import { useState } from "react";
import Lightbox from "@/components/portfolio/Lightbox";

function isVertical(photo) {
  return photo.width && photo.height ? photo.height > photo.width : false;
}

// Raggruppa le foto in righe: orizzontale da sola, due verticali vicine in coppia, verticale isolata al centro.
function buildRows(photos) {
  const rows = [];
  let i = 0;
  while (i < photos.length) {
    if (!isVertical(photos[i])) {
      rows.push({ type: "full", items: [i] });
      i += 1;
    } else if (i + 1 < photos.length && isVertical(photos[i + 1])) {
      rows.push({ type: "pair", items: [i, i + 1] });
      i += 2;
    } else {
      rows.push({ type: "single", items: [i] });
      i += 1;
    }
  }
  return rows;
}

function PhotoButton({ photo, index, label, onOpen }) {
  const ratio = photo.width && photo.height ? `${photo.width} / ${photo.height}` : "3 / 2";
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Apri la foto ${index + 1} a schermo intero`}
      className="group block w-full cursor-zoom-in overflow-hidden bg-beige-scuro"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={`${label}, foto ${index + 1}`}
        width={photo.width || undefined}
        height={photo.height || undefined}
        loading="lazy"
        decoding="async"
        className="block h-full w-full transition duration-700 group-hover:scale-[1.02]"
        style={{ aspectRatio: ratio, objectFit: "cover" }}
      />
    </button>
  );
}

export default function AlbumGallery({ photos, label }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!photos.length) return null;

  const rows = buildRows(photos);

  return (
    <>
      <div className="space-y-6 lg:space-y-16">
        {rows.map((row) => {
          const key = row.items.join("-");

          if (row.type === "full") {
            return (
              <div
                key={key}
                className="relative left-1/2 w-screen -translate-x-1/2 lg:static lg:w-full lg:translate-x-0"
              >
                <PhotoButton photo={photos[row.items[0]]} index={row.items[0]} label={label} onOpen={setOpenIndex} />
              </div>
            );
          }

          if (row.type === "pair") {
            return (
              <div key={key} className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                {row.items.map((index) => (
                  <PhotoButton key={index} photo={photos[index]} index={index} label={label} onOpen={setOpenIndex} />
                ))}
              </div>
            );
          }

          return (
            <div key={key} className="lg:mx-auto lg:w-1/2">
              <PhotoButton photo={photos[row.items[0]]} index={row.items[0]} label={label} onOpen={setOpenIndex} />
            </div>
          );
        })}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          label={label}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}
    </>
  );
}
