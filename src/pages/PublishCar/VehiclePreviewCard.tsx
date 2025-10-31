import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, Heart, Crown } from "lucide-react";
import Flag from "react-flagkit";
import useCountryStore from "@/store/countryStore";

interface Sticker {
  text: string;
  color: string;
}

interface VehiclePreviewCardProps {
  planType: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  location: string;
  images: File[];
  selectedStickers: Sticker[]; // Sticker normales (uno)
  selectedStickerPlus: Sticker[]; // Stickers en movimiento
  selectedAddons?: string[];
}

const VehiclePreviewCard: React.FC<VehiclePreviewCardProps> = ({
  planType,
  brand,
  model,
  year,
  price,
  location,
  images,
  selectedStickers,
  selectedStickerPlus,
  selectedAddons = [],
}) => {
  const selectedCountry = localStorage.getItem("selectedCountry");
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null);
  const [isPlusSticker, setIsPlusSticker] = useState<boolean>(false);

  // 🌀 Combinar stickers normales + plus
  const allStickers: Sticker[] = [
    ...(selectedStickers || []),
    ...(selectedStickerPlus || []),
  ];

  // 🔁 Rotación automática de stickers
  useEffect(() => {
    if (!allStickers.length) {
      setCurrentSticker(null);
      return;
    }

    let i = 0;
    setCurrentSticker(allStickers[0]);
    setIsPlusSticker(
      selectedStickerPlus.some((s) => s.text === allStickers[0].text)
    );

    const interval = setInterval(() => {
      i = (i + 1) % allStickers.length;
      setCurrentSticker(allStickers[i]);
      setIsPlusSticker(
        selectedStickerPlus.some((s) => s.text === allStickers[i].text)
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [allStickers, selectedStickerPlus]);

  const imageSrc =
    images && images.length > 0
      ? URL.createObjectURL(images[0])
      : "/assets/no-image.png";

  // 🏁 Detectar si es Super Deluxe (por plan o addon)
  const isSuperDeluxe =
    planType.toLowerCase().includes("super deluxe") ||
    selectedAddons.some((a) =>
      [
        "superdeluxe",
        "superdeluxeventacar",
        "superdeluxedealer",
        "vehículos super deluxe",
      ].some((key) => a.toLowerCase().includes(key))
    );

  // ✨ Separar emoji y texto
  const stickerText = currentSticker?.text ?? ""; // siempre string
  const match =
    stickerText.match(
      /^(\p{Emoji_Presentation}|\p{Emoji}\ufe0f?|\p{Extended_Pictographic})/u
    ) || null;
  const emoji = match?.[0] ?? "";
  const text = emoji ? stickerText.slice(emoji.length).trim() : stickerText;
  return (
    <Card
      className={`group relative transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden 
        shadow-md hover:shadow-xl bg-[#F7FAFA]
        ${
          isSuperDeluxe
            ? "border-[3px] border-[#034651] shadow-[0_0_15px_rgba(3,70,81,0.35)]"
            : "border border-gray-300/30"
        }`}
      style={{ minWidth: "270px", maxWidth: "360px" }}
    >
      {/* 👑 SUPER DELUXE BADGE */}
      {isSuperDeluxe && (
        <div
          className="absolute z-20 top-3 left-3 flex items-center gap-2
            bg-gradient-to-r from-[#04606A] via-[#034651] to-[#012F3C]
            text-white font-semibold text-[11px] uppercase
            px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(3,70,81,0.4)]
            border border-[#E8EFF0]/10"
        >
          <Crown className="h-4 w-4 text-yellow-400 animate-pulse" />
          <span>Super Deluxe</span>
        </div>
      )}

      {/* 🖼️ Imagen principal */}
      <CardHeader className="p-0 relative z-10">
        {selectedStickerPlus.length > 0}
        <div className="relative overflow-hidden h-[220px] sm:h-[240px] md:h-[260px] rounded-t-2xl">
          <img
            src={imageSrc}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* ❤️ Favorito + Estado */}
          <div className="absolute z-20 top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-text-secondary hover:text-brand-primary rounded-full h-8 w-8 p-0 flex items-center justify-center shadow-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Badge className="bg-brand-primary text-white font-semibold rounded-full px-3 py-1 text-xs shadow-sm">
              Usado
            </Badge>
          </div>

          {/* 🏷️ Sticker dinámico / estático */}
          {currentSticker && (
            <div
              className={`absolute z-20 bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase 
                cursor-pointer transition-all ${currentSticker.color}
                bg-[length:400%_400%]
                ${
                  isPlusSticker
                    ? "animate-gradientFlash shadow-[0_0_10px_rgba(255,149,0,0.6)]"
                    : "shadow-[0_0_6px_rgba(0,0,0,0.3)]"
                }
                hover:scale-[1.06] hover:brightness-110`}
            >
              {emoji && (
                <span
                  className={`${
                    isPlusSticker ? "text-sm animate-bounce" : "text-sm"
                  }`}
                >
                  {emoji}
                </span>
              )}
              <span className="text-brand-primary font-semibold leading-tight">
                {text}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      {/* 🧾 Información */}
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold text-[#1E2B2E] mb-2 line-clamp-1">
          {year} {brand} {model}
        </CardTitle>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-1.5">
          <p className="text-2xl font-extrabold text-brand-primary tracking-tight">
            {price}
          </p>

          <div className="flex items-center text-[#4B5D60] text-sm">
            <MapPin className="h-4 w-4 mr-1 text-[#4B5D60]" />
            {location}
            <span className="ml-2">
              {selectedCountry && <Flag country={selectedCountry} size={16} />}
            </span>
          </div>
        </div>

        <Button className="w-full py-2 bg-brand-primary hover:bg-brand-hover text-white font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg rounded-lg">
          <Eye className="h-4 w-4 mr-2" />
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehiclePreviewCard;
