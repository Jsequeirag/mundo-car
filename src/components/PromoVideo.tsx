// src/components/PromoVideo.tsx
import React from "react";

interface PromoVideoProps {
  mp4Src: string; // "/videos/mundocar-landing-720p.mp4"
  webmSrc?: string; // "/videos/mundocar-landing-720p.webm" (opcional)
  poster?: string; // "/videos/mundocar-poster.jpg"
  captionsVtt?: string; // "/videos/mundocar-es.vtt" (opcional)
  className?: string;
}

const PromoVideo: React.FC<PromoVideoProps> = ({
  mp4Src,
  webmSrc,
  poster,
  captionsVtt,
  className = "",
}) => {
  return (
    <div
      className={`w-full max-w-4xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-200 ${className}`}
    >
      <video
        className="w-full h-auto"
        poster={poster}
        preload="metadata"
        controls
        playsInline
        // Si quieres auto‑reproducir en desktop, usa muted+autoPlay+loop (ojo con UX móvil):
        // muted
        // autoPlay
        // loop
        width={1280}
        height={720}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
        {captionsVtt && (
          <track
            src={captionsVtt}
            kind="captions"
            srcLang="es"
            label="Español"
            default
          />
        )}
        Tu navegador no soporta video HTML5.
      </video>
    </div>
  );
};

export default PromoVideo;
