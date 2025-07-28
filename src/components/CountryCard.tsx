// components/CountryCard.tsx
import React from "react";
import { Link } from "react-router-dom"; // CAMBIO CLAVE: Importa Link de react-router-dom

interface CountryCardProps {
  name: string;
  flagUrl: string;
  code: string; // E.g., 'cr' for Costa Rica
  description: string;
  // Prop para la URL a la que navegará el usuario al seleccionar el país
  // Podría ser '/cr' o '/costa-rica' dependiendo de tu estrategia de enrutamiento
  countryHomePageUrl: string; // Ejemplo: '/cr'
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  flagUrl,
  description,
  countryHomePageUrl,
}) => {
  return (
    // CAMBIO CLAVE: Usa 'to' en lugar de 'href' y elimina 'passHref'
    <Link to={countryHomePageUrl}>
      <div
        className="
        block
        bg-white
        rounded-lg
        shadow-lg
        hover:shadow-xl
        transform
        hover:-translate-y-2
        transition-all
        duration-300
        cursor-pointer
        p-6
        text-center
        flex
        flex-col
        items-center
        justify-between
        h-full
        border border-gray-100
        hover:border-brand-primary
      "
      >
        <div className="flex-grow flex flex-col items-center justify-center">
          <img
            src={flagUrl}
            alt={`Bandera de ${name}`}
            className="w-24 h-auto mb-4 rounded-md shadow-md border border-gray-200"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        </div>
        <button
          className="
          mt-4
          w-full
          bg-brand-primary
          text-white
          py-3
          px-6
          rounded-lg
          font-semibold
          hover:bg-brand-dark
          transition-colors
          duration-300
          text-lg
        "
        >
          Seleccionar
        </button>
      </div>
    </Link>
  );
};

export default CountryCard;
