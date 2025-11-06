import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  FileText,
  ShoppingCart,
  Edit3,
  Trash2,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAdsStore from "@/store/useAdsStore";
import Flag from "react-flagkit";
import { Country } from "../interfaces/IUser";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileSidebar";
import Footer from "@/components/Footer";
import ModalContainer from "@/components/Modals/ModalContainer";

type Placement = "hero" | "top" | "left" | "right" | "bottom";
type MediaType = "image" | "video";

interface AdFormData {
  title: string;
  description: string;
  file: File | null;
  placement: Placement;
  mediaType: MediaType;
  country: Country;
}

const ManageAdsPage: React.FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode?: string }>();
  const {
    addPublication,
    editPublication,
    deletePublication,
    toggleCart,
    publications,
    getCartItems,
    getPublicationsTotal,
    markAsPaid,
    calculatePrice,
    loadFromLocal,
  } = useAdsStore();

  const selectedCountry =
    (localStorage.getItem("selectedCountry") as Country) ||
    (countryCode as Country) ||
    Country.Honduras;

  const [formData, setFormData] = useState<AdFormData>({
    title: "",
    description: "",
    file: null,
    placement: "top",
    mediaType: "image",
    country: selectedCountry,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalMedia, setModalMedia] = useState<{
    type: MediaType;
    src: string;
  } | null>(null);

  useEffect(() => {
    loadFromLocal();
  }, [loadFromLocal]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else setPreview(null);
  };

  const handlePlacementClick = (placement: Placement) => {
    if (placement === "top" || placement === "bottom") {
      if (formData.mediaType === "video") {
        toast.info("Las zonas superior e inferior solo permiten imágenes.");
        setFormData((prev) => ({ ...prev, mediaType: "image" }));
      }
    }
    setFormData((prev) => ({ ...prev, placement }));
    toast.success(`Ubicación seleccionada: ${placement.toUpperCase()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, file, placement, mediaType, country } =
      formData;

    if (!title || !description || (!file && !editingId)) {
      toast.error("Completa todos los campos requeridos.");
      return;
    }

    const newAd = {
      title,
      description,
      imageUrl: preview || "",
      mediaType,
      placement,
      country,
      duration: 7,
    };

    if (editingId) {
      editPublication(editingId, newAd);
      toast.success("Anuncio actualizado correctamente.");
      setEditingId(null);
    } else {
      addPublication(newAd);
      toast.success("Anuncio agregado correctamente.");
    }

    setFormData({
      title: "",
      description: "",
      file: null,
      placement: "top",
      mediaType: "image",
      country: selectedCountry,
    });
    setPreview(null);
  };

  const handleEdit = (id: string) => {
    const ad = publications.find((p) => p.id === id);
    if (!ad) return;
    setFormData({
      title: ad.title,
      description: ad.description,
      file: null,
      placement: ad.placement as Placement,
      mediaType: ad.mediaType,
      country: ad.country as Country,
    });
    setPreview(ad.imageUrl || null);
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    deletePublication(id);
    toast.success("Anuncio eliminado.");
  };

  const price = calculatePrice(formData.placement, formData.mediaType);

  return (
    <>
      <Header currentCountryCode={selectedCountry} />
      <MobileNav currentCountryCode={selectedCountry} />

      {/* Contenido principal con padding superior para no tapar el header */}
      <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Botón Atrás - ahora visible y bien posicionado */}

          <button
            onClick={() => navigate(-1)}
            className="mt-8 flex items-center gap-2   mb-8 hover:underline font-medium px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-hover transition-all duration-300  shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Regresar
          </button>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* FORMULARIO */}
            <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl flex-1 order-3 lg:order-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrablack text-[#034651] flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  {editingId ? "Editar Publicación" : "Crear Nueva Publicación"}
                </h2>
                <div className="flex items-center text-[#4B5D60] text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {formData.country}
                  <span className="ml-2">
                    <Flag country={formData.country} size={16} />
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#034651] mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] transition-all"
                    placeholder="Ej: Promoción de autos 2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#034651] mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] h-32 resize-none transition-all"
                    placeholder="Describe brevemente el anuncio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#034651] mb-1">
                    Tipo de medio
                  </label>
                  <select
                    name="mediaType"
                    value={formData.mediaType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] transition-all"
                  >
                    <option value="image">Imagen</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#034651] mb-1">
                    {formData.mediaType === "image"
                      ? "Subir imagen"
                      : "Subir video"}
                  </label>
                  <input
                    type="file"
                    accept={
                      formData.mediaType === "image" ? "image/*" : "video/*"
                    }
                    onChange={handleFileChange}
                    required={!editingId}
                    className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#034651]/10 file:text-[#034651] hover:file:bg-[#034651]/20 transition-all"
                  />
                  {preview && (
                    <div className="mt-3">
                      {formData.mediaType === "image" ? (
                        <img
                          src={preview}
                          alt="Vista previa"
                          className="w-full h-40 object-cover rounded-xl border border-[#034651]/10"
                        />
                      ) : (
                        <video
                          src={preview}
                          controls
                          className="w-full h-48 rounded-xl border border-[#034651]/10"
                        />
                      )}
                    </div>
                  )}
                </div>

                <p className="text-[#034651]/80 text-sm">
                  Precio estimado: <strong>${price.toFixed(2)}</strong>
                </p>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#034651] text-white font-semibold py-3 rounded-xl shadow-sm hover:bg-[#05707f] transition-all duration-200"
                >
                  {editingId ? "Actualizar anuncio" : "Guardar anuncio"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* PREVISUALIZACIÓN */}
            <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl order-1 lg:order-2 lg:w-96">
              <h2 className="text-xl font-semibold text-[#034651] mb-1">
                Previsualización de Ubicación
              </h2>{" "}
              <h2 className="italic text-[#034651] mb-6">
                Seleccionar posición del anuncio
              </h2>
              <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-[#034651]/10">
                <div className="flex flex-col h-full p-3 gap-3">
                  {/* HERO */}
                  <div
                    className={`relative h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      formData.placement === "hero"
                        ? "border-[#034651] bg-[#034651]/10"
                        : "border-[#034651]/20 bg-gray-200"
                    }`}
                    onClick={() => handlePlacementClick("hero")}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-xs font-medium">
                      HERO (Img o Video)
                    </div>
                  </div>

                  {/* TOP */}
                  <div
                    className={`relative h-12 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      formData.placement === "top"
                        ? "border-[#034651] bg-[#034651]/10"
                        : "border-[#034651]/20 bg-gray-200"
                    }`}
                    onClick={() => handlePlacementClick("top")}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-xs">
                      Parte superior (Solo imagen)
                    </div>
                  </div>

                  {/* ZONA MEDIA */}
                  <div className="flex-1 flex gap-2">
                    <div
                      className={`relative w-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        formData.placement === "left"
                          ? "border-[#034651] bg-[#034651]/10"
                          : "border-[#034651]/20 bg-gray-200"
                      }`}
                      onClick={() => handlePlacementClick("left")}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-[10px] text-center p-1">
                        Izquierdo
                      </div>
                    </div>
                    <div className="flex-1 bg-white/60 rounded-lg flex items-center justify-center text-[#034651]/70 text-xs font-medium">
                      Contenido principal
                    </div>
                    <div
                      className={`relative w-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        formData.placement === "right"
                          ? "border-[#034651] bg-[#034651]/10"
                          : "border-[#034651]/20 bg-gray-200"
                      }`}
                      onClick={() => handlePlacementClick("right")}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-[10px] text-center p-1">
                        Derecho
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div
                    className={`relative h-12 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      formData.placement === "bottom"
                        ? "border-[#034651] bg-[#034651]/10"
                        : "border-[#034651]/20 bg-gray-200"
                    }`}
                    onClick={() => handlePlacementClick("bottom")}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[#034651]/60 text-xs">
                      Parte inferior (Solo imagen)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PUBLICACIONES + CARRITO */}
            <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl order-2 lg:order-3 lg:w-[420px]">
              <h2 className="text-xl font-semibold text-[#034651] mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Mis Publicaciones
              </h2>

              {publications.length === 0 ? (
                <p className="text-[#034651]/60 text-sm text-center py-8">
                  No tienes anuncios aún.
                </p>
              ) : (
                <>
                  <div className="max-h-[320px] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-[#034651]/30">
                    {publications.map((ad) => (
                      <div
                        key={ad.id}
                        className="flex items-center justify-between border border-[#034651]/10 rounded-xl p-3 hover:bg-[#034651]/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {ad.mediaType === "image" ? (
                            <img
                              src={ad.imageUrl}
                              onClick={() =>
                                setModalMedia({
                                  type: "image",
                                  src: ad.imageUrl,
                                })
                              }
                              className="w-14 h-14 object-cover rounded-lg border border-[#034651]/10 cursor-pointer hover:opacity-80 transition"
                              alt={ad.title}
                            />
                          ) : (
                            <video
                              src={ad.imageUrl}
                              onClick={() =>
                                setModalMedia({
                                  type: "video",
                                  src: ad.imageUrl,
                                })
                              }
                              className="w-14 h-14 object-cover rounded-lg border border-[#034651]/10 cursor-pointer hover:opacity-80 transition"
                              muted
                            />
                          )}
                          <div>
                            <p className="font-semibold text-[#034651] text-sm line-clamp-1">
                              {ad.title}
                            </p>
                            <p className="text-xs text-[#034651]/60">
                              {ad.mediaType} • {ad.placement} • ${ad.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleEdit(ad.id)}
                            className="p-2 bg-[#034651]/10 rounded-lg hover:bg-[#034651]/20 transition"
                            title="Editar"
                          >
                            <Edit3 className="w-4 h-4 text-[#034651]" />
                          </button>
                          <button
                            onClick={() => handleDelete(ad.id)}
                            className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                          <button
                            onClick={() => {
                              toggleCart(ad.id);
                              toast.success(
                                ad.inCart
                                  ? "Removido del carrito"
                                  : "Agregado al carrito"
                              );
                            }}
                            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                              ad.inCart
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-[#034651]/10 text-[#034651] hover:bg-[#034651]/20"
                            }`}
                          >
                            {ad.inCart ? "Agregado" : "Agregar"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-[#034651]/10 pt-4 space-y-3">
                    <p className="text-[#034651] font-bold text-base">
                      Total carrito: ${getPublicationsTotal().toFixed(2)}
                    </p>

                    <button
                      onClick={() => setShowConfirmModal(true)}
                      disabled={getPublicationsTotal() === 0}
                      className="w-full bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                    >
                      Procesar y finalizar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: VISTA AMPLIADA */}
      {modalMedia && (
        <ModalContainer isOpen={true} onClose={() => setModalMedia(null)}>
          <div className="flex flex-col items-center justify-center p-4">
            {modalMedia.type === "image" ? (
              <img
                src={modalMedia.src}
                alt="Vista ampliada"
                className="max-h-[80vh] rounded-2xl shadow-lg border border-[#034651]/20"
              />
            ) : (
              <video
                src={modalMedia.src}
                controls
                autoPlay
                className="max-h-[80vh] rounded-2xl shadow-lg border border-[#034651]/20"
              />
            )}
          </div>
        </ModalContainer>
      )}

      {/* MODAL: CONFIRMACIÓN DE PAGO */}
      {showConfirmModal && (
        <ModalContainer
          isOpen={true}
          onClose={() => setShowConfirmModal(false)}
        >
          <div className="p-6 text-center text-[#034651]">
            <h2 className="text-xl font-semibold mb-3">
              ¿Deseas procesar tu compra?
            </h2>
            <p className="text-sm mb-6">
              Monto total:{" "}
              <span className="font-bold text-green-700">
                ${getPublicationsTotal().toFixed(2)}
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  // markAsPaid();
                  toast.success("Pago procesado correctamente");
                  setShowConfirmModal(false);
                  navigate(`/${selectedCountry.toLowerCase()}/pago`);
                }}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                Sí, procesar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-200 text-[#034651] px-5 py-2 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </ModalContainer>
      )}

      <Footer />
    </>
  );
};

export default ManageAdsPage;
