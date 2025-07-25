// components/HowItWorks.tsx (o BenefitsSection.tsx)
import React from "react";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react"; // Ejemplos de íconos

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <CheckCircle className="h-10 w-10 text-brand-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Amplia Selección
            </h3>
            <p className="text-gray-600">
              Encuentra el auto perfecto entre miles de opciones verificadas.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <ShieldCheck className="h-10 w-10 text-brand-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Contacto Verificado
            </h3>{" "}
            {/* CAMBIO AQUÍ: Título más preciso */}
            <p className="text-gray-600">
              Te conectamos directamente con vendedores de confianza para una
              interacción segura y transparente.
            </p>{" "}
            {/* CAMBIO AQUÍ: Descripción ajustada */}
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <Zap className="h-10 w-10 text-brand-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Fácil y Rápido
            </h3>
            <p className="text-gray-600">
              Navega, filtra y encuentra tu auto ideal en minutos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
