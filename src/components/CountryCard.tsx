// components/CountryCard.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface CountryCardProps {
  name: string;
  flagUrl: string;
  code: string;
  description: string;
  countryHomePageUrl: string;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ name, flagUrl, code, description, countryHomePageUrl }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      localStorage.setItem("selectedCountryCode", code);
      navigate(countryHomePageUrl);
    };

    return (
      <div
        role="button"
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        tabIndex={0}
        aria-label={`Seleccionar ${name}`}
        className="
        bg-white rounded-lg shadow-lg hover:shadow-xl
        transform hover:-translate-y-2
        transition-all duration-300 cursor-pointer
        p-6 text-center flex flex-col
        items-center justify-between h-full
        border border-gray-100 hover:border-brand-primary
        focus:outline-none focus:ring-2 focus:ring-brand-primary
      "
      >
        <div className="flex-grow flex flex-col items-center justify-center">
          <img
            src={flagUrl}
            alt={`Bandera de ${name}`}
            width={96}
            height={64}
            loading="lazy"
            decoding="async"
            className="w-24 h-auto mb-4 rounded-md shadow-md border border-gray-200"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        </div>
        <div
          className="
          mt-4 w-full bg-brand-primary text-white
          py-3 px-6 rounded-lg font-semibold
          hover:bg-brand-dark transition-colors duration-300
          text-lg
        "
        >
          Seleccionar
        </div>
      </div>
    );
  }
);

export default CountryCard;
