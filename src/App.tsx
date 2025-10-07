import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import Loading from "@/components/Modals/LoadingModalLockScreen";
import routes from "./routes/Routes";
import useCountryStore from "@/store/countryStore";
import loadingScreenStore from "@/store/loadingScreenStore";
import { useApiGet } from "./api/config/customHooks";
import { getCountries } from "@/api/urls/Country";

const App = () => {
  const { setCountries } = useCountryStore();
  const { setLoading, setMessage } = loadingScreenStore();
  const { data, isSuccess, isPending, isError } = useApiGet(
    ["getCountries", true],
    () => getCountries(true),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    console.log("[App] Iniciando carga de países...");
    setLoading(isPending);
    setMessage("Cargando");
    if (isSuccess && data) {
      setCountries(data);
      console.log("[App] Países cargados en el store:", data);
    }

    if (isError) {
      console.error("[App] Error al cargar países");
      setLoading(false);
    }
  }, [data, isSuccess, isPending, isError, setCountries, setLoading]);

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Loading />
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
