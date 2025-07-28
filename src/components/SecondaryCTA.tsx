// components/SecondaryCTA.tsx
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button"; // Asegúrate de importar tu Button

interface SecondaryCTAProps {
  // Prop para el color de fondo de la sección (ej. "bg-brand-primary", "bg-white")
  sectionBgColor?: string;
  // Prop para el color del texto de la sección (ej. "text-white", "text-brand-primary")
  sectionTextColor?: string;
  // Prop para el color de fondo del botón (ej. "bg-white", "bg-brand-primary")
  buttonBgColor?: string;
  // Prop para el color del texto del botón (ej. "text-brand-primary", "text-white")
  buttonTextColor?: string;
}

const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  sectionBgColor = "bg-brand-primary", // Valor por defecto: fondo brand-primary
  sectionTextColor = "text-white", // Valor por defecto: texto blanco
  buttonBgColor = "bg-white", // Valor por defecto: botón blanco
  buttonTextColor = "text-brand-primary", // Valor por defecto: texto del botón brand-primary
}) => {
  // Clases para el hover del botón
  const buttonHoverClasses =
    buttonBgColor === "bg-white"
      ? "hover:bg-gray-100" // Si el botón es blanco, el hover es gris claro
      : "hover:bg-brand-primary/90"; // Si el botón es brand-primary, el hover es un tono más oscuro

  return (
    <section
      className={`py-16 ${sectionBgColor} ${sectionTextColor} text-center`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Quieres vender tu vehículo?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Publica tu anuncio de forma rápida y sencilla y llega a miles de
          compradores.
        </p>
        <Button
          className={`${buttonBgColor} ${buttonTextColor} ${buttonHoverClasses} font-semibold py-3 px-8 rounded-lg shadow-xl text-lg`}
        >
          <PlusCircle className="h-6 w-6 mr-2" /> Publica tu Anuncio
        </Button>
      </div>
    </section>
  );
};

export default SecondaryCTA;
