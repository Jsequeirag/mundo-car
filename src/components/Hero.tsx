// components/Hero.tsx
import React from "react";
import { TrendingUp, Award, Shield, Users } from "lucide-react";

// Define las props para el componente Hero
interface HeroProps {
  title?: string; // Hacemos el título opcional por si quieres un valor por defecto
  subtitle?: string; // Hacemos el subtítulo opcional
  // showSearch?: boolean; // <-- Esta prop no es necesaria en tu Hero actual, pero si la tenías definida, podrías quitarla.
}

const Hero: React.FC<HeroProps> = ({
  title = "Encuentra Tu Auto Perfecto", // Valor por defecto si no se pasa la prop
  subtitle = "Miles de vehículos de calidad a precios inmejorables", // Valor por defecto
}) => {
  return (
    <section className="bg-brand-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          {title} {/* Usamos la prop title aquí */}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          {subtitle} {/* Usamos la prop subtitle aquí */}
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
            <span className="font-semibold">Contacto Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="font-semibold">Vendedores de Confianza</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
