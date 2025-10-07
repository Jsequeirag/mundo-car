import React from "react";
import CarCard from "./CarCard";
import { Car } from "lucide-react";
import { IVehicle } from "@/interfaces/IVehicle";
import useVehicleStore from "@/store/vehicleStore";

const CarGrid: React.FC = () => {
  const { vehicles, loading } = useVehicleStore();
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-80"></div>
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-brand-primary/10 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <Car className="h-12 w-12 text-brand-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No cars found
        </h3>
        <p className="text-gray-500">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <CarCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default CarGrid;
