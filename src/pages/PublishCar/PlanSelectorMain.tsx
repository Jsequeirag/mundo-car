import React from "react";

interface PlanSelectorMainProps {
  plans: any[];
  selectedPlan: string;
  selectedSubPlan: string;
  onSelectSubPlan: (planId: string, subPlanId: string) => void;
}

const PlanSelectorMain: React.FC<PlanSelectorMainProps> = ({
  plans,
  selectedPlan,
  selectedSubPlan,
  onSelectSubPlan,
}) => {
  const getTier = (
    planId: string,
    optId: string
  ): "basic" | "deluxe" | "super" => {
    if (planId === "independent") {
      if (optId === "superdeluxe") return "super";
      if (optId === "deluxe") return "deluxe";
      return "basic";
    }
    if (planId === "usedCarDealer" || planId === "dealerShip") {
      if (optId === "10_15" || optId === "15_20") return "super";
      return "deluxe";
    }
    return "basic";
  };

  // 🎨 Colores aplicados a cada nivel de plan
  const tierCardClasses: Record<"basic" | "deluxe" | "super", string> = {
    basic: "bg-brand-card border-brand-primary/10 shadow-sm",
    deluxe:
      "bg-gradient-to-br from-brand-card to-brand-form border-brand-primary/20 shadow-md",
    super:
      "bg-gradient-to-br from-brand-hover via-brand-primary to-[#012f36] text-white shadow-xl relative overflow-hidden",
  };

  const tierTitleClasses: Record<"basic" | "deluxe" | "super", string> = {
    basic: "text-text-main",
    deluxe: "text-brand-primary",
    super: "text-white drop-shadow",
  };

  const tierPriceClasses: Record<"basic" | "deluxe" | "super", string> = {
    basic: "text-text-secondary",
    deluxe: "text-brand-primary",
    super: "text-white",
  };

  const tierDetailsClasses: Record<"basic" | "deluxe" | "super", string> = {
    basic: "text-text-secondary",
    deluxe: "text-text-secondary",
    super: "text-white/90",
  };

  const tierButtonClasses = (
    tier: "basic" | "deluxe" | "super",
    isSelected: boolean
  ) => {
    if (isSelected)
      return "bg-brand-primary text-white shadow-md hover:bg-brand-hover";
    if (tier === "super")
      return "bg-white/15 text-white border border-white/30 hover:bg-white/25";
    if (tier === "deluxe")
      return "bg-brand-primary text-white hover:bg-brand-hover";
    return "bg-brand-form text-text-main hover:bg-brand-bg";
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] bg-brand-bg rounded-3xl p-6">
      {plans
        .filter((plan) => plan.id === selectedPlan)
        .map((plan) => (
          <div
            key={plan.id}
            className={`relative w-full rounded-3xl p-8 bg-brand-card border-4 transition-all ${
              selectedPlan === plan.id
                ? "border-brand-primary shadow-2xl scale-[1.02]"
                : "border-brand-primary/10"
            }`}
          >
            {/* 🏷️ Encabezado del plan */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-brand-primary">
                  {plan.name}
                </h2>
                <p className="text-text-secondary mt-1">{plan.description}</p>
              </div>
              <div className="mt-4 sm:mt-0 bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
                ⭐ Tu Plan Actual
              </div>
            </div>

            {/* 🧱 Opciones del plan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {plan.options.map((opt) => {
                const tier = getTier(plan.id, opt.id);
                const isSelected = selectedSubPlan === `${plan.id}_${opt.id}`;
                return (
                  <div
                    key={opt.id}
                    onClick={() => onSelectSubPlan(plan.id, opt.id)}
                    className={`rounded-xl p-5 border transition-all cursor-pointer ${
                      isSelected
                        ? "border-brand-primary scale-[1.03] shadow-lg"
                        : "hover:border-brand-primary/60"
                    } ${tierCardClasses[tier]}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`text-lg font-semibold ${tierTitleClasses[tier]}`}
                      >
                        {opt.title}
                      </h3>
                      <span
                        className={`font-bold text-lg ${tierPriceClasses[tier]}`}
                      >
                        {opt.price}
                      </span>
                    </div>

                    <ul
                      className={`mt-2 text-sm list-disc pl-4 ${tierDetailsClasses[tier]}`}
                    >
                      {opt.details.map((d: string, j: number) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={`mt-3 w-full py-2 rounded-lg font-medium transition-all ${tierButtonClasses(
                        tier,
                        isSelected
                      )}`}
                    >
                      {isSelected ? "✅ Seleccionado" : "Seleccionar"}
                    </button>

                    {/* ✨ Brillo sutil solo para SUPER */}
                    {tier === "super" && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shine" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlanSelectorMain;
