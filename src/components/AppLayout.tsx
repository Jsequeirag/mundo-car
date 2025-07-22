import React, { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import SearchFilters from "./SearchFilters";
import CarGrid from "./CarGrid";
import Footer from "./Footer";
import { mockCars } from "@/data/mockCars";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Shield, Users } from "lucide-react";
import AdvertisementCarousel from "./AdvertisementCarousel";

const AppLayout: React.FC = () => {
  const adImagesTop = [
    "/assets/thumb-bridgestone.png",
    "/assets/TEX_LandingPage-1.jpg",
  ];

  const adImagesSide1 = [
    "/assets/meg-logo_506074c9-6b27-4912-b837-4d61fa365e7f.webp",
    "/assets/castrol-logo-png_seeklogo-307500.png",
  ];

  const adImagesSide2 = [
    "/assets/castrol-logo-png_seeklogo-307500.png",
    "/assets/meg-logo_506074c9-6b27-4912-b837-4d61fa365e7f.webp",
  ];

  const adImagesBottom = [
    "/assets/Firestone-Symbol.png",
    "/assets/logo-royal-dutch-shell-filling-station-shell-oil-company-brand-png-favpng-y4Si4QEbbP2AEVbswKNFvFfDR.jpeg",
  ];

  const [cars, setCars] = useState(mockCars);
  const [loading, setLoading] = useState(false);

  const handleSearch = (filters: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      {/* Changed background to a soft gray for a cleaner look */}
      <Header />
      <Navigation />
      {/* Hero Section */}
      {/* Replaced blue-purple gradient with brand-primary or a complementary gradient */}
      <section className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Find Your Perfect Car
          </h1>
          {/* Adjusted text opacity for better readability on brand-primary background */}
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Thousands of quality vehicles at unbeatable prices
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {/* Icons and text should remain white as they're on a dark background */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="font-semibold">Best Prices</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              <span className="font-semibold">Quality Assured</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">Secure Buying</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="font-semibold">Trusted Dealers</span>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <AdvertisementCarousel images={adImagesTop} interval={6000} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
          <div className="lg:col-span-1 space-y-8">
            <SearchFilters onSearch={handleSearch} />
            <div className="hidden lg:block">
              <AdvertisementCarousel images={adImagesSide1} interval={7000} />
            </div>
          </div>

          {/* Columna Central: Grid de Carros (ocupa más espacio) */}
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Featured Vehicles
              </h2>
              <p className="text-gray-600">{cars.length} cars available</p>
            </div>
            <CarGrid cars={cars} loading={loading} />
          </div>

          {/* Columna Derecha: Anuncio Lateral 2 */}
          <div className="lg:col-span-1 hidden lg:block space-y-8">
            <AdvertisementCarousel images={adImagesSide2} interval={8000} />
          </div>
        </div>
        {/* Anuncio Banner Inferior */}
        <div className="mt-8">
          <AdvertisementCarousel images={adImagesBottom} interval={6500} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
