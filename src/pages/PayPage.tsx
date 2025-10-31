import React, { useState, useEffect } from "react";
import {
  CreditCardIcon,
  CalendarIcon,
  Lock,
  User,
  Shield,
  Zap,
  Loader2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileSidebar";
import Footer from "@/components/Footer";
import ModalContainer from "@/components/ModalContainer";
import { useNavigate, useParams } from "react-router-dom";

interface AdPublication {
  id: string;
  title: string;
  mediaType: string;
  placement: string;
  price: number;
  country: string;
  status: string;
}

const PayPage: React.FC = () => {
  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode?: string }>();
  const [ads, setAds] = useState<AdPublication[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const selectedPlan = "Pago de Publicaciones";

  // 🧩 Cargar anuncios desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ads_publications");
    if (stored) {
      const parsed: AdPublication[] = JSON.parse(stored);
      setAds(parsed.filter((a) => a.status === "draft"));
    }
  }, []);

  useEffect(() => {
    const sum = ads.reduce((acc, ad) => acc + ad.price, 0);
    setTotal(sum);
  }, [ads]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCardDetails((prev) => ({ ...prev, [name]: value }));

    let error = "";
    switch (name) {
      case "cardNumber":
        if (!/^\d{16}$/.test(value.replace(/\s/g, "")))
          error = "Número inválido (16 dígitos requeridos)";
        break;
      case "expiryDate":
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value))
          error = "Formato incorrecto (MM/YY)";
        break;
      case "cvv":
        if (!/^\d{3,4}$/.test(value)) error = "CVV inválido (3 o 4 dígitos)";
        break;
      case "cardholderName":
        if (value.trim().length < 3) error = "Nombre demasiado corto";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isIncomplete = Object.values(cardDetails).some((v) => !v.trim());
    if (hasErrors || isIncomplete) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1800);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate(`/${countryCode || "hn"}/dashboard`);
  };

  return (
    <>
      <Header currentCountryCode={countryCode || "HN"} />
      <MobileNav currentCountryCode={countryCode || "HN"} />

      <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 pt-24 pb-12">
        <div className="max-w-lg w-full mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-[#034651]/20 mt-10">
          {/* 🔙 Botón de regresar */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-white bg-[#034651] px-4 py-2 rounded-xl hover:bg-[#046b70] transition-all duration-300"
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

          <h2 className="text-2xl font-bold text-[#034651] mb-6 text-center">
            Resumen y Detalles de Pago
          </h2>

          {/* 🧾 DESGLOSE */}
          {ads.length > 0 ? (
            <div className="bg-[#F8FAFA] border border-[#034651]/10 rounded-2xl p-4 mb-8 max-h-60 overflow-y-auto">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="flex justify-between items-center border-b border-[#034651]/10 py-2 last:border-none"
                >
                  <div className="text-sm text-[#034651]/80">
                    <p className="font-semibold text-[#034651]">
                      {ad.title || "Sin título"}
                    </p>
                    <p className="text-xs">
                      {ad.mediaType === "image" ? "🖼 Imagen" : "🎥 Video"} •{" "}
                      {ad.placement.toUpperCase()}
                    </p>
                  </div>
                  <span className="font-semibold text-[#034651] text-sm">
                    ${ad.price.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-3 mt-2 border-t border-[#034651]/20 text-right">
                <p className="text-[#034651] font-bold text-base">
                  Total: ${total.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-[#034651]/60 mb-6">
              No hay publicaciones pendientes de pago.
            </p>
          )}

          {/* 💳 Tarjeta visual tipo MundoCar */}
          <div className="flex justify-center mb-8 transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]">
            <div
              className={`relative w-80 h-48 rounded-2xl shadow-xl overflow-hidden cursor-pointer
                bg-gradient-to-br from-[#034651] via-[#046b72] to-[#05707f]
                transform transition-all duration-300 hover:shadow-2xl ring-4 ring-[#034651]/30`}
            >
              {/* Luces decorativas */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_100%)]" />

              {/* Chip y banda */}
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <div className="w-10 h-7 bg-yellow-300 rounded-sm shadow-inner opacity-90" />
                <div className="w-12 h-1 bg-white/50 rounded" />
              </div>

              {/* Logo */}
              <div className="absolute top-5 right-5 text-white/80 text-sm font-semibold tracking-wider">
                MUNDOCAR
              </div>

              {/* Número de tarjeta */}
              <div className="absolute bottom-16 left-6 text-white text-lg tracking-widest font-mono drop-shadow-md">
                **** **** **** 1234
              </div>

              {/* Nombre */}
              <div className="absolute bottom-8 left-6 text-white/90 text-sm font-semibold uppercase tracking-widest">
                {cardDetails.cardholderName || "Nombre Apellido"}
              </div>

              {/* Plan tipo */}
              <div className="absolute bottom-8 right-6 text-white/70 text-xs font-medium tracking-wider text-orange-300">
                {selectedPlan}
              </div>

              {/* Efecto de brillo dinámico */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -left-40 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12 animate-[shine_2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>

          <style>
            {`
              @keyframes shine {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(150%); }
                100% { transform: translateX(200%); }
              }
            `}
          </style>

          {/* 🧾 FORMULARIO DE PAGO */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#034651]/60" />
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="Número de tarjeta"
                className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651]"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#034651]/60" />
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651]"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#034651]/60" />
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="CVV"
                  className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651]"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#034651]/60" />
              <input
                type="text"
                name="cardholderName"
                value={cardDetails.cardholderName}
                onChange={handleInputChange}
                placeholder="Nombre en la tarjeta"
                className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651]"
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardholderName}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-[#034651]/80">
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Pago Seguro
              </span>
            </div>

            <button
              type="submit"
              disabled={
                ads.length === 0 ||
                Object.values(errors).some((error) => error !== "") ||
                Object.values(cardDetails).some((val) => !val.trim())
              }
              className="w-full py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-[#034651] to-[#046b70] text-white shadow-lg hover:scale-[1.02] transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5" />
                  Pagar ${total.toFixed(2)}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ MODAL DE ÉXITO */}
      {showSuccessModal && (
        <ModalContainer
          isOpen={showSuccessModal}
          onClose={handleSuccessConfirm}
          title="¡Pago Exitoso!"
          width="24rem"
        >
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
            <p className="text-[#034651]/80">
              Se ha procesado correctamente el pago de tus publicaciones
              publicitarias.
            </p>
            <button
              onClick={handleSuccessConfirm}
              className="w-full bg-[#034651] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#05707f] transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <ChevronRight className="h-5 w-5" />
                Continuar
              </span>
            </button>
          </div>
        </ModalContainer>
      )}

      <Footer />
    </>
  );
};

export default PayPage;
