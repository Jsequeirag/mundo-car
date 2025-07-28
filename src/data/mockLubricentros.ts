// data/mockLubricentros.ts

export interface Lubricentro {
  id: string;
  name: string;
  address: string;
  city: string; // Ciudad o cantón
  province: string; // Provincia
  phone: string;
  services: string[]; // E.g., ["Cambio de aceite", "Filtros", "Engrase", "Revisión de frenos"]
  hours: string; // E.g., "L-V: 8am-5pm, S: 8am-12pm"
  imageUrl: string;
  description: string;
  rating?: number; // Opcional, para calificaciones
  locationUrl?: string; // Enlace a Google Maps u otro mapa
}

export const mockLubricentros: Lubricentro[] = [
  {
    id: "l1",
    name: "Lubricentro Rápido Express",
    address: "Calle Principal, contiguo a Maxi Palí",
    city: "San José",
    province: "San José",
    phone: "2234-5678",
    services: [
      "Cambio de aceite",
      "Filtros",
      "Engrase",
      "Revisión de frenos",
      "Líquidos",
    ],
    hours: "L-S: 7am - 6pm",
    imageUrl: "/assets/lubricentro-1.jpg", // Asegúrate de tener una imagen para esto
    description:
      "Servicio rápido y eficiente de cambio de aceite y filtros. Contamos con todas las marcas.",
    rating: 4.5,
    locationUrl: "https://maps.app.goo.gl/ABCDEFGHIJ",
  },
  {
    id: "l2",
    name: "AutoLub CR",
    address: "Avenida 3, frente al parque",
    city: "Alajuela",
    province: "Alajuela",
    phone: "2441-1234",
    services: [
      "Cambio de aceite",
      "Filtros",
      "Baterías",
      "Líquido de frenos",
      "Transmisión",
    ],
    hours: "L-V: 8am - 5pm",
    imageUrl: "/assets/lubricentro-2.jpg",
    description: "Expertos en lubricación y mantenimiento automotriz general.",
    rating: 4.8,
    locationUrl: "https://maps.app.goo.gl/KLMNOPQR",
  },
  {
    id: "l3",
    name: "El Punto del Aceite",
    address: "Ruta 32, 500m este del peaje",
    city: "Guápiles",
    province: "Limón",
    phone: "2710-5678",
    services: ["Cambio de aceite", "Filtros", "Engrase"],
    hours: "L-D: 8am - 7pm",
    imageUrl: "/assets/lubricentro-3.jpg",
    description:
      "Tu parada obligatoria para el mantenimiento de tu vehículo en la ruta 32.",
    rating: 4.2,
    locationUrl: "https://maps.app.goo.gl/STUVWXYZ",
  },
  {
    id: "l4",
    name: "LubriCentro Pura Vida",
    address: "Contiguo a la plaza de deportes",
    city: "Liberia",
    province: "Guanacaste",
    phone: "2666-8765",
    services: ["Cambio de aceite", "Filtros", "Revisión de fluidos"],
    hours: "L-S: 9am - 5pm",
    imageUrl: "/assets/lubricentro-4.jpg",
    description: "Atención personalizada y productos de calidad para tu motor.",
    rating: 4.6,
    locationUrl: "https://maps.app.goo.gl/12345678",
  },
  {
    id: "l5",
    name: "Motores al Día",
    address: "Barrio El Carmen, 100m norte de la iglesia",
    city: "Heredia",
    province: "Heredia",
    phone: "2260-9876",
    services: [
      "Cambio de aceite",
      "Filtros",
      "Diagnóstico de motor",
      "Líquido de frenos",
    ],
    hours: "L-V: 8am - 5pm, S: 8am - 1pm",
    imageUrl: "/assets/lubricentro-5.jpg",
    description:
      "Servicio integral para el cuidado de tu motor y sistema de lubricación.",
    rating: 4.7,
    locationUrl: "https://maps.app.goo.gl/90123456",
  },
  {
    id: "l6",
    name: "Global Lubricants",
    address: "Zona Industrial, Nave 3",
    city: "Cartago",
    province: "Cartago",
    phone: "2552-3344",
    services: [
      "Cambio de aceite",
      "Filtros",
      "Aceites industriales",
      "Servicio a flotas",
    ],
    hours: "L-V: 7:30am - 4:30pm",
    imageUrl: "/assets/lubricentro-6.jpg",
    description:
      "Soluciones de lubricación para vehículos y maquinaria pesada.",
    rating: 4.3,
    locationUrl: "https://maps.app.goo.gl/78901234",
  },
  {
    id: "l7",
    name: "Lubricentro Amigo",
    address: "Barrio San Martín, frente a la escuela",
    city: "Puntarenas",
    province: "Puntarenas",
    phone: "2661-5566",
    services: ["Cambio de aceite", "Filtros", "Engrase", "Lavado de motor"],
    hours: "L-S: 8am - 6pm",
    imageUrl: "/assets/lubricentro-7.jpg",
    description:
      "Atención cálida y los mejores productos para el mantenimiento de tu auto.",
    rating: 4.4,
    locationUrl: "https://maps.app.goo.gl/56789012",
  },
];
