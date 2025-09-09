import React, { useState } from "react";
import Header from "./Header";
import SearchFilters from "./SearchFilters";
import CarGrid from "./CarGrid";
import Footer from "./Footer";
import { mockUsedPremiumCars } from "@/data/mockUsedPremiumCars";
import { mockNewCars } from "@/data/mockNewCars";
import { Star } from "lucide-react";
import AdvertisementCarousel from "./AdvertisementCarousel";
import AdvertisementCarouselLateral from "./AdvertisementCarouselLateral";

import Hero from "./Hero";
import CategoryShowcase from "./CategoryShowcase";
import MobileSidebar from "./MobileSidebar";
// IMPORTA LAS NUEVAS SECCIONES AQUÍ:
import HowItWorks from "./HowItWorks"; // O BenefitsSection

import SecondaryCTA from "./SecondaryCTA"; // O SellCarCTA
import { useParams, Outlet } from "react-router-dom";
const AppLayout: React.FC = () => {
  const [usedCars, setUsedCars] = useState(mockUsedPremiumCars);
  const [newCars, setNewCars] = useState(mockNewCars);
  const [loading, setLoading] = useState(false);

  const handleSearch = (filters: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsedCars(mockUsedPremiumCars);
      setNewCars(mockNewCars);
      setLoading(false);
    }, 1000);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { countryCode } = useParams<{ countryCode?: string }>();
  const autoLots = [
    {
      id: "1",
      name: "AutoLote El Sol",
      image: "/assets/autolotes/autolote-premium.png",
    },
    {
      id: "2",
      name: "AutoLote La Estrella",
      image: "/assets/autolotes/autolote-laestrella.png",
    },
    {
      id: "3",
      name: "AutoLote Premium",
      image: "/assets/autolotes/autolote-premium.png",
    },
    // Agrega más autolotes
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        // Puedes pasar los navItems al MobileSidebar si no los define internamente
        // navItems={/* el mismo array navItems que tienes en Header, o adaptado */}
      />
      {/* ESTE ES EL DIV QUE VA A EMPUJAR TODO EL CONTENIDO HACIA ABAJO */}
      {/* El padding-top debe ser igual a la altura máxima del Header */}
      <div className="pt-[80px]">
        {/* Hero Section - QUITAMOS el padding-top de aquí */}
        <Hero />
        <CategoryShowcase />
        {/* Altura máxima del Header es 80px (h-20) */}
        {/* NUEVA SECCIÓN: CATEGORY SHOWCASE */}
        {/* <HowItWorks /> */}
        {/*  <SecondaryCTA />*/}
        {/* 6. "HOW IT WORKS" / BENEFICIOS (NUEVA SECCIÓN) */}
        {/* Main Content */}
        <main className=" mx-auto px-6 py-10">
          <div className="mb-8">
            {/*
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/bridgestone.png",

                  ctaText: "",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
                {
                  src: "/assets/texaco.png",

                  ctaText: "",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
              ]}
            /> */}
          </div>
          {/*
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {  Columna Izquierda: Filtros y Anuncio Lateral 1 }
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <SearchFilters onSearch={handleSearch} />
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/meguiarSpray.jpg",

                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/meguiar.jpg",

                    ctaHref: "https://meguiarsdirect.com/",
                  },
                ]}
              />{" "}
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/castrolOil.png",

                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/castrol.png",

                    ctaHref: "https://www.toyota.com/",
                  },
                ]}
              />
            </div>
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-8">
                <h2 className="text-4xl font-extrabold text-brand-primary bg-white/90 px-4 py-4 rounded-md shadow-md mb-2 flex items-center">
                  <div className="flex space-x-1 mr-2">
                    <Star
                      className="h-8 w-8 text-yellow-500"
                      style={{ fill: "currentColor" }}
                    />
                    <Star
                      className="h-8 w-8 text-yellow-500"
                      style={{ fill: "currentColor" }}
                    />
                    <Star
                      className="h-8 w-8 text-yellow-500"
                      style={{ fill: "currentColor" }}
                    />
                    <Star
                      className="h-8 w-8 text-yellow-500"
                      style={{ fill: "currentColor" }}
                    />
                    <Star
                      className="h-8 w-8 text-yellow-500"
                      style={{ fill: "currentColor" }}
                    />
                  </div>
                  Autos Usados Super Destacados
                </h2>
                <p className="text-lg text-gray-700 mt-4 font-semibold">
                  {usedCars.length} Autos Disponibles
                </p>
              </div>
              <CarGrid cars={usedCars} loading={loading} />
            </div>
            {  Columna Derecha: Anuncio Lateral 2  }
          </div>
          {  Anuncio Banner Inferior  }
          {
            <div className="mt-8">
              <AdvertisementCarousel
                slides={[
                  {
                    src: "/assets/tesla.svg",

                    ctaHref: "https://www.bridgestone.co.cr/",
                    badge: "",
                  },
                  {
                    src: "/assets/toyotaxl.png",

                    ctaHref: "https://www.toyota.com/",
                    badge: "",
                  },
                ]}
              />
            </div>
          }*/}
        </main>
      </div>
      {/*<BlogPreview />*/}
      {/* CIERRE DEL DIV CON EL PADDING-TOP */}{" "}
      {/* Aquí es donde renderizarías el menú lateral para móvil */}
      <Footer />
    </div>
  );
};

export default AppLayout;
