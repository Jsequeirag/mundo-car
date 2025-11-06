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
  selectedStickers: Sticker[];
  setSelectedStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
  selectedStickerPlus: Sticker[];
  setSelectedStickerPlus: React.Dispatch<React.SetStateAction<Sticker[]>>;
  stickerOptions: Sticker[];
  stickerPlusOptions: Sticker[];
  handleStickerToggle: (sticker: Sticker) => void;
  handleStickerPlusToggle: (sticker: Sticker) => void;
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

          // 🔧 NO limpiar stickers Plus al cambiar el addon
          const handleAddonToggle = () => {
            setSelectedAddons((prev) => {
              alert(selectedAddons);
              const isSelected = prev.includes(addon.id);
              if (isSelected) {
                // Limpia solo los normales, no los plus
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
              <label
                onClick={handleAddonToggle}
                className="flex justify-between items-center cursor-pointer"
              >
                <span className="text-text-main font-medium flex flex-col sm:flex-row sm:items-center gap-1">
                  {addon.name}
                  <span className="text-brand-primary font-semibold">
                    {addon.price}
                  </span>
                </span>
              </label>

              {/* 🏷️ Opciones de Stickers */}
              {selectedAddons.includes(addon.id) && (
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
                        const isSelected = selectedList.some(
                          (s) => s.text === sticker.text
                        );

                        const isLimitReached =
                          isPlusAddon &&
                          selectedStickerPlus.length >= 3 &&
                          !selectedStickerPlus.some(
                            (s) => s.text === sticker.text
                          );

                        const anySelected = isPlusAddon
                          ? selectedStickerPlus.length > 0 && !isSelected
                          : selectedStickers.length > 0 && !isSelected;

                        const match = sticker.text.match(
                          /^(\p{Emoji_Presentation}|\p{Emoji}\ufe0f?|\p{Extended_Pictographic})/u
                        );
                        const emoji = match ? match[0] : "";
                        const text = sticker.text.replace(emoji, "").trim();

                        return (
                          <label
                            key={sticker.text}
                            className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase cursor-pointer transition-all
        text-white
        ${
          isPlusAddon
            ? "sticker-plus-gradient"
            : "sticker-normal bg-gradient-to-r from-[#04606A] via-[#034651] to-[#012F3C]"
        }
        ${
          isSelected
            ? "ring-2 ring-white ring-offset-2 ring-offset-brand-primary shadow-lg scale-105"
            : isLimitReached || anySelected
            ? "opacity-40 cursor-not-allowed"
            : "hover:scale-105 hover:brightness-110"
        }
      `}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isPlusAddon) {
                                  handleStickerPlusToggle(sticker);
                                } else {
                                  handleStickerToggle(sticker);
                                }
                              }}
                              className="hidden"
                              disabled={isLimitReached}
                            />

                            {emoji && (
                              <span
                                className={`text-sm ${
                                  isPlusAddon ? "animate-pulse" : ""
                                } text-yellow-400`}
                              >
                                {emoji}
                              </span>
                            )}

                            <span
                              className={`font-bold uppercase text-[11px] tracking-wide ${
                                isPlusAddon ? "sticker-dual-text" : "text-white"
                              }`}
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
                          </label>
                        );
                      }
                    )}
                  </div>

                  {/* 📝 Leyenda */}
                  <div className="mt-3 text-xs text-text-secondary font-semibold">
                    {isPlusAddon ? (
                      <span>
                        Puedes seleccionar hasta{" "}
                        <span className="text-brand-primary">
                          {selectedStickerPlus.length}
                        </span>{" "}
                        de 3 Stickers + Plus.
                      </span>
                    ) : (
                      <span>
                        Solo puedes seleccionar un (1) sticker llamativo.
                      </span>
                    )}
                  </div>
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
