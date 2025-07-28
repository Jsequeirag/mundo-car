// src/pages/Index.tsx (Tu antiguo Index.tsx se convierte en esto)
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si ya hay un país seleccionado en localStorage
    const selectedCountryCode = localStorage.getItem("selectedCountryCode");

    if (selectedCountryCode) {
      // Si hay un país, redirigir a la homepage de ese país
      navigate(`/${selectedCountryCode}`, { replace: true });
    } else {
      // Si no hay país, redirigir a la página de selección de país
      navigate("/select-country", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-700">Cargando experiencia...</p>
      {/* Puedes añadir un spinner o un logo aquí */}
    </div>
  );
};

export default Index;
