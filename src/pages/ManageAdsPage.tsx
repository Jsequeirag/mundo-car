import React, { useState } from "react";
import { ChevronRight, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "@radix-ui/react-toast"; // ✅ Importar correctamente toast
import { Country } from "../interfaces/IUser";

// Tipos de datos
interface AdFormData {
  title: string;
  description: string;
  image: File | null;
  placement: "top" | "left" | "right" | "bottom";
  country: Country;
}

const ManageAdsPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AdFormData>({
    title: "",
    description: "",
    image: null,
    placement: "top",
    country: (countryCode as Country) || Country.Honduras,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 🔗 Genera rutas con prefijo del país
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  // 🧾 Maneja los cambios en inputs y selects
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼 Maneja cambio de imagen y genera preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // 🧩 Maneja selección visual de ubicación
  const handleSkeletonClick = (
    placement: "top" | "left" | "right" | "bottom"
  ) => {
    setFormData((prev) => ({ ...prev, placement }));
    toast.success(`Ubicación seleccionada: ${placement.toUpperCase()}`);
  };

  // 🚀 Envío de formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, image } = formData;

    if (!title || !description || !image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Crear FormData para enviar al backend correctamente
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("placement", formData.placement);
      data.append("country", formData.country);
      data.append("image", image);

      // Simulación de API call (reemplaza con tu endpoint real)
      console.log(
        "[ManageAds] Enviando anuncio:",
        Object.fromEntries(data.entries())
      );

      toast.success("Anuncio publicado con éxito!");
      navigate(getCountryPath("/dashboard"));
    } catch (err) {
      console.error("[ManageAds] Error al enviar:", err);
      toast.error("Error al publicar el anuncio.");
    }
  };

  // 🎨 Render principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🧾 Formulario */}
          <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl order-2 lg:order-1 flex-1">
            <h2 className="text-2xl font-extrabold text-[#034651] mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Crear Nueva Publicación
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition"
                  placeholder="Ej: Toyota Corolla 2020"
                />
              </div>

              {/* Descripción */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition h-32 resize-none"
                  placeholder="Describe el vehículo (estado, kilometraje, etc.)"
                />
              </div>

              {/* Imagen */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Imagen
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                  className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#034651]/10 file:text-[#034651] file:hover:bg-[#034651]/20"
                />
                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Vista previa"
                      className="w-full h-32 object-cover rounded-xl border border-[#034651]/10"
                    />
                  </div>
                )}
              </div>

              {/* País */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-[#034651]"
                >
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition"
                >
                  <option value={Country.Honduras}>Honduras</option>
                  <option value={Country.CostaRica}>Costa Rica</option>
                  <option value={Country.ElSalvador}>El Salvador</option>
                  <option value={Country.Guatemala}>Guatemala</option>
                  <option value={Country.Nicaragua}>Nicaragua</option>
                  <option value={Country.Panama}>Panamá</option>
                </select>
              </div>

              {/* Ubicación */}
              <div>
                <label
                  htmlFor="placement"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Ubicación del anuncio
                </label>
                <select
                  id="placement"
                  name="placement"
                  value={formData.placement}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition"
                >
                  <option value="top">Parte superior</option>
                  <option value="left">Lateral izquierdo</option>
                  <option value="right">Lateral derecho</option>
                  <option value="bottom">Parte inferior</option>
                </select>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#034651] text-white font-semibold p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-[#05707f] transition-all focus:outline-none focus:ring-2 focus:ring-[#034651]"
              >
                Publicar anuncio
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* 🧱 Previsualización de ubicaciones */}
          <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl order-1 lg:order-2">
            <h2 className="text-xl font-semibold text-[#034651] mb-6">
              Previsualización de Ubicación
            </h2>

            <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Parte superior */}
                <div
                  className={`relative h-16 w-full rounded-xl overflow-hidden border-2 cursor-pointer mb-2 transition-all ${
                    formData.placement === "top"
                      ? "border-[#034651] bg-[#034651]/10"
                      : "border-[#034651]/20 bg-gray-200"
                  }`}
                  onClick={() => handleSkeletonClick("top")}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-sm">
                    Parte superior - {formData.country}
                  </div>
                </div>

                {/* Zona media */}
                <div className="flex-1 flex">
                  {/* Lateral izquierdo */}
                  <div
                    className={`relative h-full w-24 rounded-xl overflow-hidden border-2 cursor-pointer mr-2 transition-all ${
                      formData.placement === "left"
                        ? "border-[#034651] bg-[#034651]/10"
                        : "border-[#034651]/20 bg-gray-200"
                    }`}
                    onClick={() => handleSkeletonClick("left")}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-xs text-center p-1">
                      Lateral izquierdo - {formData.country}
                    </div>
                  </div>

                  {/* Contenido central */}
                  <div className="flex-1 bg-white/50 rounded-lg p-4 flex items-center justify-center text-[#034651]/80 mr-2 text-sm">
                    Contenido principal
                  </div>

                  {/* Lateral derecho */}
                  <div
                    className={`relative h-full w-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      formData.placement === "right"
                        ? "border-[#034651] bg-[#034651]/10"
                        : "border-[#034651]/20 bg-gray-200"
                    }`}
                    onClick={() => handleSkeletonClick("right")}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-xs text-center p-1">
                      Lateral derecho - {formData.country}
                    </div>
                  </div>
                </div>

                {/* Parte inferior */}
                <div
                  className={`relative h-16 w-full rounded-xl overflow-hidden border-2 cursor-pointer mt-2 transition-all ${
                    formData.placement === "bottom"
                      ? "border-[#034651] bg-[#034651]/10"
                      : "border-[#034651]/20 bg-gray-200"
                  }`}
                  onClick={() => handleSkeletonClick("bottom")}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-sm">
                    Parte inferior - {formData.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#034651] text-white py-5 text-center">
        <p className="text-xs opacity-90">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default ManageAdsPage;
