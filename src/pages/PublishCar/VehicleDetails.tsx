import React, { useState } from "react";

interface VehicleDetailsProps {
  onChange?: (data: any) => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ onChange }) => {
  const [details, setDetails] = useState({
    engineCc: "",
    style: "",
    passengers: "",
    state: "Excelente",
    isNegotiable: "No",
    exteriorColor: "",
    interiorColor: "",
    taxesPaid: "Sí",
    acceptTradeIn: "No",
    plate: "",
    doors: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updated = { ...details, [name]: value };
    setDetails(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="bg-brand-form mt-10 p-8 rounded-3xl shadow-md border border-brand-primary/10 mx-auto w-full max-w-[1200px] transition-all duration-300">
      <h3 className="text-2xl font-semibold text-brand-primary mb-6 text-center border-b border-brand-primary/10 pb-2">
        Detalles del Vehículo
      </h3>

      {/* 🔹 Rejilla 3 columnas responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Cilindrada */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Cilindrada (c.c.)
          </label>
          <input
            type="number"
            name="engineCc"
            value={details.engineCc}
            onChange={handleChange}
            placeholder="Ej: 1600 (0 para eléctricos)"
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Estilo */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Estilo
          </label>
          <select
            name="style"
            value={details.style}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="">Seleccione el Estilo</option>
            <option value="Sedán">Sedán</option>
            <option value="SUV">SUV</option>
            <option value="Pickup">Pickup</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Moto">Moto</option>
            <option value="Camión">Camión</option>
          </select>
        </div>

        {/* Pasajeros */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Número de Pasajeros
          </label>
          <select
            name="passengers"
            value={details.passengers}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="">Seleccione</option>
            {[2, 4, 5, 7, 9].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Estado
          </label>
          <select
            name="state"
            value={details.state}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="Excelente">Excelente</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
          </select>
        </div>

        {/* Precio Negociable */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Precio Negociable
          </label>
          <select
            name="isNegotiable"
            value={details.isNegotiable}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="No">No</option>
            <option value="Sí">Sí</option>
          </select>
        </div>

        {/* Color Exterior */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Color Exterior
          </label>
          <input
            name="exteriorColor"
            value={details.exteriorColor}
            onChange={handleChange}
            placeholder="Ej: Rojo"
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Color Interior */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Color Interior
          </label>
          <input
            name="interiorColor"
            value={details.interiorColor}
            onChange={handleChange}
            placeholder="Ej: Negro"
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Impuestos */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Ya pagó impuestos
          </label>
          <select
            name="taxesPaid"
            value={details.taxesPaid}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Recibe vehículo */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Se recibe vehículo
          </label>
          <select
            name="acceptTradeIn"
            value={details.acceptTradeIn}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="No">No</option>
            <option value="Sí">Sí</option>
          </select>
        </div>

        {/* Placa */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Placa (uso interno)
          </label>
          <input
            name="plate"
            value={details.plate}
            onChange={handleChange}
            placeholder="Número de placa"
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Puertas */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Número de Puertas
          </label>
          <select
            name="doors"
            value={details.doors}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="">Seleccione</option>
            {[2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comentario adicional */}
      <div className="mt-8">
        <label className="block text-text-secondary font-medium mb-1">
          Comentario adicional
        </label>
        <textarea
          name="comment"
          value={details.comment}
          onChange={handleChange}
          placeholder="No incluir números de teléfono en el comentario"
          className="w-full border border-brand-primary/20 rounded-lg p-3 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default VehicleDetails;
