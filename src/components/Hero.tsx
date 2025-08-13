// components/Hero.tsx
import React from "react";
import { TrendingUp, Award, Shield, Users } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
  showLogo?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title = "Encuentra Tu Auto Perfecto",
  subtitle = "Miles de vehículos de calidad a precios inmejorables",
  logoSrc = "/assets/mundocar-logo.png",
  showLogo = true,
}) => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fadeIn"
        poster="/assets/videos/MundoCar3.mp4"
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/videos/MundoCar3.webm" type="video/webm" />
        <source src="/assets/videos/MundoCar3.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 opacity-0 animate-fadeIn delay-200" />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6 opacity-0 animate-fadeIn delay-500  p-3 rounded-lg">
        {showLogo && (
          <img
            src={logoSrc}
            alt="MundoCar"
            width={280}
            height={72}
            decoding="async"
            loading="eager"
            className="mb-6 animate-fadeInSmall motion-safe:animate-float drop-shadow-logo glow"
          />
        )}

        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg text-shadow-md">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl text-shadow-md">
          {subtitle}
        </p>

        {/* Iconos destacados */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <span className="font-semibold text-shadow-md">
              Mejores Precios
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            <span className="font-semibold text-shadow-md">
              Calidad Asegurada
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-semibold text-shadow-md">
              Contacto Seguro
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="font-semibold text-shadow-md">
              Vendedores de Confianza
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
