import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
type AutoLot = {
  id: string;
  name: string;
  image: string;
  subtitle?: string;
  ctaText?: string;
  link?: string;
  badge?: string;
};

interface AutoLotHeroProps {
  autoLot: AutoLot;
}

const AutoLotHero: React.FC<AutoLotHeroProps> = ({ autoLot }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-7xl mx-auto aspect-[3/2] bg-gray-100">
      <div className="absolute inset-0">
        <img
          src={autoLot.image}
          alt={autoLot.name}
          className="w-full h-full object-cover rounded-xl"
          loading="eager"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent rounded-xl" />
      </div>
      <div className="relative z-10 flex items-end h-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-lg text-white drop-shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            {autoLot.name}
          </h1>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              className="inline-flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Volver a la página anterior"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Regresar
            </Button>

            <a href="#autolot-cars">
              <Button
                className="inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-gray-100 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                aria-label={`Ir al detalle de ${autoLot.name}`}
              >
                Ver Lista de Autos
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLotHero;
