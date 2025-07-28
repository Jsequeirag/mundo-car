// components/LubricentrosGrid.tsx
import React from "react";
import { Lubricentro } from "@/data/mockLubricentros";
import { Loader2, MapPin, Phone, Clock, Star } from "lucide-react"; // Iconos adicionales

interface LubricentrosGridProps {
  lubricentros: Lubricentro[];
  loading: boolean;
}

const LubricentrosGrid: React.FC<LubricentrosGridProps> = ({
  lubricentros,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        <p className="ml-3 text-lg text-gray-600">Cargando lubricentros...</p>
      </div>
    );
  }

  if (lubricentros.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-xl font-semibold mb-2">
          No se encontraron lubricentros.
        </p>
        <p>Intenta ajustar tus filtros de búsqueda o cambia la ubicación.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lubricentros.map((lubricentro) => (
        <div
          key={lubricentro.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
        >
          <img
            src={lubricentro.imageUrl}
            alt={lubricentro.name}
            className="w-full h-48 object-cover object-center"
          />
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {lubricentro.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 text-brand-primary" />
              <span>
                {lubricentro.address}, {lubricentro.city},{" "}
                {lubricentro.province}
              </span>
            </div>
            {lubricentro.rating && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{lubricentro.rating.toFixed(1)} de 5</span>
              </div>
            )}
            <p className="text-gray-700 text-sm mb-3 line-clamp-2 flex-grow">
              {lubricentro.description}
            </p>
            <div className="text-sm text-gray-700 mb-3 space-y-1">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{lubricentro.phone}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{lubricentro.hours}</span>
              </div>
              <p className="font-semibold mt-2">Servicios:</p>
              <ul className="list-disc list-inside text-xs text-gray-600">
                {lubricentro.services.slice(0, 3).map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
                {lubricentro.services.length > 3 && <li>y más...</li>}
              </ul>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 flex gap-2">
              <button className="flex-1 bg-brand-primary text-white py-2 rounded-md hover:bg-brand-dark transition-colors duration-200">
                Ver Detalles
              </button>
              {lubricentro.locationUrl && (
                <a
                  href={lubricentro.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  <MapPin className="h-5 w-5 mr-1" /> Mapa
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LubricentrosGrid;
