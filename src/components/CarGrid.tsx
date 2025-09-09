import React from "react";
import CarCard from "./CarCard";
import { Car } from "@/data/mockUsedCars";

interface CarGridProps {
  cars: Car[];
  loading?: boolean;
}

const CarGrid: React.FC<CarGridProps> = ({ cars, loading }) => {
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

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-brand-primary/10 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <img
            src="/assets/car_icon_search.png"
            alt="No cars"
            className="h-12 w-12 text-brand-primary"
          />
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
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          highlighted={car.highlighted || false}
        />
      ))}
    </div>
  );
};

export default CarGrid;
