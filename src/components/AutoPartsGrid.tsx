// components/AutoPartsGrid.tsx
import React from "react";
import { AutoPart } from "@/data/mockAutoParts";
import { Loader2 } from "lucide-react"; // Para el icono de carga

interface AutoPartsGridProps {
  parts: AutoPart[];
  loading: boolean;
}

const AutoPartsGrid: React.FC<AutoPartsGridProps> = ({ parts, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        <p className="ml-3 text-lg text-gray-600">Cargando repuestos...</p>
      </div>
    );
  }

  if (parts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-xl font-semibold mb-2">
          No se encontraron repuestos.
        </p>
        <p>Intenta ajustar tus filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {parts.map((part) => (
        <div
          key={part.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          <img
            src={part.imageUrl}
            alt={part.name}
            className="w-full h-48 object-cover object-center"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
              {part.name}
            </h3>
            <p className="text-brand-primary font-bold text-xl mb-2">
              ${part.price.toLocaleString("es-CR")}
            </p>
            <div className="text-sm text-gray-600 mb-2">
              <p>
                Categoría: <span className="font-medium">{part.category}</span>
              </p>
              <p>
                Condición:{" "}
                <span className="font-medium capitalize">{part.condition}</span>
              </p>
              {part.vehicleMake && part.vehicleMake.length > 0 && (
                <p>
                  Compatible con:{" "}
                  <span className="font-medium">
                    {part.vehicleMake.join(", ")}
                    {part.vehicleModel.length > 0 &&
                      ` (${part.vehicleModel.join(", ")})`}
                  </span>
                </p>
              )}
              {part.yearCompatibility && (
                <p>
                  Años:{" "}
                  <span className="font-medium">
                    {part.yearCompatibility[0]} - {part.yearCompatibility[1]}
                  </span>
                </p>
              )}
            </div>
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
              {part.description}
            </p>
            <button className="w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-dark transition-colors duration-200">
              Ver Detalle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AutoPartsGrid;
