import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowLeft,
  MessageCircle,
  Facebook,
  LucideMail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const shareUrl = window.location.href;
  const shareText = `¡Mira este increíble autolote: ${autoLot.name}!`;

  const handleShareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const handleShareEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(
        "Mira este autolote!"
      )}&body=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

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
          <div className="mt-4 sm:mt-6 flex flex-col  gap-2  ">
            <div className="mt-4 sm:mt-6 flex flex-row  gap-3 ">
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
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">Compartir </h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Compartir por WhatsApp"
                >
                  <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" /> WhatsApp
                </Button>
                <Button
                  onClick={handleShareFacebook}
                  className="inline-flex items-center gap-2 bg-blue-800 text-white hover:bg-blue-900 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Compartir por Facebook"
                >
                  <Facebook className="w-4 sm:w-5 h-4 sm:h-5" /> Facebook
                </Button>
                <Button
                  onClick={handleShareEmail}
                  className="inline-flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Compartir por Email"
                >
                  <LucideMail className="w-4 sm:w-5 h-4 sm:h-5" /> Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLotHero;
