// data/mockRentalCars.ts

export interface RentalCar {
  id: string;
  make: string;
  model: string;
  year: number;
  type: "Sedan" | "SUV" | "Compact" | "Luxury" | "Van"; // Tipo de vehículo de renta
  transmission: "Automatic" | "Manual";
  fuelType: "Gasoline" | "Electric" | "Hybrid";
  seats: number;
  dailyRate: number; // Tarifa por día
  mileageLimit?: string; // Límite de kilometraje, e.g., "Kilometraje ilimitado" o "200 km/día"
  features: string[]; // E.g., ["AC", "GPS", "Bluetooth", "Asientos de cuero"]
  imageUrl: string;
  location: string; // Ubicación de recogida/devolución (ciudad/provincia)
  availability: {
    startDate: string; // Formato 'YYYY-MM-DD'
    endDate: string; // Formato 'YYYY-MM-DD'
  }[]; // Rangos de fechas disponibles
  company: {
    name: string;
    phone: string;
    address: string;
  };
}

export const mockRentalCars: RentalCar[] = [
  {
    id: "rc1",
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    type: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    dailyRate: 45.0,
    mileageLimit: "Kilometraje ilimitado",
    features: ["AC", "Bluetooth", "Apple CarPlay"],
    imageUrl: "/assets/rental-corolla.jpg", // Asegúrate de tener una imagen
    location: "San José",
    availability: [{ startDate: "2025-08-01", endDate: "2025-08-31" }],
    company: {
      name: "RentaCar Express",
      phone: "2222-1111",
      address: "Aeropuerto SJO",
    },
  },
  {
    id: "rc2",
    make: "Hyundai",
    model: "Tucson",
    year: 2022,
    type: "SUV",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    dailyRate: 60.0,
    mileageLimit: "Kilometraje ilimitado",
    features: ["AC", "GPS", "Cámara de reversa"],
    imageUrl: "/assets/rental-tucson.jpg",
    location: "Alajuela",
    availability: [{ startDate: "2025-08-05", endDate: "2025-09-15" }],
    company: {
      name: "Viaja Fácil Rent A Car",
      phone: "2444-5555",
      address: "Centro Alajuela",
    },
  },
  {
    id: "rc3",
    make: "Nissan",
    model: "Versa",
    year: 2024,
    type: "Compact",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    dailyRate: 40.0,
    mileageLimit: "300 km/día",
    features: ["AC", "Bluetooth"],
    imageUrl: "/assets/rental-versa.jpg",
    location: "Heredia",
    availability: [{ startDate: "2025-08-10", endDate: "2025-09-10" }],
    company: {
      name: "CR Wheels",
      phone: "2260-9988",
      address: "Heredia Centro",
    },
  },
  {
    id: "rc4",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    type: "Luxury",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    dailyRate: 150.0,
    mileageLimit: "200 km/día",
    features: ["Asientos de cuero", "Sonido Premium", "Techo panorámico"],
    imageUrl: "/assets/rental-mercedes.jpg",
    location: "San José",
    availability: [{ startDate: "2025-08-01", endDate: "2025-08-15" }],
    company: { name: "Premium Ride CR", phone: "2200-7777", address: "Escazú" },
  },
  {
    id: "rc5",
    make: "Kia",
    model: "Carnival",
    year: 2023,
    type: "Van",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 7,
    dailyRate: 80.0,
    mileageLimit: "Kilometraje ilimitado",
    features: [
      "AC trasero",
      "Puertas corredizas automáticas",
      "Pantalla de entretenimiento",
    ],
    imageUrl: "/assets/rental-carnival.jpg",
    location: "Guanacaste",
    availability: [{ startDate: "2025-08-20", endDate: "2025-09-30" }],
    company: {
      name: "Playa Loca Rentals",
      phone: "2670-1234",
      address: "Liberia Airport",
    },
  },
  {
    id: "rc6",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    type: "Sedan",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    dailyRate: 90.0,
    mileageLimit: "250 km/día",
    features: ["Autopilot", "Carga rápida", "Pantalla táctil grande"],
    imageUrl: "/assets/rental-tesla.jpg",
    location: "San José",
    availability: [{ startDate: "2025-08-01", endDate: "2025-08-10" }],
    company: {
      name: "EvoDrive Rentals",
      phone: "2222-3333",
      address: "Curridabat",
    },
  },
  {
    id: "rc7",
    make: "Jeep",
    model: "Wrangler",
    year: 2021,
    type: "SUV",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 4,
    dailyRate: 75.0,
    mileageLimit: "Kilometraje ilimitado",
    features: ["4x4", "Techo removible", "Off-road ready"],
    imageUrl: "/assets/rental-wrangler.jpg",
    location: "Puntarenas",
    availability: [{ startDate: "2025-09-01", endDate: "2025-09-20" }],
    company: { name: "Aventura Wheels", phone: "2643-8888", address: "Jaco" },
  },
];
