import React, { useState } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import { mockNewCars } from "@/data/mockNewCars";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import MobileSidebar from "@/components/MobileSidebar";
import { Button } from "@/components/ui/button";
import AutoLotHero from "@/components/AutoLotHero";
import { useParams } from "react-router-dom";
import {
  LucideMail,
  LucidePhone,
  MessageCircle,
  MapPin,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AutoBrandPage: React.FC = () => {
  const [newCars, setNewCars] = useState(mockNewCars);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

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
    autoLotName: "AutoLote Premium",
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Formulario enviado:\nTema: ${formData.subject}\nNombre: ${formData.fullName}\nCorreo: ${formData.email}\nTeléfono: ${formData.phone}\nMensaje: ${formData.message}`
    );
    setIsModalOpen(false);
    setFormData({
      subject: "",
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

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
              />
            </div>
            <div className="lg:col-span-3 xl:col-span-4" id="autolot-cars">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col gap-6">
                {/* Contact Info Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                    Información de Contacto
                  </h2>
                  <div className="mb-4">
                    <h2 className="font-semibold text-lg text-gray-900 mb-2">
                      Concesionario: Dimasa
                    </h2>
                    <h2 className="font-semibold text-lg text-gray-900 mb-4">
                      Marca: Ford
                    </h2>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-8">
                    {carDetails.agencies.map((agency, index) => (
                      <div key={index} className="flex-1 mb-6 last:mb-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                          <div className="">
                            <p className="font-semibold text-lg text-gray-900 mb-2">
                              {agency.name}
                            </p>
                            <p className="mb-2">
                              <LucidePhone className="inline mr-2 h-5 w-5 text-gray-600" />{" "}
                              Teléfono: {agency.phone}
                            </p>
                            <p className="mb-2">
                              <MessageCircle className="inline mr-2 h-5 w-5 text-gray-600" />{" "}
                              WhatsApp: {agency.whatsapp}
                            </p>
                            <p className="mb-2">
                              <MapPin className="inline mr-2 h-5 w-5 text-gray-600" />{" "}
                              Dirección: {agency.address}
                            </p>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 mt-4 sm:mt-0">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-300 w-full sm:w-[200px]">
                              <LucideMail className="mr-2 h-5 w-5" /> Enviar
                              Email
                            </button>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors duration-300 w-full sm:w-[200px]">
                              <MessageCircle className="mr-2 h-5 w-5" />{" "}
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* More Info Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col lg:flex-row lg:gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                      Más Información
                    </h2>
                    <div className="flex flex-col gap-4">
                      <a
                        href="https://www.dimasaford.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors duration-300 w-full sm:w-[200px]"
                      >
                        <Globe className="mr-2 h-5 w-5" /> Visitar Sitio Web
                      </a>
                    </div>
                  </div>
                  <div className="flex-1 mt-6 lg:mt-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                      Obtener Más Información
                    </h2>
                    <div className="flex flex-col gap-4">
                      <Button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors duration-300 w-full sm:w-[200px]"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Contactar Dealer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-gray-700 font-semibold">
                  {newCars.length} Autos Nuevos Disponibles
                </p>
              </div>
              <CarGrid cars={newCars} loading={loading} />
            </div>
          </div>
        </main>
      </div>
      <Footer />

      {/* Modal for Contact Form */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Contactar Dealer
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="subject" className="text-gray-700 font-medium">
                  Tema
                </Label>
                <Select
                  onValueChange={handleSelectChange}
                  value={formData.subject}
                >
                  <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informacion">
                      Obtener más información
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  Nombre y Apellidos
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:ring-brand-primary focus:border-brand-primary"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:ring-brand-primary focus:border-brand-primary"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:ring-brand-primary focus:border-brand-primary"
                  placeholder="123-456-7890"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:ring-brand-primary focus:border-brand-primary min-h-[100px]"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors duration-300"
              >
                Enviar
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutoBrandPage;
