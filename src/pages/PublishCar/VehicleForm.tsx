import React, { useState, useRef } from "react";
import ModalContainer from "@/components/ModalContainer";

interface VehicleFormProps {
  maxImages: number;
  maxVideos: number;
  vehicleData: any;
  setVehicleData: React.Dispatch<React.SetStateAction<any>>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  maxImages,
  maxVideos,
  vehicleData,
  setVehicleData,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  const openModal = (src: string, video = false) => {
    setPreviewSrc(src);
    setIsVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPreviewSrc(null);
    setIsVideo(false);
    setIsModalOpen(false);
  };

  // 🔹 Cambios en datos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicleData((prev: any) => ({ ...prev, [name]: value }));
  };

  // 🖼️ Imágenes
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total = [...(vehicleData.images || []), ...files].slice(0, maxImages);
    setVehicleData((prev: any) => ({ ...prev, images: total }));
  };

  const handleRemoveImage = (index: number) => {
    const updated = (vehicleData.images || []).filter(
      (_: any, i: number) => i !== index
    );
    setVehicleData((prev: any) => ({ ...prev, images: updated }));
  };

  // 🎥 Videos
  const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total = [...(vehicleData.videos || []), ...files].slice(0, maxVideos);
    setVehicleData((prev: any) => ({ ...prev, videos: total }));
  };

  const handleRemoveVideo = (index: number) => {
    const updated = (vehicleData.videos || []).filter(
      (_: any, i: number) => i !== index
    );
    setVehicleData((prev: any) => ({ ...prev, videos: updated }));
  };

  return (
    <form className="space-y-8">
      {/* --- DATOS PRINCIPALES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            label: "Marca",
            name: "brand",
            options: ["TOYOTA", "HONDA"],
          },
          {
            label: "Modelo",
            name: "model",
            options:
              vehicleData.brand === "TOYOTA"
                ? ["HILUX", "COROLLA"]
                : vehicleData.brand === "HONDA"
                ? ["CIVIC"]
                : [],
          },
          {
            label: "Combustible",
            name: "fuel",
            options: ["Gasolina", "Diesel", "Híbrido", "Eléctrico"],
          },
          {
            label: "Ubicación",
            name: "location",
            options: ["San José", "Alajuela", "Cartago", "Heredia"],
          },
          {
            label: "Condición",
            name: "condition",
            options: ["Nuevo", "Usado"],
          },
        ].map(({ label, name, options }) => (
          <div key={name}>
            <label className="block text-text-secondary font-medium mb-1">
              {label}
            </label>
            <select
              name={name}
              value={vehicleData[name] || ""}
              onChange={handleChange}
              className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
            >
              <option value="">Seleccione</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Año */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Año
          </label>
          <input
            type="number"
            name="year"
            value={vehicleData.year || ""}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Precio (₡)
          </label>
          <input
            type="number"
            name="price"
            value={vehicleData.price || ""}
            onChange={handleChange}
            placeholder="0"
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Kilometraje */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Kilometraje
          </label>
          <input
            type="number"
            name="mileage"
            value={vehicleData.mileage || ""}
            onChange={handleChange}
            placeholder="0"
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Transmisión */}
        <div>
          <label className="block text-text-secondary font-medium mb-1">
            Transmisión
          </label>
          <select
            name="transmission"
            value={vehicleData.transmission || ""}
            onChange={handleChange}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-card text-text-main focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="">Seleccione</option>
            <option value="Automática">Automática</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
      </div>

      {/* --- IMÁGENES --- */}
      <div className="bg-brand-card p-5 rounded-2xl shadow-sm border border-brand-primary/10">
        <label className="block text-text-secondary font-medium mb-2">
          Imágenes ({vehicleData.images?.length || 0}/{maxImages})
        </label>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          disabled={(vehicleData.images?.length || 0) >= maxImages}
          className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-form text-text-main focus:ring-2 focus:ring-brand-primary disabled:opacity-60"
        />

        <div className="flex flex-wrap gap-4 mt-3">
          {(vehicleData.images || []).map((file: File, index: number) => (
            <div
              key={index}
              className="relative flex flex-col items-center w-32 sm:w-40 group hover:scale-[1.03] transition-transform"
            >
              <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden border border-brand-primary/20 shadow-md bg-brand-bg">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Imagen ${index + 1}`}
                  onClick={() => openModal(URL.createObjectURL(file))}
                  className="w-full h-full object-cover cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-brand-primary text-white rounded-full px-2.5 py-1 text-xs font-bold shadow-md hover:bg-brand-hover transition"
                >
                  ✕
                </button>
              </div>
              <span className="text-xs text-text-secondary mt-1 italic group-hover:text-brand-primary transition-colors">
                🔍 Click para ampliar
              </span>
            </div>
          ))}
        </div>

        {(vehicleData.images?.length || 0) >= maxImages && (
          <p className="text-xs text-red-600 mt-2 font-medium">
            Has alcanzado el máximo permitido ({maxImages})
          </p>
        )}
      </div>

      {/* --- VIDEOS --- */}
      {maxVideos > 0 && (
        <div className="bg-brand-card p-5 rounded-2xl shadow-sm border border-brand-primary/10">
          <label className="block text-text-secondary font-medium mb-2">
            Videos ({vehicleData.videos?.length || 0}/{maxVideos})
          </label>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideosChange}
            disabled={(vehicleData.videos?.length || 0) >= maxVideos}
            className="w-full border border-brand-primary/20 rounded-lg p-2.5 bg-brand-form text-text-main focus:ring-2 focus:ring-brand-primary disabled:opacity-60"
          />

          <div className="flex flex-wrap gap-4 mt-3">
            {(vehicleData.videos || []).map((file: File, index: number) => (
              <div
                key={index}
                className="relative flex flex-col items-center w-40 sm:w-56 group hover:scale-[1.03] transition-transform"
              >
                <div className="relative w-full h-28 sm:h-36 rounded-xl overflow-hidden border border-brand-primary/20 shadow-md bg-brand-bg">
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    onClick={() => openModal(URL.createObjectURL(file), true)}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    className="absolute top-2 right-2 bg-brand-primary text-white rounded-full px-2.5 py-1 text-xs font-bold shadow-md hover:bg-brand-hover transition"
                  >
                    ✕
                  </button>
                </div>
                <span className="text-xs text-text-secondary mt-1 italic group-hover:text-brand-primary transition-colors">
                  🎬 Click para ampliar
                </span>
              </div>
            ))}
          </div>

          {(vehicleData.videos?.length || 0) >= maxVideos && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              Has alcanzado el máximo permitido ({maxVideos})
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      <ModalContainer
        isOpen={isModalOpen}
        onClose={closeModal}
        width="48rem"
        maxWidth="95%"
        title={isVideo ? "Vista previa del video" : "Vista previa de la imagen"}
      >
        {previewSrc && (
          <div className="flex justify-center items-center">
            {isVideo ? (
              <video
                src={previewSrc}
                controls
                className="max-h-[75vh] rounded-xl shadow-xl"
              />
            ) : (
              <img
                src={previewSrc}
                alt="Vista previa"
                className="max-h-[75vh] rounded-xl shadow-xl"
              />
            )}
          </div>
        )}
      </ModalContainer>
    </form>
  );
};

export default VehicleForm;
