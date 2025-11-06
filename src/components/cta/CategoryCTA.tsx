import React, { useState } from "react";
import { Car, MapPin, Package, PlusCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ModalContainer from "../Modals/ModalContainer";
import PlansGrid from "@/components/PlanCard/PlansGrid";

const CategoryCTA: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const categoryItems = [
    {
      id: "newCars",
      label: "Autos Nuevos",
      icon: Car,
      href: `/${countryCode}/autos-nuevos`,
      image: "/assets/categories/newCars.jpg",
      description: "Explora los últimos modelos y estrenos del mercado.",
    },
    {
      id: "usedCars",
      label: "Autos Usados",
      icon: Car,
      href: `/${countryCode}/autos-usados`,
      image: "/assets/categories/usedCars.jpg",
      description: "Encuentra tu próximo vehículo de ocasión con confianza.",
    },
    {
      id: "postYourCar",
      label: "Publica tu Automóvil",
      icon: PlusCircle,
      href: `/${countryCode}/inicio`,
      image: "/assets/mundo/publishImage2.png",
      description: "Publica tu anuncio de forma rápida y sencilla.",
      openModal: true,
    },
    {
      id: "rentCars",
      label: "Renta de Autos",
      icon: MapPin,
      href: `/${countryCode}/renta`,
      image: "/assets/categories/rentCars.jpeg",
      description: "Servicios de alquiler flexibles para tus viajes.",
    },
    {
      id: "autoParts",
      label: "Autorepuestos",
      icon: Package,
      href: `/${countryCode}/repuestos`,
      image: "/assets/categories/parts.jpg",
      description: "Repuestos originales y de calidad para tu vehículo.",
    },
  ];

  return (
    <>
      {/* 🪟 Modal para planes */}
      <ModalContainer
        title="Selecciona tu plan según tu necesidad"
        width="80rem"
        maxWidth="95%"
        className="max-w-7xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PlansGrid />
      </ModalContainer>

      {/* 🏷️ Sección de categorías */}
      <section
        className="relative py-16 md:py-20 bg-brand-primary overflow-hidden"
        style={{
          backgroundImage: "url('/assets/mundo/howItWorks.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Fondo con overlay de marca */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#034651]/90 via-[#045166]/80 to-[#022f36]/90 backdrop-blur-[2px]" />

        {/* Efectos de luz ambiental */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-brand-hover/25 rounded-full blur-3xl animate-slowFloat" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-brand-primary/30 rounded-full blur-3xl animate-slowFloat delay-300" />

        <div className="relative z-10 px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12 tracking-tight drop-shadow-lg text-shadow-md">
            Explora nuestras categorías
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {categoryItems.map((item, index) => {
              const Icon = item.icon;
              const handleClick = () =>
                item.openModal ? setIsOpen(true) : navigate(item.href);

              return (
                <div
                  key={index}
                  onClick={handleClick}
                  className={`relative group rounded-2xl overflow-hidden shadow-lg ${
                    item.id === "postYourCar" ? "w-[245px]" : "w-[240px]"
                  } h-[240px] cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1`}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-300"></div>

                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                    <div
                      className={`flex items-center text-white mb-2 ${
                        item.openModal
                          ? "bg-brand-primary rounded-full px-2 py-1 shadow-md"
                          : ""
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold text-base ">{item.label}</h3>
                    </div>
                    <p className="text-sm text-white/90 opacity-90 group-hover:opacity-100 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-white/40 via-brand-hover/70 to-white/40" />
      </section>
    </>
  );
};

export default CategoryCTA;
