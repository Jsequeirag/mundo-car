import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import PlansGrid from "@/components/PlanCard/PlansGrid";

interface SecondaryCTAProps {
  backgroundImage?: string;
}

const SecondaryCTA: React.FC<SecondaryCTAProps> = ({ backgroundImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { countryCode } = useParams<{ countryCode?: string }>();

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  return (
    <section
      className="relative py-20 text-center overflow-hidden bg-gradient-to-br from-brand-primary via-brand-hover to-[#012f36]"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "url('/assets/mundo/howItWorks.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🪟 Modal con planes */}
      <ModalContainer
        title="Selecciona tu plan según tu necesidad"
        width="80rem"
        maxWidth="95%"
        className="max-w-7xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PlansGrid />
      </ModalContainer>

      {/* 🌫️ Overlay de legibilidad */}
      <div className="absolute inset-0 bg-[#034651]/70 backdrop-blur-[2px]" />

      {/* ✨ Efectos de luz ambiental */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-brand-hover/25 rounded-full blur-3xl animate-slowFloat" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-brand-primary/30 rounded-full blur-3xl animate-slowFloat delay-300" />

      {/* 📢 Contenido principal */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg text-shadow-md">
          ¿Quieres vender tu vehículo?
        </h2>

        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl leading-relaxed text-shadow-md">
          Publica tu anuncio de forma rápida y sencilla <br /> y llega a miles
          de compradores en toda la región.
        </p>

        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white text-brand-primary font-semibold py-3 px-8 rounded-full shadow-xl text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/90"
        >
          <PlusCircle className="h-6 w-6 mr-2" />
          Publica tu anuncio
        </Button>
      </div>

      {/* 🌊 Línea decorativa inferior */}
      <div className="absolute bottom-0 w-full h-[4px] bg-gradient-to-r from-white/40 via-brand-hover/70 to-white/40"></div>
    </section>
  );
};

export default SecondaryCTA;
