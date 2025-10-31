import React from "react";

interface Sticker {
  text: string;
  color: string;
}

interface PlanAddonsProps {
  selectedPlan: string;
  addons: Record<
    string,
    { id: string; name: string; price: string; description?: string }[]
  >;
  selectedAddons: string[];
  setSelectedAddons: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStickers: string[];
  setSelectedStickers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStickerPlus: string[];
  setSelectedStickerPlus: React.Dispatch<React.SetStateAction<string[]>>;
  stickerOptions: Sticker[];
  stickerPlusOptions: Sticker[];
  handleStickerToggle: (sticker: string) => void;
  handleStickerPlusToggle: (sticker: string) => void;
}

const PlanAddons: React.FC<PlanAddonsProps> = ({
  selectedPlan,
  addons,
  selectedAddons,
  setSelectedAddons,
  selectedStickers,
  setSelectedStickers,
  selectedStickerPlus,
  setSelectedStickerPlus,
  stickerOptions,
  stickerPlusOptions,
  handleStickerToggle,
  handleStickerPlusToggle,
}) => {
  // ⚙️ Control interno: solo un sticker normal permitido
  const handleSingleStickerToggle = (sticker: string) => {
    setSelectedStickers((prev) => (prev.includes(sticker) ? [] : [sticker]));
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto w-full max-w-[1200px] bg-brand-form mt-12 p-8 rounded-3xl shadow-md border border-brand-primary/10"
    >
      <h3 className="text-2xl font-semibold text-brand-primary text-center mb-6 border-b border-brand-primary/10 pb-2">
        Adicionales y Stickers
      </h3>

      <div className="space-y-5">
        {addons[selectedPlan]?.map((addon) => {
          const isStickerAddon = addon.id.toLowerCase().includes("sticker");
          const isPlusAddon = addon.id.toLowerCase().includes("plus");

          const handleAddonToggle = () => {
            setSelectedAddons((prev) => {
              const isSelected = prev.includes(addon.id);
              if (isSelected) {
                // 🧹 Si el addon se desactiva, limpiar stickers relacionados
                if (isPlusAddon) setSelectedStickerPlus([]);
                if (!isPlusAddon && isStickerAddon) setSelectedStickers([]);
                return prev.filter((id) => id !== addon.id);
              } else {
                return [...prev, addon.id];
              }
            });
          };

          return (
            <div
              key={addon.id}
              className={`border rounded-xl p-5 transition-all shadow-sm ${
                selectedAddons.includes(addon.id)
                  ? "border-brand-primary bg-brand-card shadow-md"
                  : "border-brand-primary/10 hover:border-brand-primary/40 bg-brand-card"
              }`}
            >
              {/* 🔘 Checkbox principal */}
              <label className="flex justify-between items-center cursor-pointer">
                <span className="text-text-main font-medium flex flex-col sm:flex-row sm:items-center gap-1">
                  {addon.name}
                  <span className="text-brand-primary font-semibold">
                    {addon.price}
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={handleAddonToggle}
                  className="w-5 h-5 accent-brand-primary"
                />
              </label>
              {selectedStickerPlus}
              {/* 🏷️ Opciones de Stickers */}
              {isStickerAddon && selectedAddons.includes(addon.id) && (
                <div className="mt-5 pl-3">
                  <p className="text-sm text-text-secondary mb-3 font-semibold">
                    {isPlusAddon
                      ? "Elige hasta 3 Stickers + Plus (con movimiento) — ¡Promoción 3x1!"
                      : "Elige un Sticker llamativo:"}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {(isPlusAddon ? stickerPlusOptions : stickerOptions).map(
                      (sticker) => {
                        const selectedList = isPlusAddon
                          ? selectedStickerPlus
                          : selectedStickers;
                        const toggleFn = isPlusAddon
                          ? handleStickerPlusToggle
                          : handleSingleStickerToggle;

                        const limitReached =
                          isPlusAddon &&
                          selectedStickerPlus.length >= 3 &&
                          !selectedStickerPlus.includes(sticker.text);

                        // Separar emoji y texto
                        const match = sticker.text.match(
                          /^(\p{Emoji_Presentation}|\p{Emoji}\ufe0f?|\p{Extended_Pictographic})/u
                        );
                        const emoji = match ? match[0] : "";
                        const text = sticker.text.replace(emoji, "").trim();

                        return (
                          <label
                            key={sticker.text}
                            className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase cursor-pointer transition-all
                              ${sticker.color}
                              bg-[length:400%_400%] ${
                                isPlusAddon ? "animate-gradientFlash" : ""
                              }
                              shadow-[0_0_8px_rgba(255,149,0,0.6)]
                              hover:scale-[1.06] hover:brightness-110
                              ${
                                selectedList.includes(sticker.text)
                                  ? "ring-2 ring-offset-1 ring-brand-primary"
                                  : "opacity-95"
                              }
                              ${
                                limitReached
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={selectedList.includes(sticker.text)}
                              onChange={() => toggleFn(sticker.text)}
                              className="hidden"
                            />

                            {/* ✨ Emoji */}
                            {emoji && (
                              <span
                                className={`${
                                  isPlusAddon
                                    ? "text-sm animate-bounce"
                                    : "text-sm"
                                }`}
                              >
                                {emoji}
                              </span>
                            )}

                            {/* Texto */}
                            <span className=" font-semibold leading-tight text-brand-primary">
                              {text}
                            </span>
                          </label>
                        );
                      }
                    )}
                  </div>

                  {isPlusAddon && (
                    <p className="text-xs text-text-secondary font-semibold mt-2">
                      {selectedStickerPlus.length}/3 seleccionados
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default PlanAddons;
