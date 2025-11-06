import React, { useState, useEffect } from "react";
import { TrendingUp, Award, Shield, Users } from "lucide-react";

interface Media {
  type: "image" | "video";
  src: string | { webm: string; mp4: string; poster: string };
}

interface HeroSlideProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
  showLogo?: boolean;
  mediaItems?: Media[];
  showIcons?: boolean;
}

const HeroSlide: React.FC<HeroSlideProps> = ({
  title = "Encuentra El Auto Perfecto",
  subtitle = "",
  logoSrc = "/assets/mundocar-logo.png",
  showLogo = true,
  mediaItems = [
    {
      type: "video",
      src: {
        webm: "/assets/videos/MundoCar3.webm",
        mp4: "/assets/videos/MundoCar3.mp4",
        poster: "/assets/videos/MundoCar3.mp4",
      },
    },
  ],
  showIcons = true,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = mediaItems.length;

  // Ciclo de slides
  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="relative h-[550px] overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Media: Video o Imagen */}
      {mediaItems.map((media, index) => (
        <React.Fragment key={index}>
          {media.type === "video" && (
            <video
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlideIndex ? "opacity-70" : "opacity-0"
              }`}
              poster={typeof media.src === "object" ? media.src.poster : ""}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src={typeof media.src === "object" ? media.src.webm : ""}
                type="video/webm"
              />
              <source
                src={typeof media.src === "object" ? media.src.mp4 : ""}
                type="video/mp4"
              />
            </video>
          )}
          {media.type === "image" && (
            <img
              src={typeof media.src === "string" ? media.src : ""}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlideIndex ? "opacity-100" : "opacity-0"
              }`}
              loading="eager"
              decoding="async"
            />
          )}
        </React.Fragment>
      ))}

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 transition-opacity duration-1000 ease-in-out" />

      {/* Contenido centrado (solo en el primer slide) */}
      {currentSlideIndex === 0 && (
        <div className="relative z-10 flex flex-col items-center text-center text-white px-6 py-12 max-w-4xl mx-auto">
          {showLogo && (
            <img
              src={logoSrc}
              alt="MundoCar"
              width={280}
              height={72}
              decoding="async"
              loading="eager"
              className="mb-6 animate-slideInUp drop-shadow-xl"
            />
          )}

          <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight drop-shadow-xl animate-slideInUp text-shadow-md">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl drop-shadow-md animate-slideInUp delay-200 text-shadow-md">
              {subtitle}
            </p>
          )}

          {/* Iconos destacados (opcional) */}
          {showIcons && (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 animate-slideInUp delay-400">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-transform hover:scale-105 cursor-default">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium text-shadow-sm">
                  Mejores Precios
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-transform hover:scale-105 cursor-default">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-medium text-shadow-sm">
                  Calidad Asegurada
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-transform hover:scale-105 cursor-default">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium text-shadow-sm">
                  Contacto Seguro
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transition-transform hover:scale-105 cursor-default">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium text-shadow-sm">
                  Vendedores de Confianza
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Indicadores de carrusel */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex
                  ? "bg-white scale-125"
                  : "bg-white/50"
              }`}
              onClick={() => setCurrentSlideIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Estilos personalizados */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default HeroSlide;
