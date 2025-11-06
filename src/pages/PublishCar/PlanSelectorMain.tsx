import React from "react";

interface PlanSelectorMainProps {
  plans: any[];
  selectedPlan: string;
  selectedSubPlan: string;
  onSelectSubPlan: (planId: string, subPlanId: string) => void;
  selectedAddons?: string[];
  setSelectedAddons?: React.Dispatch<React.SetStateAction<string[]>>;
}

const PlanSelectorMain: React.FC<PlanSelectorMainProps> = ({
  plans,
  selectedPlan,
  selectedSubPlan,
  onSelectSubPlan,
  selectedAddons = [],
  setSelectedAddons = () => {},
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

            {/* 🔸 Lógica especial para Agencia de Vehículos Usados */}
            {plan.id === "usedCarDealer" ? (
              <>
                {/* 📦 Beneficios generales */}
                <div className="bg-[#E8EFF0] rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold mb-2 text-[#034651]">
                    Beneficios incluidos:
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    {plan.details.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* 🚗 Rango de vehículos */}
                <h3 className="font-semibold text-[#034651] mb-3">
                  Selecciona el rango de vehículos:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {plan.options.map((opt: any) => (
                    <button
                      key={opt.id}
                      onClick={() => onSelectSubPlan(plan.id, opt.id)}
                      className={`rounded-xl border px-4 py-3 text-center transition-all
          ${
            selectedSubPlan === `${plan.id}_${opt.id}`
              ? "bg-[#034651] text-white border-[#034651]"
              : "bg-white hover:bg-[#F1F6F7] border-gray-300 text-[#034651]"
          }`}
                    >
                      <p className="font-semibold">{opt.label}</p>
                      <p className="text-sm opacity-80">{opt.price}</p>
                    </button>
                  ))}
                </div>

                {/* 💎 Adicionales exclusivos */}
                <h3 className="font-semibold text-[#034651] mb-3">
                  Adicionales opcionales:
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "superDeluxeVentacar",
                      name: "Vehículos SUPER DELUXE",
                      description:
                        "Publicaciones en Facebook e Instagram con pauta nacional. Incluye 8 fotos y video.",
                      price: "$5",
                    },
                    {
                      id: "websiteLink",
                      name: "Agregar enlace a página web",
                      description:
                        "Permite añadir el link de tu sitio o autolote.",
                      price: "$20",
                    },
                  ].map((extra) => (
                    <label
                      key={extra.id}
                      className={`flex items-start gap-3 rounded-2xl p-4 border cursor-pointer transition
          ${
            selectedAddons.includes(extra.id)
              ? "bg-[#E6F4F3] border-[#034651]"
              : "bg-[#F7FAFA] border-[#D9E3E4] hover:shadow-md"
          }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(extra.id)}
                        onChange={() => {
                          if (selectedAddons.includes(extra.id)) {
                            setSelectedAddons(
                              selectedAddons.filter((id) => id !== extra.id)
                            );
                          } else {
                            setSelectedAddons([...selectedAddons, extra.id]);
                          }
                        }}
                        className="mt-1 accent-[#034651]"
                      />
                      <div>
                        <p className="font-semibold text-[#034651]">
                          {extra.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {extra.description}
                        </p>
                        <p className="text-sm text-[#034651] font-semibold">
                          {extra.price}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </>
            ) : plan.id === "dealerShip" ? (
              <>
                {/* 📦 PLAN CONCESIONARIO ÚNICO */}
                <div className="bg-[#E8EFF0] rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold mb-2 text-[#034651]">
                    Beneficios incluidos:
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    {plan.details.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center">
                  {plan.options.map((opt: any) => (
                    <div
                      key={opt.id}
                      className={`rounded-2xl border-2 border-[#034651] bg-white px-10 py-6 text-center shadow-lg w-full md:w-1/2`}
                    >
                      <p className="text-lg font-semibold text-[#034651]">
                        {opt.label}
                      </p>
                      <p className="text-3xl font-bold text-[#034651] mt-1">
                        {opt.price}
                      </p>
                      <button
                        onClick={() => onSelectSubPlan(plan.id, opt.id)}
                        className={`mt-4 w-full py-2 rounded-lg font-semibold transition-all ${
                          selectedSubPlan === `${plan.id}_${opt.id}`
                            ? "bg-[#034651] text-white"
                            : "bg-brand-form hover:bg-[#DDEBEC] text-[#034651]"
                        }`}
                      >
                        {selectedSubPlan === `${plan.id}_${opt.id}`
                          ? "✅ Seleccionado"
                          : "Seleccionar"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* 🧱 Diseño normal para los demás planes */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                {plan.options.map((opt: any) => {
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
            )}
          </div>
        ))}
    </div>
  );
};

export default PlanSelectorMain;
