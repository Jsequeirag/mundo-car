import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingModalLockScreen from "@/components/Modals/LoadingModalLockScreen";
import routes from "@/routes/Routes";

import useCountryStore from "@/store/countryStore";
import loadingStore from "@/store/loadingScreenStore";
import { useApiGet } from "@/api/config/customHooks";
import { getCountries } from "@/api/urls/Country";
import CountrySelectorModal from "@/components/CountrySelectorModal/CountrySelectorModal";

const App = () => {
  const { setCountries } = useCountryStore();
  const {
    setLoading,
    setMessage,
    setCountryModalOpen,
    initialCheckDone,
    setInitialCheckDone,
  } = loadingStore();

  const { data, isSuccess, isPending, isError } = useApiGet(
    ["getCountries", true],
    () => getCountries(true),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // 🚀 Cargar países desde el backend
  useEffect(() => {
    setLoading(isPending);
    setMessage("Cargando países...");

    if (isSuccess && data) {
      setCountries(data);
      setLoading(false);
    }

    if (isError) {
      setLoading(false);
    }
  }, [data, isSuccess, isPending, isError, setCountries, setLoading]);

  // 🧠 Validar si hay país seleccionado en localStorage
  useEffect(() => {
    if (isSuccess && data && !initialCheckDone) {
      const savedCountry = localStorage.getItem("selectedCountry");
      if (!savedCountry) {
        console.log("[App] No hay país seleccionado → abrir modal.");
        setCountryModalOpen(true);
      } else {
        console.log("[App] País detectado en localStorage:", savedCountry);
      }
      setInitialCheckDone(true);
    }
  }, [
    isSuccess,
    data,
    initialCheckDone,
    setCountryModalOpen,
    setInitialCheckDone,
  ]);

  // ⏳ Mientras carga o valida
  if (isPending || !initialCheckDone) {
    return <LoadingModalLockScreen message="Cargando países..." />;
  }

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* 🪟 Modal translúcido minimalista */}
        <CountrySelectorModal countries={data || []} />

        <BrowserRouter>
          <ScrollToTop />
          <LoadingModalLockScreen />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
