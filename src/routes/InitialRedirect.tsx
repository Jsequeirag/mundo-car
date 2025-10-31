import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import loadingStore from "@/store/loadingScreenStore";

const InitialRedirect: React.FC = () => {
  const savedCountry = localStorage.getItem("selectedCountry");
  const { setCountryModalOpen } = loadingStore();

  useEffect(() => {
    if (!savedCountry) {
      console.log("[InitialRedirect] No hay país seleccionado → abrir modal");
      setCountryModalOpen(true);
    }
  }, [savedCountry, setCountryModalOpen]);

  // Si ya hay país → redirigir
  if (savedCountry) {
    return <Navigate to={`/${savedCountry.toLowerCase()}`} replace />;
  }

  // Si no hay país → no redirigir, solo mostrar la app base
  return <Navigate to={`/`} replace />;
};

export default InitialRedirect;
