// pages/RentalCarsPage.tsx
// O en Next.js App Router: app/renta/page.tsx

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters"; // Reutilizaremos este componente
import RentalCarGrid from "@/components/RentalCarGrid"; // Nuevo componente
import Footer from "@/components/Footer";
import { mockRentalCars, RentalCar } from "@/data/mockRentalCars"; // Importa los datos y la interfaz
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/SecondaryCTA";
import MobileSidebar from "../components/MobileSidebar";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";

import { useParams, Outlet } from "react-router-dom";
const RentalCarsPage: React.FC = () => {
  const [rentalCars, setRentalCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(false);

  // Carga inicial de todos los autos de renta
  useEffect(() => {
    setLoading(true);
    // Simula una llamada API
    setTimeout(() => {
      setRentalCars(mockRentalCars);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      let results = mockRentalCars;

      // Aplicar filtros de búsqueda para autos de renta
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
        // Ejemplo si tu filtro lo permite
        results = results.filter(
          (car) => car.location.toLowerCase() === filters.location.toLowerCase()
        );
      }
      if (filters.carType) {
        // Ejemplo si tu filtro lo permite
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
      // Filtros de fecha de disponibilidad serían más complejos y necesitarían un selector de fechas en SearchFilters
      // Por ejemplo, si tienes filters.pickupDate y filters.dropoffDate
      // results = results.filter(car => car.availability.some(slot =>
      //   new Date(filters.pickupDate) >= new Date(slot.startDate) && new Date(filters.dropoffDate) <= new Date(slot.endDate)
      // ));

      setRentalCars(results);
      setLoading(false);
    }, 1000);
  };

  // Necesitarás un MobileSidebar aquí también
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { countryCode } = useParams<{ countryCode?: string }>();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />{" "}
      {/* Pasa la prop para el menú móvil */}
      {/* Importa y usa MobileSidebar si lo tienes */}
      {/* <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} /> */}{" "}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        // Puedes pasar los navItems al MobileSidebar si no los define internamente
        // navItems={/* el mismo array navItems que tienes en Header, o adaptado */}
      />
      <div className="pt-[80px]">
        {" "}
        {/* Padding para compensar el header fijo */}
        {/* Hero Section para Renta de Autos */}
        <Hero
          title="Renta el Auto Perfecto para tu Viaje"
          subtitle="Amplia selección de vehículos para cualquier ocasión, con tarifas flexibles."
          // Si tienes el Hero modificado para aceptar showSearch, puedes pasarlo aquí
          // showSearch={false}
        />
        {/* Sección de CTA para empresas de renta de autos */}
        <main className="mx-auto px-4 py-10">
          <div className="mb-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/bridgestone.png",
                  title: "Durabilidad y estilo en cada kilómetro.",
                  subtitle: "Rueda con confianza",
                  ctaText: "Ver sitio",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
                {
                  src: "/assets/texaco.png",
                  title: "Energía y servicio para tu camino.",
                  subtitle: "Llena tu tanque, sigue tu rumbo.",
                  ctaText: "Ver sitio",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              {/* Ajusta SearchFilters para renta de autos. */}
              <SearchFilters
                onSearch={handleSearch}
                initialCategory="car_rental" // Nuevo tipo de categoría para renta de autos
                // Puedes añadir otras props para que SearchFilters se adapte:
                // showMakeModel={true}
                // showYear={false}
                // showTransmission={true}
                // showFuelType={true}
                // showSeats={true}
                // showDailyRateRange={true} // Rango de precio diario
                // showPickupLocation={true}
                // showDatesPicker={true} // Para seleccionar fechas de alquiler
              />
              <div className="lg:col-span-1 hidden lg:block space-y-8">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/meguiarSpray.jpg",
                      title: "Innovación que impulsa el futuro.",
                      ctaText: "Ver más",
                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/meguiar.jpg",
                      title: "Potencia y elegancia en cada viaje",
                      ctaText: "Ver sitio",
                      ctaHref: "https://meguiarsdirect.com/",
                    },
                  ]}
                />{" "}
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/castrolOil.png",
                      title: "Innovación que impulsa el futuro.",
                      ctaText: "Ver más",
                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/castrol.png",
                      title: "Potencia y elegancia en cada viaje",
                      ctaText: "Ver sitio",
                      ctaHref: "https://www.toyota.com/",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Columna Central: Grid de Autos de Renta */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Autos de Renta Disponibles
                </h2>
                <p className="text-gray-600">
                  {rentalCars.length} vehículos de renta encontrados
                </p>
              </div>
              <RentalCarGrid cars={rentalCars} loading={loading} />
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              {" "}
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/castrolOil.png",
                    title: "Innovación que impulsa el futuro.",
                    ctaText: "Ver más",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/castrol.png",
                    title: "Potencia y elegancia en cada viaje",
                    ctaText: "Ver sitio",
                    ctaHref: "https://www.toyota.com/",
                  },
                ]}
              />
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/meguiarSpray.jpg",
                    title: "Innovación que impulsa el futuro.",
                    ctaText: "Ver más",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/meguiar.jpg",
                    title: "Potencia y elegancia en cada viaje",
                    ctaText: "Ver sitio",
                    ctaHref: "https://meguiarsdirect.com/",
                  },
                ]}
              />{" "}
            </div>
          </div>{" "}
          <div className="mt-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/tesla.svg",
                  title: "Innovación que impulsa el futuro.",
                  subtitle: "Energía sin límites.",
                  ctaText: "Ir a sitio",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
                {
                  src: "/assets/toyotaxl.png",
                  title: "Potencia y elegancia en cada viaje",
                  subtitle: "Conduce tu destino.",
                  ctaText: "Ver sitio",
                  ctaHref: "https://www.toyota.com/",
                  badge: "",
                },
              ]}
            />
          </div>
        </main>
      </div>
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default RentalCarsPage;
