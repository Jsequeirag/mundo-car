import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import RentalCarGrid from "@/components/RentalCarGrid";
import Footer from "@/components/Footer";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import BrandShowCase from "@/components/UsedCarGrid";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/cta/SecondaryCTA";
import BusinessCTA from "@/components/cta/BusinessCTA";
import MobileSidebar from "@/components/MobileSidebar";
import { mockRentalCars, RentalCar } from "@/data/mockRentalCars";
import { useParams } from "react-router-dom";

const RentalCarsPage: React.FC = () => {
  const [rentalCars, setRentalCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { countryCode } = useParams<{ countryCode?: string }>();

  const brandLogos = [
    {
      id: "1",
      name: "Renta Fácil",
      src: "/assets/rentacar/rentafacil.png",
      type: "rentacar",
    },
    {
      id: "2",
      name: "Autorenta Rodríguez",
      src: "/assets/rentacar/autorenta.png",
      type: "rentacar",
    },
    {
      id: "3",
      name: "Menoskilómetros",
      src: "/assets/rentacar/menoskilometros.png",
      type: "rentacar",
    },
  ];

  // 🔹 Carga inicial (simulación API)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRentalCars(mockRentalCars);
      setLoading(false);
    }, 500);
  }, []);

  // 🔹 Filtros de búsqueda
  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      let results = mockRentalCars;

      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        results = results.filter(
          (car) =>
            car.make.toLowerCase().includes(searchTermLower) ||
            car.model.toLowerCase().includes(searchTermLower) ||
            car.location.toLowerCase().includes(searchTermLower) ||
            car.type.toLowerCase().includes(searchTermLower) ||
            car.company.name.toLowerCase().includes(searchTermLower)
        );
      }

      if (filters.location) {
        results = results.filter(
          (car) => car.location.toLowerCase() === filters.location.toLowerCase()
        );
      }

      if (filters.carType) {
        results = results.filter(
          (car) => car.type.toLowerCase() === filters.carType.toLowerCase()
        );
      }

      if (filters.minDailyRate) {
        results = results.filter(
          (car) => car.dailyRate >= filters.minDailyRate
        );
      }

      if (filters.maxDailyRate) {
        results = results.filter(
          (car) => car.dailyRate <= filters.maxDailyRate
        );
      }

      setRentalCars(results);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* 🔹 Header + Sidebar */}
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        currentCountryCode={countryCode}
      />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="pt-[80px]">
        {/* 🔹 HERO principal */}
        <Hero
          title="Renta el Auto Perfecto para tu Viaje"
          subtitle="Encuentra el vehículo ideal para tus vacaciones, negocios o aventuras."
          backgroundImage="/assets/mundo/howItWorks.webp"
        />

        {/* 🔹 CTA publicar o anunciar */}
        <SecondaryCTA
          sectionBgColor="bg-white"
          buttonBgColor="bg-brand-primary"
          buttonTextColor="text-white"
          sectionTextColor="text-brand-primary"
        />

        {/* 🔹 CTA para empresas */}
        <BusinessCTA />

        {/* 🔹 Mostrar rentadoras */}
        <BrandShowCase brandLogos={brandLogos} />

        {/* 🔹 Contenido principal */}
        <main className="mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* 🔸 Filtros + lateral */}
            <div className="lg:col-span-1 space-y-8">
              <SearchFilters
                onSearch={handleSearch}
                condition="rental"
                type="rental"
              />

              <div className="hidden lg:block">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/meguiarSpray.jpg",
                      title: "Mantén tu auto brillante",
                      ctaText: "Ver más",
                      ctaHref: "https://meguiarsdirect.com/",
                    },
                    {
                      src: "/assets/meguiar.jpg",
                      title: "Calidad profesional para tu vehículo",
                      ctaText: "Conoce más",
                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                  ]}
                />
              </div>
            </div>

            {/* 🔹 Resultados */}
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-main mb-2">
                  Autos de Renta Disponibles
                </h2>
                <p className="text-text-secondary">
                  {rentalCars.length} vehículos disponibles para renta
                </p>
              </div>
              <RentalCarGrid cars={rentalCars} loading={loading} />
            </div>
          </div>

          {/* 🔸 Carrusel inferior */}
          <div className="mt-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/tesla.svg",
                  title: "Innovación que impulsa el futuro.",
                  subtitle: "Tecnología sin límites.",
                  ctaText: "Ver más",
                  ctaHref: "https://www.tesla.com/",
                },
                {
                  src: "/assets/toyotaxl.png",
                  title: "Potencia y elegancia en cada viaje",
                  subtitle: "Tu próximo viaje comienza aquí.",
                  ctaText: "Descubrir",
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

export default RentalCarsPage;
