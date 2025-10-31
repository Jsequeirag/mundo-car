import React, { useState } from "react";
import { Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

interface BusinessCTAProps {
  backgroundImage?: string;
}

const BusinessCTA: React.FC<BusinessCTAProps> = ({ backgroundImage }) => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const Navigate = useNavigate();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  return (
    <section
      className="relative py-20 text-center overflow-hidden "
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "url('/assets/mundo/Promotion.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🌌 Overlay para legibilidad */}
      <div className="absolute inset-0 bg-[#034651]/40 backdrop-blur-[2px]" />

      {/* ✨ Luces ambientales suaves */}
      <div className="absolute top-10 left-10 w-40 h-40  rounded-full blur-3xl animate-slowFloat"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56   rounded-full blur-3xl animate-slowFloat delay-300"></div>

      {/* 🔹 Contenido principal */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg text-shadow-md">
          Promociona tu negocio
        </h2>

        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl leading-relaxed text-shadow-md">
          Aprovecha nuestra plataforma para llevar tu marca al siguiente nivel.
          <br />
          Conecta con miles de compradores potenciales cada día.
        </p>

        <Button
          onClick={() => Navigate(getCountryPath("promocionarnegocio"))}
          className="bg-white text-brand-primary font-semibold py-3 px-8 rounded-full shadow-xl text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/90"
        >
          <Megaphone className="h-6 w-6 mr-2" />
          Promocionar mi negocio
        </Button>
      </div>

      {/* 🌊 Línea decorativa inferior */}
      <div className="absolute bottom-0 w-full h-[4px] bg-gradient-to-r from-white/40 via-brand-hover/70 to-white/40"></div>
    </section>
  );
};

export default BusinessCTA;
