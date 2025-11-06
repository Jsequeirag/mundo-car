import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, Heart, Crown } from "lucide-react";
import Flag from "react-flagkit";

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
  selectedStickers: Sticker[];
  selectedStickerPlus: Sticker[];
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
  const [imageUrl, setImageUrl] = useState<string>("/assets/no-image.png");

  // === ROTACIÓN DE STICKERS (igual que en PlanAddons) ===
  useEffect(() => {
    const allStickers: Sticker[] = [
      ...(selectedStickers || []),
      ...(selectedStickerPlus || []),
    ];

    if (allStickers.length === 0) {
      setCurrentSticker(null);
      setIsPlusSticker(false);
      return;
    }

    let index = 0;
    const updateSticker = () => {
      const sticker = allStickers[index];
      setCurrentSticker(sticker);
      setIsPlusSticker(
        selectedStickerPlus.some((s) => s.text === sticker.text)
      );
      index = (index + 1) % allStickers.length;
    };

    updateSticker();
    const interval = setInterval(updateSticker, 3500);
    return () => clearInterval(interval);
  }, [selectedStickers, selectedStickerPlus]);

  // === IMAGEN SEGURA ===
  useEffect(() => {
    if (images?.[0]) {
      const url = URL.createObjectURL(images[0]);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl("/assets/no-image.png");
    }
  }, [images]);

  // === SUPER DELUXE ===
  const isSuperDeluxe =
    planType.toLowerCase().includes("super") ||
    selectedAddons.some((a) =>
      ["superdeluxe", "super deluxe"].some((k) => a.toLowerCase().includes(k))
    );

  // === EXTRAER COLORES DEL GRADIENTE TAILWIND ===
  const extractColors = (color: string): string => {
    const from = color.match(/from-\[([^]+?)\]/)?.[1] || "#04606A";
    const via = color.match(/via-\[([^]+?)\]/)?.[1] || from;
    const to = color.match(/to-\[([^]+?)\]/)?.[1] || via;
    return `${from}, ${via}, ${to}`;
  };

  // === EMOJI + TEXTO ===
  const stickerText = currentSticker?.text ?? "";
  const match = stickerText.match(
    /^(\p{Emoji_Presentation}|\p{Emoji}\ufe0f?|\p{Extended_Pictographic})/u
  );
  const emoji = match?.[0] ?? "";
  const text = emoji ? stickerText.slice(emoji.length).trim() : stickerText;

  return (
    <Card
      className={`group relative transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-[#F7FAFA]
        ${
          isSuperDeluxe
            ? "border-[3px] border-[#034651] shadow-[0_0_15px_rgba(3,70,81,0.35)]"
            : "border border-gray-300/30"
        }`}
      style={{ minWidth: "270px", maxWidth: "360px" }}
    >
      {/* === BADGE SUPER DELUXE === */}
      {isSuperDeluxe && (
        <div className="absolute z-20 top-3 left-3 flex items-center gap-2 bg-gradient-to-r from-[#04606A] via-[#034651] to-[#012F3C] text-white font-semibold text-[11px] uppercase px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(3,70,81,0.4)] border border-[#E8EFF0]/10">
          <Crown className="h-4 w-4 text-yellow-400 animate-pulse" />
          <span>Super Deluxe</span>
        </div>
      )}

      <CardHeader className="p-0 relative z-10">
        <div className="relative overflow-hidden h-[220px] sm:h-[240px] md:h-[260px] rounded-t-2xl">
          <img
            src={imageUrl}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* === BOTONES SUPERIOR DERECHA === */}
          <div className="absolute z-20 top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-text-secondary hover:text-brand-primary rounded-full h-8 w-8 p-0 flex items-center justify-center shadow-sm backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Badge className="bg-brand-primary text-white font-semibold rounded-full px-3 py-1 text-xs shadow-sm">
              Usado
            </Badge>
          </div>

          {/* === STICKER ANIMADO (100% IGUAL QUE EN PlanAddons) === */}
          {currentSticker && (
            <div
              className={`
                absolute z-20 bottom-3 left-3 
                flex items-center gap-1.5 
                px-3 py-1 
                rounded-full 
                text-[11px] font-bold uppercase
                cursor-pointer 
                transition-all 
                duration-300
                bg-[length:400%_400%]
                ${
                  isPlusSticker
                    ? "sticker-plus-gradient animate-gradient-xy shadow-[0_0_15px_rgba(255,149,0,0.7)] ring-2 ring-white ring-offset-2 ring-offset-transparent"
                    : "sticker-normal bg-gradient-to-r from-[#04606A] via-[#034651] to-[#012F3C]"
                }
                hover:scale-105 hover:brightness-110
              `}
            >
              {/* Emoji con animación */}
              {emoji && (
                <span
                  className={`text-sm ${
                    isPlusSticker ? "animate-pulse" : ""
                  } text-yellow-400 drop-shadow-md`}
                >
                  {emoji}
                </span>
              )}

              {/* Texto con efecto dual (solo en Plus) */}
              <span
                className={`
                  font-bold uppercase text-[11px] tracking-wide
                  ${isPlusSticker ? "sticker-dual-text" : "text-white"}
                  drop-shadow-md
                `}
              >
                {text.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block ${
                      index % 2 === 0 ? "word-1" : "word-2"
                    } mx-[2px]`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

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
            {selectedCountry && (
              <Flag country={selectedCountry} size={16} className="ml-2" />
            )}
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
