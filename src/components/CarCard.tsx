import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Eye,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
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

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };

  // Estado para controlar diálogo / modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hook para traer imágenes; el “enabled: false” hace que no traiga hasta que llamemos refetch()
  const { data, isSuccess, isPending, isError, refetch } = useApiGet<
    ImageVehicle[]
  >(
    ["getImagesByVehicleId", vehicle.id], // ya no uso Date.now() aquí — el hook maneja caching / refetch
    () => getImagesByVehicleId(vehicle.id),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
    }
  );

  // Cuando el usuario clickea la imagen, abrir el modal y disparar fetch
  const handleImageClick = async () => {
    setIsModalOpen(true);
    setIsImageLoading(true);
    setCurrentImageIndex(0);

    // Forzar refetch siempre
    await refetch({ cancelRefetch: false });
  };
  // Cuando cambie el estado de “open” del diálogo
  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      // si se cerró
      setIsImageLoading(false);
      setCurrentImageIndex(0);
    } else {
      // si se abre de nuevo, volver a cargar
      setIsImageLoading(true);
      refetch();
    }
  };

  // Mantener sincronizado el estado de loading
  useEffect(() => {
    if (isPending) {
      setIsImageLoading(true);
    } else if (isSuccess || isError) {
      setIsImageLoading(false);
    }
  }, [isPending, isSuccess, isError]);

  // Navegación de imágenes
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

  // Logs de debugging
  useEffect(() => {
    console.log(
      "Fetch Status - isPending:",
      isPending,
      "isSuccess:",
      isSuccess,
      "isError:",
      isError
    );
    console.log("Fetched data:", data);
    console.log("Current Image Index:", currentImageIndex);
  }, [isPending, isSuccess, isError, data, currentImageIndex]);

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-2 ${
        vehicle.featured === true
          ? "border-brand-primary bg-yellow-50/50"
          : "hover:border-brand-primary"
      }`}
    >
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-lg">
          {/* El componente Dialog ahora controla su “open” y “onOpenChange” */}
          <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <img
                src={vehicle.img}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={handleImageClick}
              />
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Vehicle Images</DialogTitle>
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
                    onError={(e) => console.error("Image load error:", e)}
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
                    {currentImageIndex + 1} of {data.length}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No images available.</p>
              )}
            </DialogContent>
          </Dialog>

          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white/95 text-gray-600 hover:text-brand-primary transition-colors"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Badge className="bg-brand-primary text-white font-semibold rounded-full px-3 py-1 text-xs">
              {vehicle.condition}
            </Badge>
          </div>
          {vehicle.featured === true && (
            <div className="absolute top-3 left-3 bg-brand-primary bg-opacity-90 text-yellow-600 text-sm font-bold py-2 px-4 rounded-full shadow-lg border border-yellow-500 flex items-center gap-1.5">
              <Star className="h-5 w-5" style={{ fill: "currentColor" }} />
              <span>Destacado</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
          {vehicle.year} {vehicle.brand} {vehicle.model}
        </CardTitle>
        <div className="space-y-2 mb-4">
          <p className="text-2xl font-bold text-brand-primary">
            ${vehicle.price.toLocaleString()}
          </p>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {vehicle.locate}
          </div>
          {vehicle.condition === "used" && (
            <p className="text-gray-500 text-sm">
              {vehicle.distance.toLocaleString()} Kilómetros
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to={`${getCountryPath(
              vehicle.condition === "new"
                ? "newAutoDetailsPage"
                : "autoDetailsPage"
            )}`}
          >
            <Button className="flex-1 bg-brand-primary hover:bg-opacity-90 transition-colors">
              <Eye className="h-4 w-4 mr-2" />
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
