import React from "react";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlanCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  isFeatured?: boolean;
  planKey: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  description,
  icon,
  image,
  isFeatured = false,
  planKey,
}) => {
  const navigate = useNavigate();

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem("selectedPlan", planKey);
    console.log(`[PlanCard] Plan seleccionado: ${planKey}`);
    navigate(`/${localStorage.getItem("selectedCountry") || ""}/publicar`);
  };

  return (
    <div
      className={`relative group cursor-pointer transform transition-all duration-500 
        hover:scale-[1.02] hover:-translate-y-2 ${isFeatured ? "scale-105" : ""}
      `}
      onClick={handleSelect}
    >
      <div
        className={`relative flex flex-col justify-between rounded-3xl p-8 shadow-lg overflow-hidden border border-brand-primary/10 
          bg-brand-card transition-all duration-500 h-[460px]
          group-hover:shadow-xl group-hover:border-brand-primary/30
        `}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(3,70,81,0.35), rgba(3,70,81,0.1)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay suave para contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#034651]/60 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl"></div>

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center text-center text-white h-full justify-between">
          <div className="flex flex-col items-center">
            {/* Icono */}
            <div className="flex justify-center mb-6">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300
                ${isFeatured ? "shadow-md shadow-[#034651]/50" : ""}`}
              >
                {icon}
              </div>
            </div>

            {/* Título */}
            <h3
              className={`text-2xl font-extrabold mb-2 tracking-tight drop-shadow-md ${
                isFeatured ? "text-white" : "text-white"
              }`}
            >
              {title}
            </h3>

            {/* Descripción */}
            <p className="text-white/90 font-medium text-base mb-6 max-w-[80%] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Botón */}
          <button
            onClick={handleSelect}
            className={`relative w-full py-4 rounded-xl font-semibold text-base transition-all duration-300
              ${
                isFeatured
                  ? "bg-gradient-to-r from-[#034651] to-[#04606A]"
                  : "bg-gradient-to-r from-[#034651] to-[#04606A]"
              }
              text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] overflow-hidden`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              Seleccionar Plan
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
