import React from "react";
import { Button } from "@/components/ui/button";

interface Branch {
  name: string;
  address: string;
  photo: File | null;
}

interface BusinessInfoSectionProps {
  selectedPlan: string;
  businessName: string;
  setBusinessName: (value: string) => void;
  businessLogo: File | null;
  setBusinessLogo: (file: File | null) => void;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  openImageModal: (imageUrl: string) => void;
}

const BusinessInfoSection: React.FC<BusinessInfoSectionProps> = ({
  selectedPlan,
  businessName,
  setBusinessName,
  businessLogo,
  setBusinessLogo,
  branches,
  setBranches,
  openImageModal,
}) => {
  return (
    <div className="bg-[#E8EFF0] mt-10 p-8 rounded-3xl shadow-xl border border-brand-primary/10">
      <h3 className="text-2xl font-semibold text-brand-primary text-center mb-6">
        Información del{" "}
        {selectedPlan === "usedCarDealer" ? "Autolote" : "Concesionario"}
      </h3>

      {/* 🔹 Nombre del negocio */}
      <label className="block text-[#1E2B2E] font-medium mb-1">
        Nombre del negocio
      </label>
      <input
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Ej. AutoStar CR"
        className="w-full border border-brand-primary/20 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary mb-5 bg-white"
      />

      {/* 🔹 Logo */}
      <label className="block text-[#1E2B2E] font-medium mb-1">Logo</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBusinessLogo(e.target.files?.[0] || null)}
        className="w-full border border-brand-primary/20 rounded-lg p-2 mb-3 bg-white"
      />
      {businessLogo && (
        <img
          src={URL.createObjectURL(businessLogo)}
          alt="Logo"
          onClick={() => openImageModal(URL.createObjectURL(businessLogo))}
          className="w-24 h-24 mt-2 object-cover rounded-lg border border-brand-primary/30 cursor-pointer hover:opacity-80 transition"
        />
      )}

      {/* 🔹 Sucursales */}
      <h4 className="text-[#1E2B2E] font-semibold mt-8 mb-2">Sucursales</h4>
      {branches.map((branch, i) => (
        <div
          key={i}
          className="border border-brand-primary/10 p-4 rounded-2xl bg-white mb-5 flex flex-col sm:flex-row sm:gap-4"
        >
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="Nombre de sucursal"
              value={branch.name}
              onChange={(e) =>
                setBranches((prev) =>
                  prev.map((b, idx) =>
                    idx === i ? { ...b, name: e.target.value } : b
                  )
                )
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary"
            />
            <textarea
              placeholder="Dirección de sucursal"
              value={branch.address}
              onChange={(e) =>
                setBranches((prev) =>
                  prev.map((b, idx) =>
                    idx === i ? { ...b, address: e.target.value } : b
                  )
                )
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary"
            />
            {branches.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setBranches((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Eliminar sucursal
              </button>
            )}
          </div>

          {/* 📸 Imagen sucursal */}
          <div className="flex flex-col items-center sm:w-40">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setBranches((prev) =>
                  prev.map((b, idx) =>
                    idx === i ? { ...b, photo: e.target.files?.[0] || null } : b
                  )
                )
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 bg-white"
            />
            {branch.photo && (
              <img
                src={URL.createObjectURL(branch.photo)}
                alt="Sucursal"
                onClick={() =>
                  openImageModal(URL.createObjectURL(branch.photo))
                }
                className="w-full h-24 object-cover rounded-md border border-brand-primary/30 cursor-pointer hover:opacity-80 transition"
              />
            )}
          </div>
        </div>
      ))}

      {/* ➕ Botón agregar */}
      <button
        onClick={() =>
          setBranches([...branches, { name: "", address: "", photo: null }])
        }
        className="text-brand-primary text-sm font-semibold hover:underline"
      >
        + Agregar otra sucursal
      </button>
    </div>
  );
};

export default BusinessInfoSection;
