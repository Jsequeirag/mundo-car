// src/components/PromoVideoBg.tsx
import React from "react";

interface PromoVideoBgProps {
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  overlayOpacity?: number; // 0 a 1
  height?: string; // Ej: "80vh"
  title?: string; // Opcional (default: "Bienvenido a")
  subtitle?: string; // Opcional (si no se pasa, no se muestra)
  logoSrc?: string; // Opcional (default: "/assets/mundocar-logo.png")
  logoAlt?: string; // Opcional (default: "MundoCar")
}

const PromoVideoBg: React.FC<PromoVideoBgProps> = ({
  mp4Src,
  webmSrc,
  poster,
  overlayOpacity = 0.5,
  height = "80vh",
  title = "Bienvenido a",
  subtitle, // <- opcional
  logoSrc = "/assets/mundocar-logo.png",
  logoAlt = "MundoCar",
}) => {
  return (
    <div className="overflow-hidden" style={{ height }}>
      {/* Video de fondo */}
      <div>
        <video
          className="absolute w-full h-full object-cover rounded-lg"
          poster={poster}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    </div>
  );
};

export default PromoVideoBg;
