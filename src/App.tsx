import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Añadido Navigate
import { ThemeProvider } from "@/components/theme-provider";

// Importa los componentes de las páginas
import Index from "./pages/Index"; // Ahora es tu componente de redirección
import CountrySelectionPage from "./pages/CountrySelectionPage";
import HomePage from "./pages/HomePage";
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
import AutoLotsPage from "./pages/AutoLotsPage";
import CarImageUploadAndDrag from "./pages/CarImageUploadAndDrag";
import AutoDetailsPage from "./pages/AutoDetailsPage";
import NewAutoDetailPage from "./pages/NewAutoDetailPage";
import AutoBrandPage from "./pages/AutoBrandPage";
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
            {/* Ruta inicial que redirige a /hr */}
            <Route path="/" element={<Navigate to="/hr" replace />} />
            <Route path="/select-country" element={<CountrySelectionPage />} />
            {/* Ruta para la página de selección de país */}
            <Route
              path="/:countryCode/cars/:carId"
              element={<CarDetailsPage />}
            />
            {/* Rutas parametrizadas por el código del país */}
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
            <Route
              path="/:countryCode/CarImageUploadAndDrag"
              element={<CarImageUploadAndDrag />}
            />
            <Route path="/:countryCode/inicio" element={<LoginPage />} />
            <Route path="/:countryCode/registro" element={<RegisterPage />} />
            <Route
              path="/:countryCode/autolote/:id"
              element={<AutoLotsPage />}
            />
            <Route
              path="/:countryCode/autoDetailsPage"
              element={<AutoDetailsPage />}
            />{" "}
            <Route
              path="/:countryCode/newAutoDetailsPage"
              element={<NewAutoDetailPage />}
            />{" "}
            <Route
              path="/:countryCode/autoBrandPage"
              element={<AutoBrandPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
