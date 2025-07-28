import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
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
            <Route path="/" element={<Index />} />
            <Route path="/autos-nuevos" element={<NewCarsPage />} />
            <Route path="/autos-usados" element={<UsedCarsPage />} />
            <Route path="/repuestos" element={<AutoPartsPage />} />{" "}
            <Route path="/lubricentros" element={<LubricentrosPage />} />{" "}
            <Route path="/renta" element={<RentalCarsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
