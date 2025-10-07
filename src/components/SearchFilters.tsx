import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Droplets, Joystick } from "lucide-react";
import { hondurasDepartment } from "@/data/hondurasDepartment";
import { useApiSend } from "../api/config/customHooks";
import { getVehiclesByFeatures } from "../api/urls/vehicle";
import useVehicleStore from "@/store/vehicleStore";

interface SearchFiltersProps {
  onSearch?: (filters: {
    priceRange?: [number, number];
    yearRange?: [number, number];
    department?: string;
    brand?: string;
    model?: string;
    transmission?: string;
    fuel?: string;
    condition?: string;
  }) => void;
  condition: "used" | "new" | "rental";
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  condition,
}) => {
  const { setVehicles } = useVehicleStore();
  const [filters, setFilters] = React.useState({
    priceRange: [0, 100000] as [number, number],
    yearRange: [2010, 2024] as [number, number],
    department: "any",
    brand: "any",
    model: "Cualquiera",
    transmission: "any",
    fuel: "any",
    condition,
  });

  const transmissionOptions = [
    { label: "Cualquiera", value: "any" },
    { label: "Manual", value: "manual" },
    { label: "Automático", value: "automatic" },
  ];

  const combustionOptions = [
    { label: "Cualquiera", value: "any" },
    { label: "Gasolina", value: "gasoline" },
    { label: "Diesel", value: "diesel" },
    { label: "Eléctrico", value: "electric" },
    { label: "Híbrido", value: "hybrid" },
  ];

  const modelsByBrand = {
    any: ["Cualquiera"],
    toyota: ["Corolla", "Yaris"],
    honda: ["Civic", "Accord"],
    nissan: ["Sentra"],
  };

  const filteredModels = modelsByBrand[filters.brand] || ["Cualquiera"];

  const { mutate: fetchVehicles, isPending: loading } = useApiSend(
    (filters: typeof filters) =>
      getVehiclesByFeatures({
        priceRange: filters.priceRange,
        yearRange: filters.yearRange,
        department:
          filters.department === "any" ? undefined : filters.department,
        brand: filters.brand === "any" ? undefined : filters.brand,
        model: filters.model === "Cualquiera" ? undefined : filters.model,
        transmission:
          filters.transmission === "any" ? undefined : filters.transmission,
        fuel: filters.fuel === "any" ? undefined : filters.fuel,
        condition: filters.condition,
      }),
    (data: any[]) => {
      setVehicles(data);
      onSearch?.(filters);
    },
    (error: any) => console.error("Error fetching vehicles:", error),
    ["getVehiclesByFeatures"]
  );

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearchClick = () => {
    fetchVehicles(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 100000] as [number, number],
      yearRange: [2010, 2024] as [number, number],
      department: "any",
      brand: "any",
      model: "Cualquiera",
      transmission: "any",
      fuel: "any",
      condition,
    };
    setFilters(clearedFilters);
    onSearch?.(clearedFilters);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white p-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Filter className="h-6 w-6" />
          Filtros de Búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="brand"
              className="text-gray-700 font-medium mb-1 block"
            >
              Marca
            </Label>
            <Select
              onValueChange={(value) => handleFilterChange("brand", value)}
              value={filters.brand}
            >
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Cualquiera</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="model"
              className="text-gray-700 font-medium mb-1 block"
            >
              Modelo
            </Label>
            <Select
              onValueChange={(value) => handleFilterChange("model", value)}
              value={filters.model}
            >
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                {filteredModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="transmission"
              className="text-gray-700 font-medium mb-1 block"
            >
              Transmisión
            </Label>
            <Select
              onValueChange={(value) =>
                handleFilterChange("transmission", value)
              }
              value={filters.transmission}
            >
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                {transmissionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.value === "any" ? null : (
                        <Joystick className="h-5 w-5" />
                      )}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="fuel"
              className="text-gray-700 font-medium mb-1 block"
            >
              Combustión
            </Label>
            <Select
              onValueChange={(value) => handleFilterChange("fuel", value)}
              value={filters.fuel}
            >
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                {combustionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.value === "any" ? null : (
                        <Droplets className="h-5 w-5" />
                      )}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="department"
              className="text-gray-700 font-medium mb-1 block"
            >
              Ubicación
            </Label>
            <Select
              onValueChange={(value) => handleFilterChange("department", value)}
              value={filters.department}
            >
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Cualquiera</SelectItem>
                {hondurasDepartment.map((municipality) => (
                  <SelectItem
                    key={municipality}
                    value={municipality.toLowerCase()}
                  >
                    {municipality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium mb-1 block">
            Rango de Precio: ${filters.priceRange[0].toLocaleString()} - $
            {filters.priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
            max={100000}
            min={0}
            step={1000}
            className="mt-3"
          />
        </div>

        <div>
          <Label className="text-gray-700 font-medium mb-1 block">
            Rango de Año: {filters.yearRange[0]} - {filters.yearRange[1]}
          </Label>
          <Slider
            value={filters.yearRange}
            onValueChange={(value) => handleFilterChange("yearRange", value)}
            max={2024}
            min={1990}
            step={1}
            className="mt-3"
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleSearchClick}
            disabled={loading}
            className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg disabled:opacity-50"
          >
            <Search className="h-5 w-5 mr-2" />
            Buscar
          </Button>
          <Button
            onClick={handleClearFilters}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
          >
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
