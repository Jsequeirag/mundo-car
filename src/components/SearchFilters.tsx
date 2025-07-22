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
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [priceRange, setPriceRange] = React.useState([0, 100000]);
  const [yearRange, setYearRange] = React.useState([2010, 2024]);
  const [department, setDepartment] = React.useState<string>("");

  return (
    // CAMBIOS CLAVE AQUÍ:
    // Fondo de la Card: Blanco o gris muy claro para un look limpio y moderno.
    // Borde de la Card: Un tono de gris más oscuro o incluso tu brand-primary para un borde sutil pero marcado.
    <Card className="bg-white border border-gray-200 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
          {/* Ícono de filtro: Usa tu brand-primary para destacarlo */}
          <Filter className="h-5 w-5 text-brand-primary" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="make">Make</Label>
            <Select>
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2">
                {" "}
                {/* Ajustes de focus */}
                <SelectValue placeholder="Any Make" />
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
            <Label htmlFor="model">Model</Label>
            <Input
              placeholder="Any Model"
              className="focus:border-brand-primary focus:ring-brand-primary focus:ring-2 focus:ring-offset-2" // Ajustes de focus
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={setDepartment} value={department}>
              <SelectTrigger className="focus:ring-brand-primary focus:ring-2 focus:ring-offset-2">
                {" "}
                {/* Ajustes de focus */}
                <SelectValue placeholder="Any Department" />
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
          <Label>
            Price Range: ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            min={0}
            step={1000}
            className="mt-2"
            // Estilizar el track y el thumb del slider con brand-primary
            // Estas clases podrían necesitar ser ajustadas dependiendo de la implementación específica de tu componente Slider
            // Algunos sliders como los de shadcn/ui ya manejan esto con sus propias clases de color 'primary'
            // Si el slider es de shadcn/ui, 'bg-primary' dentro de las clases de su track ya usaría tu color si mapeas 'primary' a 'brand-primary' en tailwind.config
            // Por simplicidad, asumimos que 'primary' en shadcn/ui es tu brand-primary
            // Si no, tendrías que ver la implementación de tu Slider para inyectar estas clases
            // Por ejemplo: track-background: bg-brand-primary, thumb-color: bg-brand-primary
          />
        </div>

        <div>
          <Label>
            Year Range: {yearRange[0]} - {yearRange[1]}
          </Label>
          <Slider
            value={yearRange}
            onValueChange={setYearRange}
            max={2024}
            min={1990}
            step={1}
            className="mt-2"
            // Ver notas sobre el Slider de arriba.
          />
        </div>

        {/* Botón de búsqueda: Aplicar tu brand-primary directamente */}
        <Button
          onClick={() => onSearch({ priceRange, yearRange, department })}
          // Usamos bg-brand-primary para el fondo del botón
          // Y un color ligeramente más oscuro o una opacidad reducida para el hover
          className="w-full bg-brand-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Cars
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
