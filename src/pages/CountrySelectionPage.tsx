// src/pages/CountrySelectionPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountryCard from "../components/CountryCard"; // Ajusta la ruta si es necesario
import { centralAmericaCountries } from "../data/centralAmericaCountries"; // Ajusta la ruta si es necesario

const CountrySelectionPage: React.FC = () => {
  const navigate = useNavigate();

  // Opcional: Si el usuario llega directamente a /select-country pero ya tiene un país guardado, redirigirlo.
  useEffect(() => {
    const selectedCountryCode = localStorage.getItem("selectedCountryCode");
    if (selectedCountryCode) {
      navigate(`/${selectedCountryCode}`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-4 animate-fade-in-down">
          Bienvenido a la MUNDOCAR
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 animate-fade-in-down delay-100">
          Por favor, selecciona tu país para continuar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up delay-200">
          {centralAmericaCountries.map((country) => (
            <CountryCard
              key={country.code}
              name={country.name}
              flagUrl={country.flagUrl}
              code={country.code}
              description={country.description}
              countryHomePageUrl={country.homePageUrl} // Ej: '/cr'
            />
          ))}
        </div>

        <p className="mt-12 text-gray-500 text-sm animate-fade-in-up delay-300">
          Tu experiencia automotriz personalizada te espera.
        </p>
      </div>
    </div>
  );
};

export default CountrySelectionPage;
