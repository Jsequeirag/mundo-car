import React from "react";
import { Users, Building2, Crown, Zap, CheckCircle, Star } from "lucide-react";

const SubscriptionPlansGrid: React.FC = () => {
  const handlePlanSelect = (planIndex: number) => {
    switch (planIndex) {
      case 0:
        window.location.href = "/checkout/independiente";
        break;
      case 1:
        window.location.href = "/checkout/autolote";
        break;
      case 2:
        window.location.href = "/checkout/concesionario";
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-brand-bg py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* PLAN 1: Independiente */}
        <div
          className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
          onClick={() => handlePlanSelect(0)}
        >
          <div
            className="relative bg-brand-card border border-brand-primary/10 rounded-3xl p-8 shadow-lg 
                       group-hover:shadow-xl overflow-hidden transition-all duration-500"
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/30">
                  <Users className="h-8 w-8 text-brand-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-text-main mb-2">
                Independiente
              </h3>

              <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  $29
                </div>
                <div className="text-sm text-text-secondary">/mes</div>
                <p className="text-sm text-text-secondary mt-1">
                  Perfecto para vendedores individuales
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "5 anuncios activos",
                  "Fotos ilimitadas",
                  "Soporte básico",
                  "Publicación en redes",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-text-main"
                  >
                    <CheckCircle className="h-5 w-5 text-brand-hover flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(0);
                }}
                className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 
                           bg-gradient-to-r from-brand-primary to-brand-hover text-white shadow-md 
                           hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" />
                  Seleccionar Plan
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* PLAN 2: Autolote (Popular) */}
        <div
          className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 scale-105"
          onClick={() => handlePlanSelect(1)}
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <span className="bg-gradient-to-r from-[#bdab78] to-[#04606A] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
              <Star className="h-3 w-3 fill-current" />
              MÁS POPULAR
            </span>
          </div>

          <div
            className="relative bg-brand-card border border-brand-primary/20 rounded-3xl p-8 shadow-xl 
                       ring-2 ring-[#bdab78]/40 group-hover:ring-[#bdab78]/70 
                       overflow-hidden transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#bdab78]/10 rounded-2xl flex items-center justify-center border border-[#bdab78]/30">
                  <Building2 className="h-8 w-8 text-[#bdab78]" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-text-main mb-2">
                Autolote
              </h3>

              <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  $79
                </div>
                <div className="text-sm text-text-secondary">/mes</div>
                <p className="text-sm text-text-secondary mt-1">
                  Ideal para pequeños negocios de autos
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "25 anuncios activos",
                  "Galería premium",
                  "Soporte prioritario",
                  "Análisis de mercado",
                  "Publicidad destacada",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-text-main"
                  >
                    <CheckCircle className="h-5 w-5 text-brand-hover flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(1);
                }}
                className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 
                           bg-gradient-to-r from-[#bdab78] to-brand-primary text-white shadow-md 
                           hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" />
                  ¡Elige este plan!
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* PLAN 3: Concesionario */}
        <div
          className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
          onClick={() => handlePlanSelect(2)}
        >
          <div
            className="relative bg-brand-card border border-brand-primary/10 rounded-3xl p-8 shadow-lg 
                       group-hover:shadow-xl overflow-hidden transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-brand-hover/10 rounded-2xl flex items-center justify-center border border-brand-hover/30">
                  <Crown className="h-8 w-8 text-brand-hover" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-text-main mb-2">
                Concesionario
              </h3>

              <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  $199
                </div>
                <div className="text-sm text-text-secondary">/mes</div>
                <p className="text-sm text-text-secondary mt-1">
                  Para concesionarios profesionales
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Anuncios ilimitados",
                  "Página de marca personalizada",
                  "Soporte dedicado 24/7",
                  "Herramientas de CRM",
                  "Reportes avanzados",
                  "Publicidad premium",
                  "Integración API",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-text-main"
                  >
                    <CheckCircle className="h-5 w-5 text-brand-hover flex-shrink-0" />
                    <span className={`text-sm ${index >= 5 ? "text-xs" : ""}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(2);
                }}
                className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 
                           bg-gradient-to-r from-brand-hover to-brand-primary text-white shadow-md 
                           hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" />
                  Seleccionar Plan
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de garantía */}
      <div className="pt-8 border-t border-brand-primary/10 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-form text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          30 días de garantía de satisfacción • Cancelación sin penalización
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlansGrid;
