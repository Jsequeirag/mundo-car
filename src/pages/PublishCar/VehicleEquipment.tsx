import React, { useState } from "react";

interface VehicleEquipmentProps {
  onChange?: (selected: string[]) => void;
}

const equipmentOptions: string[] = [
  "Dirección Hidráulica/Electroasistida",
  "Cierre Central",
  "Asientos Eléctricos",
  "Vidrios Tintados",
  "Bolsa(s) de Aire",
  "Vidrios Eléctricos",
  "Espejos Eléctricos",
  "Alarma",
  "Frenos ABS",
  "Aire Acondicionado",
  "Desempañador Trasero",
  "Sunroof / Techo Panorámico",
  "Aros de Lujo",
  "Turbo",
  "Tapicería de Cuero",
  "Halógenos",
  "Cámara 360",
  "Android Auto",
  "Cruise Control",
  "Radio con USB/AUX",
  "Revisión Técnica al día",
  "Control Electrónico de Estabilidad",
  "Control de Descenso",
  "Caja de Cambios Dual",
  "Cámara de Retroceso",
  "Sensores de Retroceso",
  "Sensores Frontales",
  "Control de Radio en el Volante",
  "Volante Multifuncional",
  "Aire Acondicionado Climatizado",
  "Asiento(s) con Memoria",
  "Retrovisores Auto-Retractiles",
  "Luces de Xenón / Bi-Xenón",
  "Sensor de Lluvia",
  "Llave Inteligente / Botón de Arranque",
  "Apple CarPlay",
  "Computadora de Viaje",
  "Volante Ajustable",
  "Bluetooth",

  // 🔹 Nuevos equipamientos modernos (2025 Edition)
  "Freno de Mano Electrónico (EPB)",
  "Auto Hold (Retención Automática en Alto Total)",
  "Alerta de Tráfico Cruzado Trasero (RCTA)",
  "Espejo Retrovisor Electrocrómico (Antideslumbrante Automático)",
  "Iluminación Ambiental Interior LED",
  "Puerto USB-C de Carga Rápida",
  "Reconocimiento de Señales de Tránsito",
  "Cierre Automático por Proximidad (Keyless Entry + Lock)",
];

const VehicleEquipment: React.FC<VehicleEquipmentProps> = ({ onChange }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const toggleEquipment = (item: string) => {
    const updated = selectedEquipment.includes(item)
      ? selectedEquipment.filter((eq) => eq !== item)
      : [...selectedEquipment, item];

    setSelectedEquipment(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="bg-brand-form mt-10 p-8 rounded-3xl shadow-md border border-brand-primary/10 mx-auto w-full max-w-[1200px] transition-all duration-300">
      <h3 className="text-2xl font-semibold text-brand-primary mb-6 text-center border-b border-brand-primary/10 pb-2">
        Equipamiento del vehículo
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {equipmentOptions.map((item, index) => {
          const isSelected = selectedEquipment.includes(item);
          return (
            <label
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border border-transparent transition-all ${
                isSelected
                  ? "bg-brand-card border-brand-primary/30 shadow-sm"
                  : "hover:bg-brand-card"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleEquipment(item)}
                className="w-5 h-5 accent-brand-primary cursor-pointer"
              />
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-brand-primary" : "text-text-secondary"
                }`}
              >
                {item}
              </span>
            </label>
          );
        })}
      </div>

      {selectedEquipment.length > 0 && (
        <p className="text-sm text-text-secondary text-center mt-6 italic">
          {selectedEquipment.length} elemento
          {selectedEquipment.length > 1 ? "s seleccionados" : " seleccionado"}
        </p>
      )}
    </div>
  );
};

export default VehicleEquipment;
