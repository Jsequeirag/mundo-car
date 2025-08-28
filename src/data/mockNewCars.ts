export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;

  location: string;
  image: string;
  condition: string;
  description?: string;
  highlighted?: boolean; // Added highlighted prop
}

export const mockNewCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28500,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    condition: "Nuevo",
    description: "Well-maintained Toyota Camry with low mileage",
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 24900,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    condition: "Nuevo",
    description: "Reliable Honda Civic, perfect for daily commuting",
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 65000,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    condition: "Nuevo",
    description: "Luxury BMW X5 with premium features",
  },
  {
    id: "4",
    make: "Ford",
    model: "Mustang",
    year: 2020,
    price: 32000,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    condition: "Nuevo",
    description: "Classic Ford Mustang with powerful V8 engine",
  },
  {
    id: "5",
    make: "Mercedes",
    model: "C-Class",
    year: 2022,
    price: 45000,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    condition: "nuevo",
    description: "Elegant Mercedes C-Class with luxury interior",
  },
  {
    id: "6",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42000,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    condition: "Nuevo",
    description: "Electric Tesla Model 3 with autopilot features",
  },
  {
    id: "7",
    make: "Toyota",
    model: "Corolla",
    year: 2024,
    price: 28000,

    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    description:
      "Toyota Corolla 2024, totalmente nuevo, con tecnología de punta y máxima eficiencia.",
    condition: "nuevo",
  },
  {
    id: "8", // Changed from "2" to avoid duplicate ID
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 25000,

    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    description:
      "Honda Civic 2023, en excelente estado, único dueño y bajo kilometraje.",
    condition: "Nuevo",
  },
  {
    id: "9", // Changed from "3" to avoid duplicate ID
    make: "Nissan",
    model: "Kicks",
    year: 2024,
    price: 27500,

    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    description:
      "Nissan Kicks 2024, SUV compacto y versátil, ideal para la ciudad y carretera.",
    condition: "nuevo",
  },
  {
    id: "10", // Changed from "2" to avoid duplicate ID
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 25000,

    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    description:
      "Honda Civic 2023, en excelente estado, único dueño y bajo kilometraje.",
    condition: "nuevo",
  },
  {
    id: "11", // Changed from "5" to avoid duplicate ID
    make: "Mercedes",
    model: "C-Class",
    year: 2022,
    price: 45000,

    location: "Boulevard Morazán, Tegucigalpa, Honduras",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    condition: "nuevo",
    description: "Elegant Mercedes C-Class with luxury interior",
  },
];
