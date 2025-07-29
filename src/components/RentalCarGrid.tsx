// components/RentalCarGrid.tsx
import React from "react";
import { RentalCar } from "@/data/mockRentalCars";
import { Loader2, Calendar, Gauge, Users, Car, MapPin } from "lucide-react";

interface RentalCarGridProps {
  cars: RentalCar[];
  loading: boolean;
}

const RentalCarGrid: React.FC<RentalCarGridProps> = ({ cars, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        <p className="ml-3 text-lg text-gray-600">Cargando autos de renta...</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-xl font-semibold mb-2">
          No se encontraron autos de renta.
        </p>
        <p>Intenta ajustar tus filtros de búsqueda o las fechas de alquiler.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
        >
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover object-center"
          />
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {car.make} {car.model}
            </h3>
            <p className="text-brand-primary font-bold text-2xl mb-2">
              ${car.dailyRate.toLocaleString("es-CR")}{" "}
              <span className="text-base text-gray-500 font-normal">/día</span>
            </p>
            <div className="text-sm text-gray-600 mb-3 space-y-1">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  Ubicación: <span className="font-medium">{car.location}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  Tipo: <span className="font-medium">{car.type}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  Asientos: <span className="font-medium">{car.seats}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Gauge className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  Transmisión:{" "}
                  <span className="font-medium">{car.transmission}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  Disponible:{" "}
                  {car.availability.map((a, idx) => (
                    <span key={idx} className="font-medium">
                      {a.startDate} a {a.endDate}
                      {idx < car.availability.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-3 line-clamp-3 flex-grow">
              Características: {car.features.join(", ")}. Límite:{" "}
              {car.mileageLimit}.
            </p>
            <div className="mt-auto pt-3 border-t border-gray-100">
              <button className="w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-dark transition-colors duration-200">
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalCarGrid;
