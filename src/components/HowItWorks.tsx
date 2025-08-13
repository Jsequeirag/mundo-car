// components/HowItWorks.tsx
import React from "react";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section
      className="relative py-16"
      style={{
        backgroundImage: "url('/assets/mundo/howItWorks.webp')", // Imagen clara generada en Sora
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay muy sutil para uniformidad */}
      <div className="absolute inset-0" />

      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 drop-shadow text-shadow-md">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/95 rounded-lg shadow-lg backdrop-blur-sm">
            <CheckCircle className="h-10 w-10 text-[#034651] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Amplia Selección
            </h3>
            <p className="text-gray-700">
              Encuentra el auto perfecto entre miles de opciones verificadas.
            </p>
          </div>
          <div className="p-6 bg-white/95 rounded-lg shadow-lg backdrop-blur-sm">
            <ShieldCheck className="h-10 w-10 text-[#034651] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Contacto Verificado
            </h3>
            <p className="text-gray-700">
              Te conectamos directamente con vendedores de confianza para una
              interacción segura y transparente.
            </p>
          </div>
          <div className="p-6 bg-white/95 rounded-lg shadow-lg backdrop-blur-sm">
            <Zap className="h-10 w-10 text-[#034651] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Fácil y Rápido
            </h3>
            <p className="text-gray-700">
              Navega, filtra y encuentra tu auto ideal en minutos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
