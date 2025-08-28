import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Eye, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  highlighted?: boolean; // Added highlighted prop
}

const CarCard: React.FC<CarCardProps> = ({ car, highlighted = false }) => {
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
  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-2 ${
        highlighted
          ? "border-brand-primary bg-yellow-50/50"
          : "hover:border-brand-primary"
      }`}
    >
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white/95 text-gray-600 hover:text-brand-primary transition-colors"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Badge className="bg-brand-primary text-white font-semibold rounded-full px-3 py-1 text-xs">
              {car.condition}
            </Badge>
          </div>
          {/* Enhanced Premium Sticker for highlighted cars */}
          {highlighted && (
            <div className="absolute top-3 left-3 bg-brand-primary bg-opacity-90 text-yellow-600 text-sm font-bold py-2 px-4 rounded-full shadow-lg border border-yellow-500 flex items-center gap-1.5">
              <Star className="h-5 w-5" style={{ fill: "currentColor" }} />
              <span>Destacado</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
          {car.year} {car.make} {car.model}
        </CardTitle>
        <div className="space-y-2 mb-4">
          <p className="text-2xl font-bold text-brand-primary">
            ${car.price.toLocaleString()}
          </p>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {car.location}
          </div>
          {car.mileage && (
            <p className="text-gray-600 text-sm">
              {car.mileage.toLocaleString()} miles
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to={`${getCountryPath(
              car.condition === "nuevo"
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
