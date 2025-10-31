import React from "react";
import { Car, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PublishHeroSection: React.FC = () => {
  const scrollToPlans = () => {
    const element = document.getElementById("plansSection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full bg-[#034651] overflow-hidden rounded-2xl shadow-lg mb-10">
      {/* 🖼️ Imagen de fondo con opacidad suave */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url('/assets/mundo/publishImage.png')`,
        }}
      />

      {/* 🌊 Capa de degradado de marca encima de la imagen */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04606A]/20 via-[#034651]/30 to-[#012F3C]/90"></div>

      {/* 💫 Efectos de luz suaves */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      {/* 🧩 Contenido principal */}
      <div className="relative z-10 px-8 md:px-16 py-16 text-white text-center flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Car className="h-10 w-10 text-white animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            ¡Publica tu Automóvil en{" "}
            <span className="text-[#E8EFF0]">MundoCar</span>!
          </h1>
        </div>

        <p className="text-lg md:text-xl text-[#E8EFF0]/90 max-w-2xl leading-relaxed">
          Llegá a miles de compradores en toda la región. Escoge el{" "}
          <span className="font-semibold text-white">plan perfecto</span> para
          destacar tu anuncio y aumentar tus oportunidades.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            onClick={scrollToPlans}
            className="bg-white text-[#034651] font-semibold px-6 py-3 rounded-lg hover:bg-[#E8EFF0] transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5 text-[#04606A]" />
            Ver planes disponibles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublishHeroSection;
