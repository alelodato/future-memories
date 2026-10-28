"use client";

import { useEffect, useRef } from "react";

export default function TeaserVideo({ src, poster, posterPosition = "50% 50%", alt, className = "" }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => { });
                else video.pause();
            },
            { threshold: 0.35 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [src]);

    const mediaStyle = { objectFit: "cover", objectPosition: posterPosition };

    if (!src) {
        if (!poster) return <div className={`bg-beige-scuro ${className}`} />;
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={alt} loading="lazy" decoding="async" className={className} style={mediaStyle} />
        );
    }

    return (
        <video
            ref={videoRef}
            src={src}
            poster={poster || undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-label={alt}
            className={className}
            style={mediaStyle}
        />
    );
}