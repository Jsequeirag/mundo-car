// components/SecondaryCTA.tsx
import { useState, React } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import { Users, Building2, Crown, Zap, CheckCircle } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
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
  const navigate = useNavigate();
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
      <ModalContainer
        title="Seleccionar tu plan según tu necesidad"
        width="80rem"
        maxWidth="95%"
        className="max-w-7xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="w-full">
          {/* Grid de planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* PLAN 1: INDEPENDIENTE */}
            <div
              className="relative group cursor-pointer transform transition-all duration-500
                 hover:scale-[1.02] hover:-translate-y-2"
              onClick={(e) => {
                e.stopPropagation(), navigate(getCountryPath("publicar"));
              }}
            >
              {/* Wrapper para el plan con efecto neoglass */}
              <div
                className={`
          relative bg-white/20 backdrop-blur-xl border border-white/20
          rounded-3xl p-8 shadow-2xl
          group-hover:shadow-3xl group-hover:border-white/30
          overflow-hidden
          bg-gradient-to-br from-[#034651]/10 to-[#034651]/5
          after:absolute after:inset-0 after:bg-gradient-to-r 
          after:from-transparent after:via-white/10 after:to-transparent
          after:opacity-0 group-hover:after:opacity-100
          after:transition-opacity after:duration-500
          before:absolute before:inset-0 before:bg-gradient-to-b
          before:from-white/5 before:to-transparent
          before:opacity-0 group-hover:before:opacity-100
          before:transition-opacity before:duration-500
        `}
                style={{
                  backgroundImage:
                    "url('https://example.com/independent-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Efecto de brillo neoglass */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
                </div>

                {/* Contenido del plan */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icono del tipo de plan */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#034651]/20 rounded-2xl flex items-center justify-center border border-[#034651]/30">
                      <Users className="h-8 w-8 text-[#034651]" />
                    </div>
                  </div>

                  {/* Nombre del plan */}
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Independiente
                  </h3>

                  {/* Descripción */}
                  <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mt-1">
                      Perfecto para vendedores individuales
                    </p>
                  </div>

                  {/* Lista de características */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {[].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón de selección */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(), navigate(getCountryPath("publicar"));
                    }}
                    className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300
                       bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg 
                       hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98]
                       after:absolute after:inset-0 after:bg-white/20 after:scale-0
                       after:transform after:transition-transform after:duration-300
                       hover:after:scale-100 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4" />
                      Seleccionar Plan
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* PLAN 2: AUTOLOTE */}
            <div
              className="relative group cursor-pointer transform transition-all duration-500
                 hover:scale-[1.02] hover:-translate-y-2 scale-105"
              onClick={(e) => {
                e.stopPropagation(), navigate(getCountryPath("publicar"));
              }}
            >
              {/* Wrapper para el plan con efecto neoglass */}
              <div
                className={`
          relative bg-white/20 backdrop-blur-xl border border-white/20
          rounded-3xl p-8 shadow-2xl
          group-hover:shadow-3xl group-hover:border-white/30
          overflow-hidden
          ring-2 ring-[#034651]/30 bg-gradient-to-br from-[#034651]/10 to-[#034651]/5
          after:absolute after:inset-0 after:bg-gradient-to-r 
          after:from-transparent after:via-white/10 after:to-transparent
          after:opacity-0 group-hover:after:opacity-100
          after:transition-opacity after:duration-500
          before:absolute before:inset-0 before:bg-gradient-to-b
          before:from-white/5 before:to-transparent
          before:opacity-0 group-hover:before:opacity-100
          before:transition-opacity before:duration-500
        `}
                style={{
                  backgroundImage: "url('https://example.com/autolote-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Efecto de brillo neoglass */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
                </div>

                {/* Contenido del plan */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icono del tipo de plan */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#034651]/20 rounded-2xl flex items-center justify-center border border-[#034651]/30">
                      <Building2 className="h-8 w-8 text-[#034651]" />
                    </div>
                  </div>

                  {/* Nombre del plan */}
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Autolote
                  </h3>

                  {/* Descripción */}
                  <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mt-1">
                      Ideal para pequeños negocios de autos
                    </p>
                  </div>

                  {/* Lista de características */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {[].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón de selección */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(getCountryPath("publicar"));
                    }}
                    className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300
                       bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg 
                       hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98]
                       after:absolute after:inset-0 after:bg-white/20 after:scale-0
                       after:transform after:transition-transform after:duration-300
                       hover:after:scale-100 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4" />
                      ¡Elige este plan!
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* PLAN 3: CONCESIONARIO */}
            <div
              className="relative group cursor-pointer transform transition-all duration-500
                 hover:scale-[1.02] hover:-translate-y-2"
              onClick={() => navigate(getCountryPath("publicar"))}
            >
              {/* Wrapper para el plan con efecto neoglass */}
              <div
                className={`
          relative bg-white/20 backdrop-blur-xl border border-white/20
          rounded-3xl p-8 shadow-2xl
          group-hover:shadow-3xl group-hover:border-white/30
          overflow-hidden
          bg-gradient-to-br from-[#034651]/10 to-[#034651]/5
          after:absolute after:inset-0 after:bg-gradient-to-r 
          after:from-transparent after:via-white/10 after:to-transparent
          after:opacity-0 group-hover:after:opacity-100
          after:transition-opacity after:duration-500
          before:absolute before:inset-0 before:bg-gradient-to-b
          before:from-white/5 before:to-transparent
          before:opacity-0 group-hover:before:opacity-100
          before:transition-opacity before:duration-500
        `}
                style={{
                  backgroundImage:
                    "url('https://example.com/concesionario-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Efecto de brillo neoglass */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
                </div>

                {/* Contenido del plan */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icono del tipo de plan */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#034651]/20 rounded-2xl flex items-center justify-center border border-[#034651]/30">
                      <Crown className="h-8 w-8 text-[#034651]" />
                    </div>
                  </div>

                  {/* Nombre del plan */}
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Concesionario
                  </h3>

                  {/* Descripción */}
                  <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mt-1">
                      Para concesionarios profesionales
                    </p>
                  </div>

                  {/* Lista de características */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {[].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón de selección */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(), navigate(getCountryPath("publicar"));
                    }}
                    className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300
                       bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg 
                       hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98]
                       after:absolute after:inset-0 after:bg-white/20 after:scale-0
                       after:transform after:transition-transform after:duration-300
                       hover:after:scale-100 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4" />
                      Seleccionar Plan
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
      {/* Overlay suave solo si hay imagen */}
      {backgroundImage && <div className="absolute inset-0 bg-white/20" />}

      <div className="relative container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 text-shadow-md 
        text-white/90`}
        >
          ¿Quieres vender tu vehículo?
        </h2>
        <p className={`text-xl mb-8 opacity-90 text-shadow-md text-white/90`}>
          Publica tu anuncio de forma rápida, sencilla y llega a miles de
          compradores.
        </p>
        {/*<Link to={`${getCountryPath("inicio")}`}>
          <Button
            className={`${buttonBgColor} ${buttonTextColor} ${buttonHoverClasses} font-semibold py-3 px-8 rounded-lg shadow-xl text-lg transition-transform duration-200 ease-in-out hover:scale-105`}
          >
            <PlusCircle className="h-6 w-6 mr-2" /> Publica tu anuncio
          </Button>
        </Link> */}

        <Button
          onClick={() => setIsOpen(true)}
          className={`${buttonBgColor} ${buttonTextColor} ${buttonHoverClasses} font-semibold py-3 px-8 rounded-lg shadow-xl text-lg transition-transform duration-200 ease-in-out hover:scale-105`}
        >
          <PlusCircle className="h-6 w-6 mr-2" /> Publica tu anuncio
        </Button>
      </div>
    </section>
  );
};

export default SecondaryCTA;
//Seleccionar tu plan segun tu necesidad
