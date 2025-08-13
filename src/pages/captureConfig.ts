export const captureSteps = [
  "Frontal",
  "Frontal-Lateral Izquierdo",
  "Lateral Izquierdo",
  "Trasero-Lateral Izquierdo",
  "Trasero",
  "Trasero-Lateral Derecho",
  "Lateral Derecho",
  "Frontal-Lateral Derecho",
  "Vista Superior",
  "Detalle de Llantas",
  "Interior Frontal",
  "Interior Trasero",
];

export const angleKeywords: Record<number, string[]> = {
  0: ["front"],
  1: ["front", "left"],
  2: ["left"],
  3: ["rear", "left"],
  4: ["rear"],
  5: ["rear", "right"],
  6: ["right"],
  7: ["front", "right"],
  8: ["top", "roof"],
  9: ["wheel", "tire"],
  10: ["interior", "dashboard", "steering wheel"],
  11: ["interior", "seat"],
};
