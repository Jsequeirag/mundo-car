// data/centralAmericaCountries.ts

export interface Country {
  name: string;
  code: string; // E.g., 'cr', 'sv'
  flagUrl: string;
  description: string;
  homePageUrl: string; // La URL a la que el usuario será redirigido
}

export const centralAmericaCountries: Country[] = [
  {
    name: "Honduras",
    code: "hn",
    flagUrl: "/assets/flags/honduras.png",
    description:
      "Explora oportunidades en el mercado automotriz de Honduras. Conecta con vendedores y servicios.",
    homePageUrl: "/hn",
  },
  {
    name: "Costa Rica",
    code: "cr",
    flagUrl: "/assets/flags/costarica.png",
    description:
      "Encuentra vehículos y servicios automotrices en Costa Rica. ¡Pura Vida sobre ruedas!",
    homePageUrl: "/cr", // Ejemplo de URL específica por país
  },
  {
    name: "El Salvador",
    code: "sv",
    flagUrl: "/assets/flags/salvador.png",
    description:
      "Descubre autos, repuestos y talleres en El Salvador. Tu mejor aliado en movilidad.",
    homePageUrl: "/sv",
  },
  {
    name: "Guatemala",
    code: "gt",
    flagUrl: "/assets/flags/guatemala.png",
    description:
      "Amplia oferta de vehículos y servicios automotrices en Guatemala. ¡Elige el tuyo!",
    homePageUrl: "/gt",
  },

  {
    name: "Nicaragua",
    code: "ni",
    flagUrl: "/assets/flags/nicaragua.png",
    description:
      "Encuentra lo que necesitas para tu auto en Nicaragua. Comodidad y seguridad en cada búsqueda.",
    homePageUrl: "/ni",
  },
  {
    name: "Panamá",
    code: "pa",
    flagUrl: "/assets/flags/panama.png",
    description:
      "El mercado automotriz de Panamá a tu alcance. Desde vehículos hasta servicios especializados.",
    homePageUrl: "/pa",
  },
  // Opcional: Si incluyes Belice
  /*
  {
    name: "Belice",
    code: "bz",
    flagUrl: "/assets/flags/bz.png",
    description: "Tu guía automotriz en Belice. Descubre vehículos y servicios de calidad.",
    homePageUrl: "/bz",
  },
  */
];
