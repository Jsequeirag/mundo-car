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
import Car360CaptureGuide from "./pages/Car360CaptureGuide";
import CarDetailsPage from "./pages/CarDetailsPage";
import PublishCarPage from "./pages/PublishCarPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarImageUploadAndDrag from "./pages/CarImageUploadAndDrag";
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
            <Route path="/select-country" element={<CountrySelectionPage />} />
            {/* Ruta para la página de selección de país */}
            <Route path="/cars/:carId" element={<CarDetailsPage />} />

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
            <Route path="/publicar/360" element={<Car360CaptureGuide />} />
            <Route path="/:countryCode/publicar" element={<PublishCarPage />} />

            {/*  <Route path="/:countryCode/login" element={<LoginPage />} />*/}
            <Route
              path="/:countryCode/CarImageUploadAndDrag"
              element={<CarImageUploadAndDrag />}
            />
            <Route path="/:countryCode/inicio" element={<LoginPage />} />
            <Route path="/:countryCode/registro" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
