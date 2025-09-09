// data/mockAutoParts.ts

export interface AutoPart {
  id: string;
  name: string;
  category: string; // E.g., "Motor", "Frenos", "Suspensión", "Eléctrico", "Carrocería"
  vehicleMake: string[]; // Marcas de vehículos compatibles, e.g., ["Toyota", "Honda"]
  vehicleModel: string[]; // Modelos compatibles, e.g., ["Corolla", "Civic"]
  yearCompatibility: [number, number]; // Rango de años compatible, [minYear, maxYear]
  price: number;
  condition: "new" | "used" | "remanufactured";
  imageUrl: string;
  description: string;
  sellerInfo: {
    name: string;
    location: string;
  };
}

export const mockAutoParts: AutoPart[] = [
  {
    id: "ap1",
    name: "Pastillas de Freno Delanteras",
    category: "Frenos",
    vehicleMake: ["Toyota"],
    vehicleModel: ["Corolla", "Camry"],
    yearCompatibility: [2010, 2018],
    price: 45.99,
    condition: "new",
    imageUrl: "/assets/autoparts/pastillas-freno-delanteras.jpg", // Asegúrate de tener una imagen para esto
    description:
      "Juego de pastillas de freno cerámicas de alta durabilidad para Toyota Corolla y Camry.",
    sellerInfo: { name: "Repuestos Auto Veloz", location: "San José" },
  },
  {
    id: "ap2",
    name: "Filtro de Aire Motor",
    category: "Motor",
    vehicleMake: ["Honda"],
    vehicleModel: ["Civic", "CR-V"],
    yearCompatibility: [2015, 2022],
    price: 15.0,
    condition: "new",
    imageUrl: "/assets/autoparts/filtro.jpg", // Asegúrate de tener una imagen para esto
    description:
      "Filtro de aire de alto rendimiento para motores Honda. Mejora el flujo de aire.",
    sellerInfo: { name: "Honda Parts CR", location: "Alajuela" },
  },
  {
    id: "ap3",
    name: "Amortiguador Trasero Derecho",
    category: "Suspensión",
    vehicleMake: ["Nissan"],
    vehicleModel: ["Sentra"],
    yearCompatibility: [2008, 2012],
    price: 75.5,
    condition: "used",
    imageUrl: "/assets/autoparts/amortiguador.jpg", // Asegúrate de tener una imagen para esto
    description:
      "Amortiguador usado en buen estado, retirado de Nissan Sentra 2010.",
    sellerInfo: { name: "Deshuesadero El Sol", location: "Cartago" },
  },
  {
    id: "ap4",
    name: "Batería Automotriz 12V",
    category: "Eléctrico",
    vehicleMake: ["Universal"], // Universal si aplica a muchos
    vehicleModel: [],
    yearCompatibility: [2000, 2025],
    price: 120.0,
    condition: "new",
    imageUrl: "/assets/autoparts/bateria.jpeg", // Asegúrate de tener una imagen para esto
    description:
      "Batería de ácido-plomo de 12V, 600CCA, compatible con la mayoría de vehículos.",
    sellerInfo: { name: "Baterías CR", location: "Heredia" },
  },
  {
    id: "ap5",
    name: "Parachoques Delantero",
    category: "Carrocería",
    vehicleMake: ["Hyundai"],
    vehicleModel: ["Elantra"],
    yearCompatibility: [2016, 2020],
    price: 180.0,
    condition: "remanufactured",
    imageUrl: "/assets/autoparts/parachoques.avif", // Asegúrate de tener una imagen para esto
    description:
      "Parachoques delantero remanufacturado, listo para pintar. Incluye rejillas.",
    sellerInfo: { name: "Carrocerías Express", location: "Guanacaste" },
  },
  {
    id: "ap6",
    name: "Bomba de Agua",
    category: "Motor",
    vehicleMake: ["Mazda"],
    vehicleModel: ["3", "6"],
    yearCompatibility: [2012, 2017],
    price: 95.0,
    condition: "new",
    imageUrl: "/assets/autoparts/bomba.avif", // Asegúrate de tener una imagen para esto
    description: "Bomba de agua de repuesto para Mazda 3 y 6.",
    sellerInfo: { name: "Auto Parts Pro", location: "San José" },
  },
  {
    id: "ap7",
    name: "Espejo Lateral Izquierdo",
    category: "Carrocería",
    vehicleMake: ["Kia"],
    vehicleModel: ["Sportage"],
    yearCompatibility: [2010, 2015],
    price: 60.0,
    condition: "used",
    imageUrl: "/assets/autoparts/espejo.jpg",
    description:
      "Espejo retrovisor lateral izquierdo original de Kia Sportage usado.",
    sellerInfo: { name: "Repuestos Usados Del Valle", location: "Alajuela" },
  },
  {
    id: "ap8",
    name: "Bobina de Encendido",
    category: "Eléctrico",
    vehicleMake: ["Chevrolet"],
    vehicleModel: ["Silverado", "Colorado"],
    yearCompatibility: [2005, 2014],
    price: 35.0,
    condition: "new",
    imageUrl: "/assets/autoparts/bobina-encendido.jpg",
    description: "Bobina de encendido compatible con varios modelos Chevrolet.",
    sellerInfo: { name: "ElectriAuto", location: "Limón" },
  },
  /*{
    id: "ap9",
    name: "Discos de Freno Delanteros (Par)",
    category: "Frenos",
    vehicleMake: ["Volkswagen"],
    vehicleModel: ["Jetta", "Golf"],
    yearCompatibility: [2013, 2019],
    price: 110.0,
    condition: "new",
    imageUrl: "/assets/autoparts/frenos.webp",
    description:
      "Par de discos de freno ventilados para Volkswagen Jetta y Golf.",
    sellerInfo: { name: "Frenos Master", location: "Puntarenas" },
  },
  {
    id: "ap10",
    name: "Radiador Motor",
    category: "Enfriamiento",
    vehicleMake: ["Ford"],
    vehicleModel: ["Focus"],
    yearCompatibility: [2012, 2018],
    price: 150.0,
    condition: "new",
    imageUrl: "/assets/autoparts/radiador.jpg",
    description:
      "Radiador de aluminio para Ford Focus. Máxima eficiencia de enfriamiento.",
    sellerInfo: { name: "RefriPartes CR", location: "San José" },
  },*/
];
