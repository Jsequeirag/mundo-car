import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Eye,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Crown,
  Images,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { IVehicle } from "@/interfaces/IVehicle";
import { getImagesByVehicleId } from "@/api/urls/Images";
import { useApiGet } from "@/api/config/customHooks";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import Flag from "react-flagkit";

interface ImageVehicle {
  id: number;
  base64: string;
  vehicle: any;
  vehicleId: number;
  vehicleId1: number;
}

interface CarCardProps {
  vehicle: IVehicle;
}

const CarCard: React.FC<CarCardProps> = ({ vehicle }) => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const selectedCountry =
    localStorage.getItem("selectedCountry") || countryCode || "CR";

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    return path.startsWith("/")
      ? `/${countryCode}${path}`
      : `/${countryCode}/${path}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isSuccess, isPending, isError, refetch } = useApiGet<
    ImageVehicle[]
  >(
    ["getImagesByVehicleId", vehicle.id],
    () => getImagesByVehicleId(vehicle.id),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
    }
  );

  const handleOpenPhotos = async () => {
    setIsModalOpen(true);
    setIsImageLoading(true);
    setCurrentImageIndex(0);
    await refetch({ cancelRefetch: false });
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setIsImageLoading(false);
      setCurrentImageIndex(0);
    } else {
      setIsImageLoading(true);
      refetch();
    }
  };

  useEffect(() => {
    if (isPending) setIsImageLoading(true);
    else if (isSuccess || isError) setIsImageLoading(false);
  }, [isPending, isSuccess, isError]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    if (data && data.length > 0) {
      setCurrentImageIndex((prev) =>
        prev < data.length - 1 ? prev + 1 : prev
      );
    }
  };

  return (
    <Card
      className={`bg-[#F7FAFA] group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl border-2 overflow-hidden relative
        ${
          vehicle.featured
            ? "border-[#034651] shadow-[0_0_20px_rgba(3,70,81,0.35)]"
            : "border-gray-200 hover:border-brand-primary"
        }`}
    >
      {/* 👑 SUPER DELUXE BADGE */}
      {vehicle.featured && (
        <div
          className="absolute z-20 top-3 left-3 flex items-center gap-2
          bg-gradient-to-r from-[#04606A] via-[#034651] to-[#012F3C]
          text-white font-semibold text-[11px] uppercase
          px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(3,70,81,0.4)]
          border border-[#E8EFF0]/10 animate-fadeIn"
        >
          <Crown className="h-4 w-4 text-yellow-400 animate-pulse" />
          <span>Super Deluxe</span>
        </div>
      )}

      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={vehicle.img}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-600 hover:text-brand-primary rounded-full h-8 w-8 p-0 shadow-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Badge className="bg-brand-primary text-white font-semibold rounded-full px-3 py-1 text-xs shadow-sm">
              {vehicle.condition}
            </Badge>
          </div>
        </div>

        {/* 🖼 BOTÓN "VER FOTOS" */}
        <div className="flex justify-center mt-3 mb-2">
          <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenPhotos}
                className="bg-[#034651] hover:bg-[#04606A] text-white font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
              >
                <Images className="h-4 w-4" />
                Ver Fotos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Fotos del Vehículo</DialogTitle>
              </DialogHeader>
              {isImageLoading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Cargando imágenes...</p>
                </div>
              ) : isError ? (
                <div className="text-red-500">
                  Error al cargar las imágenes.
                </div>
              ) : isSuccess && data && data.length > 0 ? (
                <div className="relative">
                  <img
                    src={data[currentImageIndex].base64}
                    alt={`Vehicle Image ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {data.length > 1 && (
                    <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevious}
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={currentImageIndex === data.length - 1}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                  <p className="text-center mt-2 text-sm text-gray-600">
                    {currentImageIndex + 1} de {data.length}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No hay fotos disponibles.</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* 🧾 INFO VEHÍCULO */}
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold text-[#1E2B2E] mb-2 line-clamp-1 ">
          {vehicle.year} {vehicle.brand} {vehicle.model}
        </CardTitle>

        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-2xl font-extrabold text-brand-primary tracking-tight">
            ${vehicle.price.toLocaleString()}
          </p>

          <div className="flex items-center justify-end text-[#4B5D60] text-sm">
            <MapPin className="h-4 w-4 mr-1 text-[#4B5D60]" />
            {vehicle.locate}
            <span className="ml-2">
              <Flag country={selectedCountry} size={16} />
            </span>
          </div>
        </div>

        {/* 🔹 BOTÓN DETALLES CENTRADO */}
        <div className="flex justify-center mt-3">
          <Link
            to={`${getCountryPath(
              vehicle.condition === "new"
                ? "newAutoDetailsPage"
                : "autoDetailsPage"
            )}`}
          >
            <Button className="bg-brand-primary hover:bg-[#04606A] text-white font-semibold text-sm px-6 py-2 rounded-lg shadow-md">
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
