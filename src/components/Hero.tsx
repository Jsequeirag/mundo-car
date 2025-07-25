import React from "react";
import { TrendingUp, Award, Shield, Users } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="bg-brand-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Encuentra Tu Auto Perfecto
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Miles de vehículos de calidad a precios inmejorables
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <span className="font-semibold">Mejores Precios</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            <span className="font-semibold">Calidad Asegurada</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-semibold">Contacto Seguro</span>{" "}
            {/* Modificado de "Secure Buying" */}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="font-semibold">Vendedores de Confianza</span>{" "}
            {/* Modificado de "Trusted Dealers" */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
