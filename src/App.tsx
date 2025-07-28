import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Asegúrate de que las importaciones estén bien
import { ThemeProvider } from "@/components/theme-provider";

// Importa los componentes de las páginas
import Index from "./pages/Index"; // Ahora es tu componente de redirección
import CountrySelectionPage from "./pages/CountrySelectionPage"; // La nueva página de selección
import HomePage from "./pages/HomePage"; // La página de inicio principal por país
import NewCarsPage from "./pages/NewCarsPage";
import UsedCarsPage from "./pages/UsedCarsPage";
import AutoPartsPage from "./pages/AutoPartsPage";
import LubricentrosPage from "./pages/LubricentrosPage";
import RentalCarsPage from "./pages/RentalCarsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Ruta inicial que maneja la redirección */}
            <Route path="/" element={<Index />} />

            {/* Ruta para la página de selección de país */}
            <Route path="/select-country" element={<CountrySelectionPage />} />

            {/* Rutas parametrizadas por el código del país */}
            {/* Todas estas rutas recibirán 'countryCode' como parámetro */}
            <Route path="/:countryCode" element={<HomePage />} />
            <Route
              path="/:countryCode/autos-nuevos"
              element={<NewCarsPage />}
            />
            <Route
              path="/:countryCode/autos-usados"
              element={<UsedCarsPage />}
            />
            <Route path="/:countryCode/repuestos" element={<AutoPartsPage />} />
            <Route
              path="/:countryCode/lubricentros"
              element={<LubricentrosPage />}
            />
            <Route path="/:countryCode/renta" element={<RentalCarsPage />} />

            {/* Agrega aquí cualquier otra ruta que necesite ser específica por país, como '/:countryCode/publicar' */}
            {/* Por ejemplo: <Route path="/:countryCode/publicar" element={<PublishCarPage />} /> */}

            {/* Ruta para el 404 (manejar rutas no encontradas) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
