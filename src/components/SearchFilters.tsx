import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Car, MapPin, Package, Droplets } from "lucide-react"; // Importa los íconos de categoría

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [priceRange, setPriceRange] = React.useState([0, 100000]);
  const [yearRange, setYearRange] = React.useState([2010, 2024]);
  const [department, setDepartment] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>(""); // Estado para la categoría

  // Define las opciones de categoría
  const categoryOptions = [
    { label: "Autos nuevos", value: "new_cars", icon: Car },
    { label: "Autos usados", value: "used_cars", icon: Car },
    { label: "Renta de autos", value: "car_rental", icon: MapPin },
    { label: "Autorepuestos", value: "auto_parts", icon: Package },
    { label: "Lubicentros", value: "lubricenters", icon: Droplets },
  ];

  // Función de búsqueda para incluir todos los filtros
  const handleSearchClick = () => {
    onSearch({
      searchTerm,
      priceRange,
      yearRange,
      department,
      category,
    });
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r bg-brand-primary  text-white p-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Filter className="h-6 w-6 " />
          <p className="text-white"> Filtros de Búsqueda</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Barra de Búsqueda General */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar autos, marcas, modelos, palabras clave..."
            className="pl-10 py-2 border-gray-300 focus:border-brand-primary focus:ring-brand-primary focus:ring-2 focus:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CAMPO DE SELECCIÓN PARA CATEGORÍA */}
          <div>
            <Label
              htmlFor="category"
              className="text-gray-700 font-medium mb-1 block"
            >
              Categoría
            </Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquier Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => {
                  const CategoryIcon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4 text-gray-600" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {/* FIN DEL CAMPO DE SELECCIÓN */}

          <div>
            <Label
              htmlFor="make"
              className="text-gray-700 font-medium mb-1 block"
            >
              Marca
            </Label>
            <Select>
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquier Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
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
            <Input
              placeholder="Cualquier Modelo"
              className="focus:border-brand-primary focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors"
            />
          </div>
          <div>
            <Label
              htmlFor="department"
              className="text-gray-700 font-medium mb-1 block"
            >
              Departamento
            </Label>
            <Select onValueChange={setDepartment} value={department}>
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 border-gray-300 hover:border-brand-primary transition-colors">
                <SelectValue placeholder="Cualquier Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="san_jose">San José</SelectItem>
                <SelectItem value="alajuela">Alajuela</SelectItem>
                <SelectItem value="cartago">Cartago</SelectItem>
                <SelectItem value="heredia">Heredia</SelectItem>
                <SelectItem value="guanacaste">Guanacaste</SelectItem>
                <SelectItem value="puntarenas">Puntarenas</SelectItem>
                <SelectItem value="limon">Limón</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        <Button
          onClick={handleSearchClick}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        >
          <Search className="h-5 w-5 mr-2" />
          Buscar
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
