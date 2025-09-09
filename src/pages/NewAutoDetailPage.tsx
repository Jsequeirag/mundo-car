import React, { useState } from "react";
import Header from "@/components/Header";
import AutoDetailsHero from "@/components/AutoDetailsHero";
import Footer from "@/components/Footer";
import {
  LucideMail,
  LucidePhone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Settings,
  Users,
  Droplet,
  Joystick,
  Gauge,
  CarFront,
  Palette,
  DoorOpen,
  DollarSign,
  MapPin,
  Calendar,
  Facebook,
} from "lucide-react";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import CarGrid from "@/components/CarGrid";
import { mockNewCars } from "@/data/mockNewCars";
import AutoDetailModal from "@/components/AutoDetailModal";
import MobileSidebar from "@/components/MobileSidebar";
import { useParams, Outlet, useNavigate } from "react-router-dom";

const NewAutoDetailPage: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carImages = [
    "/assets/branddetalles/ford-1.webp",
    "/assets/branddetalles/ford-2.jpg",
    "/assets/branddetalles/ford-3.webp",
    { type: "video", src: "https://www.youtube.com/embed/ExbHfzmdbGE" },
  ];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowVideo(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % carImages.length);
  };

  const toggleMedia = () => {
    setShowVideo(!showVideo);
  };
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { countryCode } = useParams<{ countryCode?: string }>();
  const carDetails = {
    name: "New Luxury SUV 2025",
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
    specs: {
      Cilindrada: "3000 cc",
      Estilo: "SUV 4WD",
      Pasajeros: "7",
      Combustible: "Híbrido",
      Transmision: "Automática",
      Estado: "Nuevo",
      Kilometraje: "0 kms",
      Traccion: "4x4",
      "Color exterior": "BLANCO PERLA",
      "Color Interior": "BEIGE",
      Puertas: "5",
      Impuestos: "Incluidos",
      Provincia: "Francisco Morazán",
      "Fecha ingreso": "01 de Septiembre de 2025",
    },
    features: [
      "Dirección Hidráulica/Electroasistida",
      "Cierre central",
      "Asientos eléctricos con calefacción",
      "Vidrios tintados",
      "Vidrios eléctricos",
      "Bolsas de aire múltiples",
      "Alarma con sensor",
      "Espejos eléctricos plegables",
      "Frenos ABS con EBD",
      "Aire acondicionado dual",
      "Techo panorámico eléctrico",
      'Aros de aleación 20"',
      "Motor turbo híbrido",
      "Tapicería de cuero premium",
      "Luces LED adaptativas",
      "Cámara 360° con visión nocturna",
      "Android Auto y Apple CarPlay",
      "Control crucero adaptativo",
      'Sistema de infoentretenimiento 12"',
      "Garantía de fábrica",
      "Asistente de conducción autónoma",
      "Carga inalámbrica",
      "Asientos ventilados",
      "Sistema de sonido premium",
    ],
  };

  const carFeatures = new Set([
    "Dirección Hidráulica/Electroasistida",
    "Cierre central",
    "Vidrios eléctricos",
    "Bolsas de aire múltiples",
    "Frenos ABS con EBD",
    "Aire acondicionado dual",
    "Techo panorámico eléctrico",
    "Cámara 360° con visión nocturna",
    "Android Auto y Apple CarPlay",
    "Control crucero adaptativo",
    'Sistema de infoentretenimiento 12"',
    "Garantía de fábrica",
    "Asistente de conducción autónoma",
  ]);
  const shareUrl = window.location.href; // URL to share (current page)
  const shareText = `¡Mira este increíble vehículo en ${carDetails.autoLotName}!`;

  const handleShareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const handleShareEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(
        "Mira este vehículo!"
      )}&body=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <div className="pt-[80px]">
        <AutoDetailsHero />
        <main className="mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-5">
              {/* Car Images Section */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {carImages.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => openModal(index)}
                    className="cursor-pointer rounded-lg overflow-hidden"
                  >
                    {item.type === "video" ? (
                      <iframe
                        src={item.src}
                        title={`Video view ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={item}
                        alt={`Car view ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
              {isModalOpen && (
                <AutoDetailModal onClose={closeModal}>
                  <div className="relative">
                    {carImages[currentIndex].type === "video" ? (
                      <div className="w-full h-96">
                        <iframe
                          src={carImages[currentIndex].src}
                          title="Vehicle Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <img
                        src={carImages[currentIndex]}
                        alt="Car view"
                        className="w-full h-auto transition-opacity duration-500"
                      />
                    )}
                  </div>
                  {!showVideo && carImages[currentIndex].type !== "video" && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </AutoDetailModal>
              )}
              {/* Contact Info Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row gap-6">
                {" "}
                {/* Contact Info Section */}
                <div className="flex-1">
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

                      <div className="flex flex-col gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-300 w-[250px] mt-2">
                          <LucideMail className="mr-2 h-5 w-5" /> Enviar Email
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors duration-300 w-[250px]">
                          <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                        </button>{" "}
                        <button
                          onClick={() => navigate(`/hr/autoBrandPage`)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center mt-2 hover:bg-gray-700 transition-colors duration-300 w-[250px]"
                        >
                          <MapPin className="mr-2" /> Ver Agencia
                        </button>{" "}
                      </div>
                    </div>
                  ))}{" "}
                </div>{" "}
                <div className="flex-1">
                  {" "}
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                    Compartir Vehículo
                  </h2>
                  <div className="">
                    <button
                      onClick={handleShareWhatsApp}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors duration-300"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" /> Compartir por
                      WhatsApp
                    </button>
                    <button
                      onClick={handleShareFacebook}
                      className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-900 transition-colors duration-300 mt-2"
                    >
                      <Facebook className="mr-2 h-5 w-5" /> Compartir por
                      Facebook
                    </button>
                    <button
                      onClick={handleShareEmail}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors duration-300 mt-2"
                    >
                      <LucideMail className="mr-2 h-5 w-5" /> Compartir por
                      Email
                    </button>
                  </div>
                </div>
              </div>
              {/* Specifications Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                  Especificaciones del Ford Ranger XL
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(carDetails.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center text-gray-700">
                      {getSpecIcon(key)}
                      <span className="ml-2">
                        {key}: {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                  Características del Auto
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {carDetails.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center text-gray-700"
                    >
                      {carFeatures.has(feature) ? (
                        <CheckCircle
                          className="text-green-500 mr-2"
                          size={18}
                        />
                      ) : (
                        <XCircle className="text-red-500 mr-2" size={18} />
                      )}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto Lot Cars Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Otros Vehículos Nuevos de Dimasa
                </h2>
                <CarGrid cars={mockNewCars} loading={false} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Función para asignar íconos a las especificaciones
const getSpecIcon = (key: string) => {
  const iconProps = { size: 18, className: "text-gray-500 mr-2" };
  switch (key.toLowerCase()) {
    case "cilindrada":
      return <Settings {...iconProps} />;
    case "estilo":
      return <CarFront {...iconProps} />;
    case "pasajeros":
      return <Users {...iconProps} />;
    case "combustible":
      return <Droplet {...iconProps} />;
    case "transmision":
      return <Joystick {...iconProps} />;
    case "estado":
      return <Gauge {...iconProps} />;
    case "kilometraje":
      return <Gauge {...iconProps} />;
    case "traccion":
      return <CarFront {...iconProps} />;
    case "colorexterior":
      return <Palette {...iconProps} />;
    case "colorinterior":
      return <Palette {...iconProps} />;
    case "puertas":
      return <DoorOpen {...iconProps} />;
    case "impuestos":
      return <DollarSign {...iconProps} />;
    case "precionegociable":
      return <DollarSign {...iconProps} />;
    case "recibevehiculo":
      return <CarFront {...iconProps} />;
    case "provincia":
      return <MapPin {...iconProps} />;
    case "fechaingreso":
      return <Calendar {...iconProps} />;
    default:
      return null;
  }
};

export default NewAutoDetailPage;
