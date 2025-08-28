import React, { useState } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import { mockUsedCars } from "@/data/mockUsedCars";
import { mockNewCars } from "@/data/mockNewCars";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import MobileSidebar from "@/components/MobileSidebar";
import AutoLotHero from "@/components/AutoLotHero";
import { useParams } from "react-router-dom";
import { LucideMail, LucidePhone, MessageCircle } from "lucide-react";
const AutoLotsPage: React.FC = () => {
  const [usedCars, setUsedCars] = useState(mockUsedCars);
  const [newCars, setNewCars] = useState(mockNewCars);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      setUsedCars(mockUsedCars);
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
      name: "AutoLote El Sol",
      image: "/assets/autolotes/autolote-el-sol.png",
      subtitle: "Los mejores vehículos al mejor precio",

      link: "/autolot/1",
    },
    {
      id: "2",
      name: "AutoLote La Estrella",
      image: "/assets/autolotes/autolote-laestrella.png",
      subtitle: "Calidad garantizada en cada auto",

      link: "/autolot/2",
    },
    {
      id: "3",
      name: "AutoLote Premium",
      image: "/assets/autolotes/autolote-premium.png",
      subtitle: "Autos de lujo a tu alcance",

      link: "/autolot/3",
    },
  ];

  const featuredAutoLot = autoLots.find((lot) => lot.id === id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <div className="pt-[80px]">
        <AutoLotHero autoLot={featuredAutoLot} />
        <main className="mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col gap-8 mb-8">
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
            />
          </div>
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
              />
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
            <div className="lg:col-span-2 xl:col-span-3" id="autolot-cars">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                  Información del Autolote
                </h2>{" "}
                <div className="flex flex-col  mb-4">
                  <h2 className="  font-semibold text-lg text-gray-900  border-gray-200 ">
                    Autolote: AutoLote Premium
                  </h2>
                </div>
                <p>
                  <LucidePhone className="inline mr-2 mb-2" /> Teléfono: (506)
                  2234-5678
                </p>
                <p>
                  <MessageCircle className="inline mr-2 mb-2" /> WhatsApp: (506)
                  8765-4321
                </p>
                <p>Dirección: Av. Central, San José, Costa Rica</p>
                <p>Horario: Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mb-4">
                    <LucideMail className="mr-2" /> Enviar Email
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <MessageCircle className="mr-2" /> WhatsApp
                  </button>
                </div>
              </div>
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-gray-700 font-semibold">
                  {usedCars.length} Autos Disponibles
                </p>
              </div>
              <CarGrid cars={usedCars} loading={loading} />
            </div>
            <div className="lg:col-span-1 hidden lg:block space-y-6 sm:space-y-8">
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
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AutoLotsPage;
