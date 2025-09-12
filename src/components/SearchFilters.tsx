import React, { useState } from "react";
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
import {
  Search,
  Filter,
  Car,
  MapPin,
  Package,
  Droplets,
  Info,
  Joystick,
} from "lucide-react";
import { hondurasDepartment } from "@/data/hondurasDepartment";

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  initialCategory?: string;
  disableCategory?: boolean;
  disableMunicipality?: boolean;
  lockCategory?: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  initialCategory = "any",
  disableCategory = false,
  disableMunicipality = false,
  lockCategory = false,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [priceRange, setPriceRange] = React.useState([0, 100000]);
  const [yearRange, setYearRange] = React.useState([2010, 2024]);
  const [department, setDepartment] = React.useState<string>("any");
  const [category, setCategory] = React.useState<string>(initialCategory);
  const [service, setService] = React.useState<string>("any");
  const [make, setMake] = React.useState<string>("any");
  const [modelFilter, setModelFilter] = useState<string>("Cualquiera");
  const [transmission, setTransmission] = useState<string>("any");
  const [combustion, setCombustion] = useState<string>("any");

  // Define las opciones de categoría
  const categoryOptions = [
    { label: "Seleccionar una opción", value: "any", icon: null },
    { label: "Autos nuevos", value: "new_cars", icon: Car },
    { label: "Autos usados", value: "used_cars", icon: Car },
    { label: "Renta de autos", value: "car_rental", icon: MapPin },
    { label: "Autorepuestos", value: "auto_parts", icon: Package },
  ];

  // Opciones de nombres comerciales para Lubricentros y Autorepuestos
  const serviceOptions = {
    auto_parts: [
      { label: "Cualquiera", value: "any" },
      { label: "AutoZone", value: "autozone" },
      { label: "NAPA", value: "napa" },
      { label: "Pep Boys", value: "pep_boys" },
    ],
    lubricenters: [
      { label: "Cualquiera", value: "any" },
      { label: "Lubri Chávez", value: "lubri_chavez" },
      { label: "Castrol Service", value: "castrol_service" },
      { label: "Valvoline Instant Oil Change", value: "valvoline" },
    ],
  };

  // Opciones para Transmisión
  const transmissionOptions = [
    { label: "Cualquiera", value: "any" },
    { label: "Manual", value: "manual" },
    { label: "Automático", value: "automatic" },
  ];

  // Opciones para Combustión
  const combustionOptions = [
    { label: "Cualquiera", value: "any" },
    { label: "Gasolina", value: "gasoline" },
    { label: "Diesel", value: "diesel" },
    { label: "Eléctrico", value: "electric" },
    { label: "Híbrido", value: "hybrid" },
  ];

  // Modelos por marca
  const modelsByMake = {
    any: ["Cualquiera"],
    toyota: ["Camry", "Corolla", "RAV4", "Prius"],
    honda: ["Civic", "Accord", "CR-V", "Pilot"],
    ford: ["Mustang", "F-150", "Escape", "Explorer"],
    bmw: ["X5", "3 Series", "5 Series", "7 Series"],
    mercedes: ["C-Class", "E-Class", "S-Class", "GLC"],
  };

  // Filtrar modelos según la marca seleccionada
  const filteredModels = make === "any" ? ["Cualquiera"] : modelsByMake[make];

  // Determinar si mostrar campos de marca/modelo/transmisión/combustión o servicio
  const showBrandAndModel =
    category === "new_cars" ||
    category === "used_cars" ||
    category === "car_rental";
  const showService = category === "auto_parts" || category === "lubricenters";

  // Mensaje si no hay modelos disponibles para la marca
  const noModelsMessage =
    showBrandAndModel && make !== "any" && filteredModels.length === 1 ? (
      <p className="text-gray-500 text-sm mt-1">
        No hay modelos disponibles para esta marca.
      </p>
    ) : null;

  // Función de búsqueda para incluir todos los filtros
  const handleSearchClick = () => {
    onSearch({
      searchTerm,
      priceRange,
      yearRange,
      department: department === "any" ? undefined : department,
      category: category === "any" ? undefined : category,
      service:
        category === "auto_parts" || category === "lubricenters"
          ? service === "any"
            ? undefined
            : service
          : undefined,
      make: make === "any" ? undefined : make,
      model: modelFilter === "Cualquiera" ? undefined : modelFilter,
      transmission: transmission === "any" ? undefined : transmission,
      combustion: combustion === "any" ? undefined : combustion,
    });
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 100000]);
    setYearRange([2010, 2024]);
    setDepartment("any");
    setCategory("any");
    setService("any");
    setMake("any");
    setModelFilter("Cualquiera");
    setTransmission("any");
    setCombustion("any");
  };

  // Validación para habilitar/deshabilitar el botón Buscar
  const isSearchDisabled = category === "any";

  // Mensaje de obligatoriedad con ícono de información
  const categoryRequiredMessage = isSearchDisabled ? (
    <p className="text-blue-400 text-sm mt-1 flex items-center">
      <Info className="h-4 w-4 mr-1" />
      Por favor, selecciona una categoría.
    </p>
  ) : null;

  return (
    <Card className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white p-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Filter className="h-6 w-6" />
          <p className="text-white">Filtros de Búsqueda</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CAMPO DE SELECCIÓN PARA MARCA */}
          {showBrandAndModel && (
            <div>
              <Label
                htmlFor="make"
                className="text-gray-700 font-medium mb-1 block"
              >
                Marca
              </Label>
              <Select onValueChange={setMake} value={make}>
                <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Cualquiera</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* CAMPO DE SELECCIÓN PARA MODELO */}
          {showBrandAndModel && (
            <div>
              <Label
                htmlFor="model"
                className="text-gray-700 font-medium mb-1 block"
              >
                Modelo
              </Label>
              <Select onValueChange={setModelFilter} value={modelFilter}>
                <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cualquiera">Cualquiera</SelectItem>
                  {filteredModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {noModelsMessage}
            </div>
          )}

          {/* CAMPO DE SELECCIÓN PARA TRANSMISIÓN */}
          {showBrandAndModel && (
            <div>
              <Label
                htmlFor="transmission"
                className="text-gray-700 font-medium mb-1 block"
              >
                Transmisión
              </Label>
              <Select onValueChange={setTransmission} value={transmission}>
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
          )}

          {/* CAMPO DE SELECCIÓN PARA COMBUSTIÓN */}
          {showBrandAndModel && (
            <div>
              <Label
                htmlFor="combustion"
                className="text-gray-700 font-medium mb-1 block"
              >
                Combustión
              </Label>
              <Select onValueChange={setCombustion} value={combustion}>
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
          )}

          {/* CAMPO DE SELECCIÓN PARA SERVICIOS */}
          {showService && (
            <div>
              <Label
                htmlFor="service"
                className="text-gray-700 font-medium mb-1 block"
              >
                Servicio
              </Label>
              <Select onValueChange={setService} value={service}>
                <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions[category].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* CAMPO DE SELECCIÓN PARA DEPARTAMENTO */}
          {!disableMunicipality && (
            <div>
              <Label
                htmlFor="department"
                className="text-gray-700 font-medium mb-1 block"
              >
                Departamento
              </Label>
              <Select onValueChange={setDepartment} value={department}>
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
          )}
        </div>

        <div>
          <Label className="text-gray-700 font-medium mb-1 block">
            Rango de Precio: ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            min={0}
            step={1000}
            className="mt-3"
          />
        </div>

        <div>
          <Label className="text-gray-700 font-medium mb-1 block">
            Rango de Año: {yearRange[0]} - {yearRange[1]}
          </Label>
          <Slider
            value={yearRange}
            onValueChange={setYearRange}
            max={2024}
            min={1990}
            step={1}
            className="mt-3"
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleSearchClick}
            className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            disabled={disableCategory ? false : isSearchDisabled}
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
