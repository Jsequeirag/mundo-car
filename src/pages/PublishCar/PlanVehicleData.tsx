import React, { useMemo } from "react";
import VehicleForm from "./VehicleForm";

interface PlanVehicleDataProps {
  selectedPlan: string;
  selectedSubPlan: string;
  vehicleData: any;
  setVehicleData: React.Dispatch<React.SetStateAction<any>>;
}

const PlanVehicleData: React.FC<PlanVehicleDataProps> = ({
  selectedPlan,
  selectedSubPlan,
  vehicleData,
  setVehicleData,
}) => {
  const containerClasses = "mx-auto w-full max-w-[1200px]";

  // 🧮 Cálculo de límites según plan/subplan
  const { maxImages, maxVideos, label } = useMemo(() => {
    let maxImages = 5;
    let maxVideos = 0;
    let label = "Publicación básica";

    if (!selectedPlan || !selectedSubPlan) {
      return { maxImages, maxVideos, label };
    }

    const subPlan = selectedSubPlan.split("_")[1];
    const isIndependent = selectedPlan === "independent";

    if (isIndependent) {
      switch (subPlan) {
        case "basic":
          maxImages = 5;
          label = "Plan Independiente — Básico";
          break;
        case "deluxe":
          maxImages = 8;
          label = "Plan Independiente — Deluxe";
          break;
        case "superdeluxe":
          maxImages = 8;
          maxVideos = 1;
          label = "Plan Independiente — Super Deluxe";
          break;
      }
    } else if (selectedPlan === "usedCarDealer") {
      // Autolotes
      label = "Plan Ventacar / Autolote";
      if (["0_5", "5_10"].includes(subPlan)) {
        maxImages = 8;
        maxVideos = 1;
      } else {
        maxImages = 8;
        maxVideos = 1;
        label = "Plan Ventacar — Premium";
      }
    } else if (selectedPlan === "dealerShip") {
      // Concesionario
      label = "Plan Vendedor Concesionario";
      if (["0_5", "5_10"].includes(subPlan)) {
        maxImages = 8;
        maxVideos = 1;
      } else {
        maxImages = 8;
        maxVideos = 1;
        label = "Plan Vendedor Concesionario — Premium";
      }
    }

    return { maxImages, maxVideos, label };
  }, [selectedPlan, selectedSubPlan]);

  if (!selectedPlan || !selectedSubPlan) return null;

  return (
    <div
      className={`${containerClasses} bg-brand-form mt-10 p-8 rounded-3xl shadow-md border border-brand-primary/10 transition-all duration-300`}
    >
      <h3 className="text-2xl font-semibold text-brand-primary mb-3 text-center">
        Datos del Vehículo
      </h3>

      {/* 🔹 Indicador del plan */}
      <p className="text-center text-text-secondary mb-6 italic">
        {label} — Máx. {maxImages} fotos
        {maxVideos > 0
          ? ` y ${maxVideos} video${maxVideos > 1 ? "s" : ""}`
          : ""}
      </p>

      {/* 🔹 Formulario */}
      <div className="bg-brand-card p-6 rounded-2xl shadow-sm">
        <VehicleForm
          maxImages={maxImages}
          maxVideos={maxVideos}
          vehicleData={vehicleData}
          setVehicleData={setVehicleData}
        />
      </div>
    </div>
  );
};

export default PlanVehicleData;
