import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/SecondaryCTA";
import MobileSidebar from "../components/MobileSidebar";
import { useParams, Outlet } from "react-router-dom";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
// Importamos el componente del visor 360 que creamos.
import { Car360Viewer } from "@/components/Car360Viewer";

// Definimos una interfaz para la data del carro, similar a la de los lubricentros
export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  // Añadimos una propiedad para las imágenes del visor 360
  images360: string[];
}

// Simulamos los datos de un carro. En una app real, esto vendría de tu API.
const mockCars: Car[] = [
  {
    id: "car-1",
    name: "Honda Civic Sedan",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 28000,
    description:
      "El nuevo Honda Civic combina un diseño elegante con tecnología avanzada y un rendimiento de combustible excepcional. Perfecto para la ciudad y la carretera.",
    // Aquí usamos un array de 12 imágenes para el visor 360
    images360: [
      "/assets/360/dacia1.webp",
      "/assets/360/dacia2.webp",
      "/assets/360/dacia3.webp",
      "/assets/360/dacia4.webp",
    ],
  },
  // Puedes añadir más carros aquí si lo necesitas
];

const CarDetailsPage: React.FC = () => {
  // Las imágenes de anuncios, tomadas de tu ejemplo
  const adImagesTop = ["/assets/bridgestone.png"];
  const adImagesSide1 = [
    "/assets/toyota.png",
    "/assets/castrol-logo-png_seeklogo-307500.png",
    "/assets/sparco.png",
  ];
  const adImagesSide2 = [
    "/assets/momo.png",
    "/assets/meg-logo_506074c9-6b27-4912-b837-4d61fa365e7f.webp",
    "/assets/gulf.png",
    "/assets/mascarello.png",
  ];

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  // Usamos useParams para obtener el ID del carro de la URL.
  // Por ejemplo, para una URL como /cars/car-1, "carId" sería "car-1".
  const { carId } = useParams<{ carId: string }>();

  useEffect(() => {
    setLoading(true);
    // Simulamos una llamada a una API para obtener los datos de un solo carro.
    setTimeout(() => {
      // En una aplicación real, harías una llamada como:
      // const fetchedCar = await fetch(`/api/cars/${carId}`);
      // setCar(fetchedCar);
      const foundCar = mockCars.find((c) => c.id === carId);
      setCar(foundCar || null);
      setLoading(false);
    }, 1000);
  }, [carId]); // El efecto se ejecuta cada vez que el carId cambia

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { countryCode } = useParams<{ countryCode?: string }>();

  // Si aún está cargando o no se encontró el carro, mostramos un mensaje
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Cargando detalles del carro...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Carro no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />

      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

      <div className="pt-[80px]">
        {/* Padding para compensar el header fijo */}
        <Hero
          title={`${car.brand} ${car.model} ${car.year}`}
          subtitle={`Desde $${car.price.toLocaleString()}`}
        />
        <main className="mx-auto px-4 py-10">
          <div className="mb-8">
            <AdvertisementCarousel
              images={adImagesTop}
              interval={6000}
              heightClass="h-40 md:h-48 lg:h-56"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Detalles del carro y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Detalles Principales</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Marca:</strong> {car.brand}
                  </li>
                  <li>
                    <strong>Modelo:</strong> {car.model}
                  </li>
                  <li>
                    <strong>Año:</strong> {car.year}
                  </li>
                  <li>
                    <strong>Precio:</strong> ${car.price.toLocaleString()}
                  </li>
                </ul>
                <p className="mt-4">{car.description}</p>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                  Contactar al Vendedor
                </button>
              </div>
              <div className="hidden lg:block">
                <AdvertisementCarouselLateral images={adImagesSide1} />
              </div>
            </div>

            {/* Columna Central: Visor 360 y otros detalles */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Vista 360° del Vehículo
                </h2>
                {/* Aquí integramos el componente del visor 360 */}
                <Car360Viewer images={car.images360} />
              </div>
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral images={adImagesSide2} />
            </div>
          </div>
        </main>
      </div>
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default CarDetailsPage;
