import React from "react";
import { X, ImagePlus } from "lucide-react";
import useLanguageStore from "@/store/useLanguageStore";

interface Branch {
  name: string;
  address: string;
  photo: File | null;
}

interface Seller {
  profilePhoto: File | null;
  name: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
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
  sellerInfo?: Seller;
  setSellerInfo?: React.Dispatch<React.SetStateAction<Seller>>;
  showWebsiteField: boolean;
  alwaysShowWebsite: boolean;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
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
  sellerInfo,
  setSellerInfo,
  showWebsiteField,
  alwaysShowWebsite,
  websiteUrl,
  setWebsiteUrl,
}) => {
  const { getTranslation, language } = useLanguageStore();
  const isDealer = selectedPlan === "dealerShip";

  return (
    <div className="bg-[#E8EFF0] mt-10 p-8 rounded-3xl shadow-xl border border-brand-primary/10">
      <h3 className="text-2xl font-semibold text-brand-primary text-center mb-8">
        Información del{" "}
        {selectedPlan === "usedCarDealer"
          ? "Autolote"
          : selectedPlan === "dealerShip"
          ? "Concesionario"
          : "Negocio"}
      </h3>

      {/* 🏷️ LOGO - centrado arriba */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-brand-primary/40 bg-white flex items-center justify-center overflow-hidden shadow-sm hover:border-brand-primary transition-all cursor-pointer">
          {businessLogo ? (
            <>
              <img
                src={URL.createObjectURL(businessLogo)}
                alt="Logo"
                onClick={() =>
                  openImageModal(URL.createObjectURL(businessLogo))
                }
                className="w-full h-full object-cover rounded-lg hover:opacity-90 transition"
              />
              <button
                type="button"
                onClick={() => setBusinessLogo(null)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center text-gray-400 text-sm cursor-pointer">
              <ImagePlus className="h-6 w-6 mb-1" />
              Agregar logo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBusinessLogo(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* 🧾 Nombre del negocio */}
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
      {/* 🌐 Campo sitio web opcional */}
      {(showWebsiteField || alwaysShowWebsite) && (
        <>
          <label className="block text-[#1E2B2E] font-medium mb-1 mt-4">
            Sitio web del negocio
          </label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://www.mi-concesionario.com"
            className="w-full border border-brand-primary/20 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary mb-5 bg-white"
          />
        </>
      )}
      {/* =============== SECCIÓN VENDEDOR (solo para Concesionario) =============== */}
      {isDealer && sellerInfo && setSellerInfo && (
        <>
          <h4 className="text-[#1E2B2E] font-semibold mt-10 mb-4 text-center">
            Información del Vendedor
          </h4>

          {/* 📸 Foto de perfil */}
          <div className="flex justify-center mb-5">
            <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-brand-primary/40 bg-white flex items-center justify-center overflow-hidden cursor-pointer hover:border-brand-primary transition-all">
              {sellerInfo.profilePhoto ? (
                <>
                  <img
                    src={URL.createObjectURL(sellerInfo.profilePhoto)}
                    alt="Vendedor"
                    onClick={() =>
                      openImageModal(
                        URL.createObjectURL(sellerInfo.profilePhoto)
                      )
                    }
                    className="w-full h-full object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSellerInfo({ ...sellerInfo, profilePhoto: null })
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center text-gray-400 text-xs cursor-pointer">
                  <ImagePlus className="h-5 w-5 mb-1" />
                  Agregar foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSellerInfo({
                        ...sellerInfo,
                        profilePhoto: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Campos del vendedor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del vendedor"
              value={sellerInfo.name}
              onChange={(e) =>
                setSellerInfo({ ...sellerInfo, name: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary bg-white"
            />
            <input
              type="tel"
              placeholder="Número de teléfono"
              value={sellerInfo.phone}
              onChange={(e) =>
                setSellerInfo({ ...sellerInfo, phone: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary bg-white"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={sellerInfo.email}
              onChange={(e) =>
                setSellerInfo({ ...sellerInfo, email: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary bg-white"
            />
            <input
              type="text"
              placeholder="Facebook (opcional)"
              value={sellerInfo.facebook}
              onChange={(e) =>
                setSellerInfo({ ...sellerInfo, facebook: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary bg-white"
            />
            <input
              type="text"
              placeholder="Instagram (opcional)"
              value={sellerInfo.instagram}
              onChange={(e) =>
                setSellerInfo({ ...sellerInfo, instagram: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary bg-white"
            />
          </div>
        </>
      )}
      {/* =============== SECCIÓN SUCURSALES (solo para Autolote) =============== */}

      <>
        <h4 className="text-[#1E2B2E] font-semibold mt-10 mb-3 text-center">
          Sucursales
        </h4>
        {branches.map((branch, i) => (
          <div
            key={i}
            className="border border-brand-primary/10 p-5 rounded-2xl bg-white mb-6 shadow-sm flex flex-col items-center"
          >
            {/* 📸 Imagen centrada arriba */}
            <div className="relative w-36 h-28 rounded-lg border-2 border-dashed border-brand-primary/40 bg-[#F7FAFA] flex items-center justify-center overflow-hidden hover:border-brand-primary transition-all cursor-pointer mb-4">
              {branch.photo ? (
                <>
                  <img
                    src={URL.createObjectURL(branch.photo)}
                    alt="Sucursal"
                    onClick={() =>
                      openImageModal(URL.createObjectURL(branch.photo))
                    }
                    className="w-full h-full object-cover rounded-md hover:opacity-90 transition"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setBranches((prev) =>
                        prev.map((b, idx) =>
                          idx === i ? { ...b, photo: null } : b
                        )
                      )
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center text-gray-400 text-xs cursor-pointer">
                  <ImagePlus className="h-5 w-5 mb-1" />
                  Agregar imagen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setBranches((prev) =>
                        prev.map((b, idx) =>
                          idx === i
                            ? { ...b, photo: e.target.files?.[0] || null }
                            : b
                        )
                      )
                    }
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* 🏷️ Campos de nombre y dirección */}
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary mb-2"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary mb-3"
            />
            {!isDealer && (
              <>
                {/* ❌ Eliminar sucursal */}
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
              </>
            )}
          </div>
        ))}
        {/* ➕ Botón agregar sucursal */}{" "}
        {!isDealer && (
          <div className="text-center">
            <button
              onClick={() =>
                setBranches([
                  ...branches,
                  { name: "", address: "", photo: null },
                ])
              }
              className="text-brand-primary text-sm font-semibold hover:underline"
            >
              + Agregar otra sucursal
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default BusinessInfoSection;
