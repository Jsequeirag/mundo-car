import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Eye, MapPin } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    location: string;
    image: string;
    condition: string;
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card
      // Borde al pasar el ratón: usa tu brand-primary
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-2 hover:border-brand-primary"
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {/* Botón de Favoritos: El fondo blanco es bueno, pero el ícono puede ser de marca en hover */}
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white/95 text-gray-600 hover:text-brand-primary transition-colors" // Icono cambia a brand-primary en hover
            >
              <Heart className="h-4 w-4" />
            </Button>
            {/* Badge de Condición: Usa tu brand-primary como fondo */}
            <Badge className="bg-brand-primary text-white font-semibold rounded-full px-3 py-1 text-xs">
              {car.condition}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
          {car.year} {car.make} {car.model}
        </CardTitle>
        <div className="space-y-2 mb-4">
          {/* Precio: Usa tu brand-primary para destacarlo */}
          <p className="text-2xl font-bold text-brand-primary">
            ${car.price.toLocaleString()}
          </p>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {car.location}
          </div>
          <p className="text-gray-600 text-sm">
            {car.mileage.toLocaleString()} miles
          </p>
        </div>
        <div className="flex gap-2">
          {/* Botón "View Details": Usa tu brand-primary como fondo */}
          <Button
            className="flex-1 bg-brand-primary hover:bg-opacity-90 transition-colors" // Hover con opacidad
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
