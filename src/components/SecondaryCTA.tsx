// components/SecondaryCTA.tsx
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button"; // Asegúrate de importar tu Button

const SecondaryCTA: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r bg-brand-primary  text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Quieres vender tu vehículo?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Publica tu anuncio de forma rápida y sencilla y llega a miles de
          compradores.
        </p>
        <Button className="bg-white text-brand-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-xl text-lg">
          <PlusCircle className="h-6 w-6 mr-2" /> Publica tu Anuncio
        </Button>
      </div>
    </section>
  );
};

export default SecondaryCTA;
