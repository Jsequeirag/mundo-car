// components/SecondaryCTA.tsx
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
interface SecondaryCTAProps {
  sectionBgColor?: string; // Solo se usa si no hay imagen
  sectionTextColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  backgroundImage?: string; // Nueva prop para imagen de fondo
}

const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  sectionBgColor = "bg-brand-primary",
  sectionTextColor = "text-white",
  buttonBgColor = "bg-white",
  buttonTextColor = "text-brand-primary",
  backgroundImage, // Nueva prop
}) => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };
  const buttonHoverClasses =
    buttonBgColor === "bg-white"
      ? "hover:bg-gray-100"
      : "hover:bg-brand-primary/90";

  return (
    <section
      className={`relative py-16 text-center ${
        backgroundImage ? "" : `${sectionBgColor} ${sectionTextColor}`
      }`}
      style={{
        backgroundImage: "url('/assets/mundo/howItWorks.webp')", // Imagen clara generada en Sora
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay suave solo si hay imagen */}
      {backgroundImage && <div className="absolute inset-0 bg-white/20" />}

      <div className="relative container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 text-shadow-md ${
            backgroundImage ? "text-gray-900" : sectionTextColor
          }`}
        >
          ¿Quieres vender tu vehículo?
        </h2>
        <p
          className={`text-xl mb-8 opacity-90 text-shadow-md ${
            backgroundImage ? "text-gray-800" : sectionTextColor
          }`}
        >
          Publica tu anuncio de forma rápida, sencilla y llega a miles de
          compradores.
        </p>
        <Link to={`${getCountryPath("publicar")}`}>
          <Button
            className={`${buttonBgColor} ${buttonTextColor} ${buttonHoverClasses} font-semibold py-3 px-8 rounded-lg shadow-xl text-lg`}
          >
            <PlusCircle className="h-6 w-6 mr-2" /> Publica tu anuncio
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SecondaryCTA;
