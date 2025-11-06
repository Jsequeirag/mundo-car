import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import AutoPartsGrid from "@/components/AutoPartsGrid";
import Footer from "@/components/Footer";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import Hero from "@/components/Hero";
import MobileSidebar from "@/components/MobileSidebar";
import BusinessCTA from "@/components/cta/BusinessCTA";
import SecondaryCTA from "@/components/cta/SecondaryCTA";
import { mockAutoParts, AutoPart } from "@/data/mockAutoParts";
import { useParams } from "react-router-dom";

const AutoPartsPage: React.FC = () => {
  const [parts, setParts] = useState<AutoPart[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { countryCode } = useParams<{ countryCode?: string }>();

  // 🔹 Cargar repuestos simulados
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setParts(mockAutoParts);
      setLoading(false);
    }, 500);
  }, []);

  // 🔹 Búsqueda / Filtros
  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      let results = mockAutoParts;

      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        results = results.filter(
          (part) =>
            part.name.toLowerCase().includes(searchTermLower) ||
            part.description.toLowerCase().includes(searchTermLower) ||
            part.category.toLowerCase().includes(searchTermLower) ||
            part.vehicleMake.some((make) =>
              make.toLowerCase().includes(searchTermLower)
            ) ||
            part.sellerInfo.location.toLowerCase().includes(searchTermLower)
        );
      }

      if (filters.category) {
        results = results.filter((part) => part.category === filters.category);
      }

      if (filters.minPrice) {
        results = results.filter((part) => part.price >= filters.minPrice);
      }

      if (filters.maxPrice) {
        results = results.filter((part) => part.price <= filters.maxPrice);
      }

      setParts(results);
      setLoading(false);
    }, 1000);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

      <div className="pt-[80px]">
        {/* 🔹 HERO */}
        <Hero
          title="Repuestos para tu Vehículo"
          subtitle="Encuentra piezas nuevas, usadas y remanufacturadas para todas las marcas y modelos."
          backgroundImage="/assets/mundo/howItWorks.webp"
        />

        {/* 🔹 CTA para publicar repuestos */}
        <SecondaryCTA
          sectionBgColor="bg-white"
          buttonBgColor="bg-brand-primary"
          buttonTextColor="text-white"
          sectionTextColor="text-brand-primary"
        />

        {/* 🔹 CTA de negocio */}
        <BusinessCTA />

        {/* 🔹 Contenido principal */}
        <main className="mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* 🔸 Columna izquierda */}
            <div className="lg:col-span-1 space-y-8">
              <SearchFilters
                onSearch={handleSearch}
                condition="used"
                type="auto_parts"
              />
              <div className="hidden lg:block">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/castrolOil.png",
                      title: "Potencia para tu motor",
                      ctaText: "Ver más",
                      ctaHref: "https://www.castrol.com/",
                    },
                    {
                      src: "/assets/castrol.png",
                      title: "Desempeño garantizado",
                      ctaText: "Conoce más",
                      ctaHref: "https://www.toyota.com/",
                    },
                  ]}
                />
              </div>
            </div>

            {/* 🔹 Columna central */}
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-main mb-2">
                  Repuestos Disponibles
                </h2>
                <p className="text-text-secondary">
                  {parts.length} repuestos encontrados
                </p>
              </div>
              <AutoPartsGrid parts={parts} loading={loading} />
            </div>
          </div>

          {/* 🔸 Carrusel inferior */}
          <div className="mt-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/tesla.svg",
                  title: "Innovación que impulsa el futuro.",
                  subtitle: "Energía sin límites.",
                  ctaText: "Ver más",
                  ctaHref: "https://www.tesla.com/",
                },
                {
                  src: "/assets/toyotaxl.png",
                  title: "Potencia y elegancia en cada viaje",
                  subtitle: "Conduce tu destino.",
                  ctaText: "Ir al sitio",
                  ctaHref: "https://www.toyota.com/",
                },
              ]}
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AutoPartsPage;
