import React, { useState, useEffect } from "react";
import ModalContainer from "@/components/Modals/ModalContainer";

import useLanguageStore from "@/store/useLanguageStore";
import PlanVehicleData from "./PlanVehicleData";
// 🧩 Componentes separados
import PlanSelectorMain from "./PlanSelectorMain";
import PlanAddons from "./PlanAddons";
import VehicleDetails from "./VehicleDetails";
import VehicleEquipment from "./VehicleEquipment";
import VehiclePreviewCard from "./VehiclePreviewCard";
import TermsAndConditionsSection from "./TermsAndConditionsSection";
import BusinessInfoSection from "./BusinessInfoSection";
const PlanSelectorDetailed = () => {
  const { getTranslation } = useLanguageStore();
  interface Sticker {
    text: string;
    color: string;
  }
  const [vehicleData, setVehicleData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    location: "",
    images: [] as File[],
  });
  // Estados principales
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSubPlan, setSelectedSubPlan] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "stickerVentacar",
    "stickerPlusVentacar",
    "sticker",
    "stickerPlus",
    "stickerPlusDealer",
    "stickerDealer",
  ]);
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);
  const [selectedStickerPlus, setSelectedStickerPlus] = useState<Sticker[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const showWebsiteField = selectedAddons.includes("websiteLink");
  const alwaysShowWebsite = selectedPlan === "dealerShip";
  // Info negocio
  const [businessName, setBusinessName] = useState("");
  const [businessLogo, setBusinessLogo] = useState<File | null>(null);
  const [branches, setBranches] = useState<
    { name: string; address: string; photo: File | null }[]
  >([{ name: "", address: "", photo: null }]);
  const [sellerInfo, setSellerInfo] = useState({
    profilePhoto: null,
    name: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
  });
  // Modal de imagen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openImageModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  // Stickers
  const stickerOptions = [
    {
      text: "🔥 Oportunidad",
      color: "bg-gradient-to-r from-[#ffb300] via-[#ff6b00] to-[#ff2e00]", // naranja fuego
    },
    {
      text: "⚡ Rebajado",
      color: "bg-gradient-to-r from-[#ffd900] via-[#ffb100] to-[#ff7300]", // amarillo intenso
    },
    {
      text: "💬 Escucho Ofertas",
      color: "bg-gradient-to-r from-[#00b4db] via-[#0083b0] to-[#004e92]", // azul conversación
    },
    {
      text: "🌿 Impecable",
      color: "bg-gradient-to-r from-[#56ab2f] via-[#a8e063] to-[#56ab2f]", // verde limpio
    },
    {
      text: "🚗 Poco Uso",
      color: "bg-gradient-to-r from-[#009ffd] via-[#2a2a72] to-[#0f2027]", // azul oscuro
    },
    {
      text: "💰 Financiamiento",
      color: "bg-gradient-to-r from-[#11998e] via-[#38ef7d] to-[#11998e]", // verde dólar
    },
    {
      text: "🔁 Recibo Vehículo",
      color: "bg-gradient-to-r from-[#fc5c7d] via-[#6a82fb] to-[#fc5c7d]", // violeta-rosado
    },
    {
      text: "✨ Como Nuevo",
      color: "bg-gradient-to-r from-[#e0c3fc] via-[#8ec5fc] to-[#e0c3fc]", // pastel brillante
    },
    {
      text: "🧾 Papeles al Día",
      color: "bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#43cea2]", // azul-verde
    },
    {
      text: "🧍 Único Dueño",
      color: "bg-gradient-to-r from-[#8e2de2] via-[#4a00e0] to-[#8e2de2]", // morado
    },
    {
      text: "🏁 Full Equipado",
      color: "bg-gradient-to-r from-[#434343] via-[#000000] to-[#434343]", // negro carbono
    },
    {
      text: "💎 Edición Limitada",
      color: "bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00c6ff]", // azul brillante
    },
    {
      text: "🌟 Recién Llegado",
      color: "bg-gradient-to-r from-[#f7971e] via-[#ffd200] to-[#f7971e]", // dorado cálido
    },
    {
      text: "🚀 Vehículo Demo",
      color: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", // púrpura/rojo
    },
    {
      text: "🌎 EcoDrive",
      color: "bg-gradient-to-r from-[#0ba360] via-[#3cba92] to-[#0ba360]", // verde natural
    },
    {
      text: "🛞 Listo para Ruta",
      color: "bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]", // deportivo
    },
  ];
  const stickerPlusOptions = [
    {
      text: "🔥 Oferta Flash",
      color: "bg-gradient-to-r from-[#ff512f] via-[#dd2476] to-[#ff512f]", // rojo intenso
    },
    {
      text: "💎 Super Destacado",
      color: "bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00c6ff]", // azul brillante
    },
    {
      text: "⚡ Entrega Inmediata",
      color: "bg-gradient-to-r from-[#f7971e] via-[#ffd200] to-[#f7971e]", // dorado
    },
    {
      text: "🏁 Full Equipado",
      color: "bg-gradient-to-r from-[#434343] via-[#000000] to-[#434343]", // carbono
    },
    {
      text: "🚀 Nuevo Ingreso",
      color: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", // moderno
    },
    {
      text: "🌿 EcoDrive",
      color: "bg-gradient-to-r from-[#0ba360] via-[#3cba92] to-[#0ba360]", // verde ecológico
    },
    {
      text: "⭐ Edición Limitada",
      color: "bg-gradient-to-r from-[#f7971e] via-[#ffd200] to-[#f7971e]", // dorado estrella
    },
    {
      text: "💥 Descuento Activo",
      color: "bg-gradient-to-r from-[#ff6a00] via-[#ee0979] to-[#ff6a00]", // fucsia-rojo
    },
    {
      text: "🏆 Top Selección",
      color: "bg-gradient-to-r from-[#00b09b] via-[#96c93d] to-[#00b09b]", // verde lima
    },
    {
      text: "📅 Modelo 2025",
      color: "bg-gradient-to-r from-[#00c3ff] via-[#ffff1c] to-[#00c3ff]", // azul-lima
    },
  ];

  // Planes principales
  const plans = [
    {
      id: "independent",
      name: "Plan Independiente",
      description: "Todos nuestros planes incluyen IVA",
      options: [
        {
          id: "basic",
          title: "Básico",
          price: "₡2,000",
          details: [
            "Aparece en la galería general",
            "5 fotos",
            "No requiere confirmación",
          ],
        },
        {
          id: "deluxe",
          title: "Vehículos Deluxe",
          price: "₡8,900",
          details: [
            "Aparece según los criterios de búsqueda y en la página principal",
            "Aleatoriamente según la cantidad de VEHÍCULOS DELUXE",
            "8 FOTOS",
          ],
        },
        {
          id: "superdeluxe",
          title: "Vehículos SUPER DELUXE",
          price: "₡10,900",
          details: [
            "Aparece según los criterios de búsqueda y en la página principal",
            "En las publicaciones de nuestra página de Facebook e Instagram",
            "Las cuales se pautan para alcances a nivel nacional",
            "8 FOTOS y video",
          ],
        },
      ],
    },
    {
      id: "usedCarDealer",
      name: "Plan Agencia de Vehículos Usados",
      description: "Todos nuestros planes incluyen IVA",
      details: [
        "Aparece según los criterios de búsqueda y en la página principal",
        "Aleatoriamente según la cantidad de VEHÍCULOS Ventacar",
        "8 FOTOS",
        "1 video por vehículo",
      ],
      options: [
        { id: "0_5", label: "0 a 5 vehículos", price: "$85" },
        { id: "5_10", label: "5 a 10 vehículos", price: "$110" },
        { id: "10_15", label: "10 a 15 vehículos", price: "$150" },
        { id: "15_20", label: "15 a 20 vehículos", price: "$210" },
      ],
      extras: [
        {
          id: "superDeluxeVentacar",
          name: "Vehículos SUPER DELUXE",
          description:
            "Publicaciones con pauta nacional en Facebook e Instagram. Incluye 8 fotos y video.",
          price: "$5",
        },
        {
          id: "websiteLink",
          name: "Agregar enlace a página web",
          description: "Permite añadir el link de tu sitio o autolote.",
          price: "$20",
        },
      ],
    },
    {
      id: "dealerShip",
      name: "Plan Vendedor Concesionario",
      description: "Todos nuestros planes incluyen IVA",
      details: [
        "Aparece según los criterios de búsqueda y en la página principal",
        "Aleatoriamente según la cantidad de VEHÍCULOS del concesionario",
        "8 FOTOS",
        "1 video por vehículo",
        "Incluye enlace a sitio web del concesionario",
        "Publicaciones en Facebook e Instagram con pauta nacional. Incluye 8 fotos y video.",
      ],
      options: [
        {
          id: "unique",
          label: "Plan único",
          price: "$55",
        },
      ],
    },
  ];

  // Adicionales según plan
  const addons: Record<
    string,
    { id: string; name: string; price: string; description?: string }[]
  > = {
    independent: [
      { id: "sticker", name: "Sticker Llamativo", price: "₡2,250" },
      {
        id: "stickerPlus",
        name: "Sticker + Plus (en movimiento)",
        price: "₡3,250",
      },
    ],
    usedCarDealer: [
      { id: "stickerVentacar", name: "Sticker Llamativo", price: "$3" },
      {
        id: "stickerPlusVentacar",
        name: "Sticker + Plus (en movimiento)",
        price: "$5",
      },
    ],
    dealerShip: [
      { id: "stickerDealer", name: "Sticker Llamativo", price: "$3" },
      {
        id: "stickerPlusDealer",
        name: "Sticker + Plus (en movimiento)",
        price: "$5",
      },
    ],
  };

  // Guardar/recuperar plan del localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    const savedSubPlan = localStorage.getItem("selectedSubPlan");
    if (savedPlan) setSelectedPlan(savedPlan);
    if (savedSubPlan) setSelectedSubPlan(savedSubPlan);
  }, []);

  const handleSubPlanSelect = (planId: string, subPlanId: string) => {
    const uniqueSubPlanId = `${planId}_${subPlanId}`;
    setSelectedPlan(planId);
    setSelectedSubPlan(uniqueSubPlanId);
    localStorage.setItem("selectedPlan", planId);
    localStorage.setItem("selectedSubPlan", uniqueSubPlanId);
    setSelectedAddons([]); // ← pero se actualizarán si marca los adicionales
  };
  // Funciones stickers
  const handleStickerToggle = (sticker: Sticker) => {
    setSelectedStickers((prev) =>
      prev.some((s) => s.text === sticker.text) ? [] : [sticker]
    );
  };

  const handleStickerPlusToggle = (sticker: Sticker) => {
    setSelectedStickerPlus((prev) => {
      if (prev.some((s) => s.text === sticker.text)) {
        return prev.filter((s) => s.text !== sticker.text);
      }
      if (prev.length >= 3) {
        if (typeof window !== "undefined" && window.navigator.vibrate)
          window.navigator.vibrate(100);
        return prev;
      }
      return [...prev, sticker];
    });
  };

  const containerClasses = "mx-auto w-full max-w-[1200px]";
  const showBusinessSection =
    selectedPlan === "usedCarDealer" || selectedPlan === "dealerShip";

  return (
    <div className="min-h-screen font-sans">
      {/* 🔹 SELECCIÓN DE PLAN */}
      <PlanSelectorMain
        plans={plans}
        selectedPlan={selectedPlan}
        selectedSubPlan={selectedSubPlan}
        onSelectSubPlan={handleSubPlanSelect}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />
      {showBusinessSection && (
        <BusinessInfoSection
          selectedPlan={selectedPlan}
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessLogo={businessLogo}
          setBusinessLogo={setBusinessLogo}
          branches={branches}
          setBranches={setBranches}
          openImageModal={openImageModal}
          sellerInfo={sellerInfo}
          setSellerInfo={setSellerInfo}
          showWebsiteField={showWebsiteField}
          websiteUrl={websiteUrl}
          setWebsiteUrl={setWebsiteUrl}
          alwaysShowWebsite={alwaysShowWebsite}
        />
      )}
      {/* 🔹Vehiculo */}
      <PlanVehicleData
        selectedPlan={selectedPlan}
        selectedSubPlan={selectedSubPlan}
        vehicleData={vehicleData}
        setVehicleData={setVehicleData}
      />
      {/* 🔹Vehiculo detalles*/}
      <VehicleDetails />
      <VehicleEquipment />
      {/* 🔹 ADICIONALES Y STICKERS */}
      {selectedPlan && selectedSubPlan && (
        <PlanAddons
          selectedPlan={selectedPlan}
          addons={addons}
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
          selectedStickers={selectedStickers}
          setSelectedStickers={setSelectedStickers}
          selectedStickerPlus={selectedStickerPlus}
          setSelectedStickerPlus={setSelectedStickerPlus}
          stickerOptions={stickerOptions}
          stickerPlusOptions={stickerPlusOptions}
          handleStickerToggle={handleStickerToggle}
          handleStickerPlusToggle={handleStickerPlusToggle}
        />
      )}
      {/* 🔹 INFO NEGOCIO */}
      <div className="mt-10 flex justify-center">
        <VehiclePreviewCard
          planType={
            selectedSubPlan.includes("superdeluxe")
              ? "superdeluxe"
              : selectedSubPlan.includes("deluxe")
              ? "deluxe"
              : "basic"
          }
          brand={vehicleData.brand || "Marca"}
          model={vehicleData.model || "Modelo"}
          year={vehicleData.year || "Año"}
          price={
            vehicleData.price
              ? `₡${vehicleData.price.toLocaleString()}`
              : "₡0.00"
          }
          location={vehicleData.location || "Ubicación"}
          images={vehicleData.images}
          selectedAddons={selectedAddons}
          // STICKERS SELECCIONADOS (100% SEGUROS)
          selectedStickers={selectedStickers}
          selectedStickerPlus={selectedStickerPlus}
        />
      </div>
      {/* 🔹 MODAL IMAGEN */}
      <ModalContainer
        isOpen={isModalOpen}
        onClose={closeModal}
        showCloseButton
        width="40rem"
        maxWidth="95%"
        title="Vista previa"
      >
        {modalImage && (
          <div className="flex justify-center items-center">
            <img
              src={modalImage}
              alt="Vista previa"
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        )}
      </ModalContainer>
      <TermsAndConditionsSection />
    </div>
  );
};

export default PlanSelectorDetailed;
