import React from "react";
import { Users, Building2, Crown } from "lucide-react";
import PlanCard from "./PlanCard";
import useLanguageStore from "@/store/useLanguageStore"; // 🌐 Store de idioma

const PlansGrid: React.FC = () => {
  const { getTranslation, language } = useLanguageStore();

  return (
    <div className="w-full bg-brand-bg py-10 px-4 md:px-8">
      {/* 🔹 Título global de sección */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-3 tracking-tight">
          {language === "es"
            ? "Selecciona el plan que mejor se adapte a ti"
            : "Choose the plan that best fits your needs"}
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto text-base">
          {language === "es"
            ? "Cada plan está diseñado para potenciar tus ventas y ayudarte a destacar en MundoCar."
            : "Each plan is designed to boost your sales and help you stand out on MundoCar."}
        </p>
      </div>

      {/* 🔸 Grid de planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Plan Independiente */}
        <PlanCard
          planKey="independent"
          title={language === "es" ? "Independiente" : "Independent"}
          description={
            language === "es"
              ? "Perfecto para vendedores individuales"
              : "Perfect for individual sellers"
          }
          icon={<Users className="h-8 w-8 text-brand-primary" />}
          image="/assets/mundo/suscripcion-independiente.png"
        />

        {/* Plan Autolote (Destacado) */}
        <PlanCard
          planKey="usedCarDealer"
          title={
            language === "es"
              ? "Agencia de Vehículos Usados"
              : "Used Car Dealer"
          }
          description={
            language === "es"
              ? "Ideal para pequeños negocios de autos"
              : "Ideal for small car dealerships"
          }
          icon={<Building2 className="h-8 w-8 text-brand-primary" />}
          image="/assets/mundo/suscripcion-autolote.png"
          isFeatured
        />

        {/* Plan Concesionario */}
        <PlanCard
          planKey="dealerShip"
          title={language === "es" ? "Concesionario" : "Dealership"}
          description={
            language === "es"
              ? "Para Vendedores Profesionales de Concesionarios "
              : "For professional dealerships"
          }
          icon={<Crown className="h-8 w-8 text-brand-primary" />}
          image="/assets/mundo/suscripcion-concesionario.png"
        />
      </div>

      {/* 🔹 Nota informativa */}
      <div className="text-center mt-8">
        <p className="inline-flex items-center gap-2 text-sm text-text-secondary bg-brand-card px-4 py-2 rounded-full shadow-sm">
          {language === "es"
            ? "Puedes cambiar de plan en cualquier momento."
            : "You can change your plan at any time."}
        </p>
      </div>
    </div>
  );
};

export default PlansGrid;
