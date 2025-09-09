import React, { useState } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import { mockNewCars } from "@/data/mockNewCars"; // Ajustado para autos nuevos
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import MobileSidebar from "@/components/MobileSidebar";
import AutoLotHero from "@/components/AutoLotHero";
import { useParams } from "react-router-dom";

import { LucideMail, LucidePhone, MessageCircle, MapPin } from "lucide-react";
const AutoBrandPage: React.FC = () => {
  const [newCars, setNewCars] = useState(mockNewCars);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      setNewCars(mockNewCars);
      setLoading(false);
    }, 1000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { countryCode } = useParams<{ countryCode?: string }>();
  const { id } = useParams<{ id?: string }>();
  const autoLots = [
    {
      id: "1",
      name: "DimasaCar",
      image: "/assets/brands/ford-wallpaper.jpg",
      subtitle: "Nuevos vehículos de alta gama",
      link: "/new-autolot/1",
    },
    {
      id: "2",
      name: "AutoLote Moderno",
      image: "/assets/autolotes/autolote-moderno.png",
      subtitle: "Innovación en cada modelo",
      link: "/new-autolot/2",
    },
    {
      id: "3",
      name: "AutoLote Lux",
      image: "/assets/autolotes/autolote-lux.png",
      subtitle: "Lujo y tecnología avanzada",
      link: "/new-autolot/3",
    },
  ];
  const carDetails = {
    name: "LUXURY CAR",
    phone: "8303-2535",
    whatsapp: "8303-2535",
    address: "Boulevard Morazán, Tegucigalpa, Honduras",
    autoLotName: "AutoLote Premium", // Dirección actualizada a Honduras
    agencies: [
      {
        name: "Agencia Norte",
        phone: "2234-5678",
        whatsapp: "8765-4321",
        address: "Boulevard Morazán, Tegucigalpa, Honduras",
      },
      {
        name: "Agencia Sur",
        phone: "9988-7766",
        whatsapp: "5544-3322",
        address: "Avenida La Paz, San Pedro Sula, Honduras",
      },
    ],
  };
  const featuredAutoLot = autoLots.find((lot) => lot.id === "1");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <div className="pt-[80px]">
        <AutoLotHero autoLot={featuredAutoLot} />
        <main className="mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            <div className="lg:col-span-1 hidden lg:block space-y-6 sm:space-y-8">
              <SearchFilters
                onSearch={handleSearch}
                disableCategory={true}
                disableMunicipality={true}
                lockCategory={true}
              />
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
            </div>
            <div className="lg:col-span-3 xl:col-span-4" id="autolot-cars">
              {/* Contact Info Section */}
              {/* Contact Info Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                  Información de Contacto
                </h2>{" "}
                <div className="flex flex-col  mb-4">
                  <h2 className="  font-semibold text-lg text-gray-900   border-gray-200 ">
                    Concesionario: Dimasa
                  </h2>
                  <h2 className="  font-semibold text-lg text-gray-900  border-gray-200 ">
                    Marca: Ford
                  </h2>
                </div>
                {carDetails.agencies.map((agency, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <p className="font-semibold text-lg">{agency.name}</p>
                    <p>
                      <LucidePhone className="inline mr-2 mb-2" /> Teléfono:{" "}
                      {agency.phone}
                    </p>
                    <p>
                      <MessageCircle className="inline mr-2 mb-2" /> WhatsApp:{" "}
                      {agency.whatsapp}
                    </p>
                    <p>
                      <MapPin className="inline mr-2 mb-2" /> Dirección:{" "}
                      {agency.address}
                    </p>
                  </div>
                ))}{" "}
              </div>
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-gray-700 font-semibold">
                  {newCars.length} Autos Nuevos Disponibles
                </p>
              </div>
              <CarGrid cars={mockNewCars} loading={loading} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AutoBrandPage;
