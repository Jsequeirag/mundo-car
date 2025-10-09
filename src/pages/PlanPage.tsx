import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Building2,
  Crown,
  CheckCircle,
  Zap,
  CreditCard as CreditCardIcon,
  Calendar as CalendarIcon,
  Lock,
  ArrowLeft,
  Loader2,
  Shield,
} from "lucide-react";
import ModalContainer from "@/components/ModalContainer";

const PlansPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
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

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });
    setErrors({ cardNumber: "", expiryDate: "", cvv: "", cardholderName: "" });
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .substring(0, 19);

  const formatExpiryDate = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .substring(0, 5);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") formattedValue = formatCardNumber(value);
    if (name === "expiryDate") formattedValue = formatExpiryDate(value);

    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));

    let error = "";
    if (
      name === "cardNumber" &&
      formattedValue.length > 0 &&
      !/^\d{0,16}$/.test(formattedValue.replace(/\s/g, ""))
    )
      error = "Máximo 16 dígitos.";
    if (
      name === "expiryDate" &&
      formattedValue.length > 0 &&
      !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formattedValue)
    )
      error = "Formato MM/YY (ej. 12/25).";
    if (
      name === "cvv" &&
      formattedValue.length > 0 &&
      !/^\d{0,4}$/.test(formattedValue)
    )
      error = "Máximo 4 dígitos.";
    if (
      name === "cardholderName" &&
      formattedValue.length > 0 &&
      !/^[a-zA-Z\s]+$/.test(formattedValue)
    )
      error = "Solo letras y espacios permitidos.";
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const hasErrors =
      Object.values(errors).some((error) => error !== "") ||
      Object.values(cardDetails).some((val) => !val.trim());
    if (!hasErrors) {
      console.log("[PlansPage] Pago procesado:", cardDetails);
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
      }, 1500);
    } else {
      console.log("[PlansPage] Errores en el formulario:", errors);
      setIsLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate(getCountryPath("publicar"));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 flex flex-col items-center justify-start pt-20 pb-10"
      role="main"
      aria-label="Selección de planes de suscripción"
    >
      <div className="w-full max-w-7xl px-6">
        <header className="bg-white/80 backdrop-blur-xl border-b border-[#034651]/20 shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#034651] to-[#05707f] rounded-2xl flex items-center justify-center">
                  <CreditCardIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#034651]">
                    MundoCar - Planes
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#034651] text-white rounded-xl hover:bg-[#05707f] transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            aria-label="Regresar a la página anterior"
          >
            <ArrowLeft className="h-5 w-5" />
            Regresar
          </button>
        </div>

        <h1 className="text-3xl font-bold text-[#034651] mb-8 text-center">
          Elige tu plan en MundoCar
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            onClick={() => handlePlanSelect("Independiente")}
            onKeyDown={(e) =>
              e.key === "Enter" && handlePlanSelect("Independiente")
            }
            tabIndex={0}
            role="button"
            aria-label="Seleccionar plan Independiente"
          >
            <div
              className={`
                relative bg-white/20 backdrop-blur-xl border border-white/20
                rounded-3xl p-8 shadow-2xl
                group-hover:shadow-3xl group-hover:border-white/30
                overflow-hidden
                bg-gradient-to-br from-[#034651]/10 to-[#034651]/5
                after:absolute after:inset-0 after:bg-gradient-to-r 
                after:from-transparent after:via-white/10 after:to-transparent
                after:opacity-0 group-hover:after:opacity-100
                after:transition-opacity after:duration-500
                before:absolute before:inset-0 before:bg-gradient-to-b
                before:from-white/5 before:to-transparent
                before:opacity-0 group-hover:before:opacity-100
                before:transition-opacity before:duration-500
              `}
              style={{
                backgroundImage:
                  "url('/assets/mundo/suscripcion-independiente.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#034651]/20 rounded-2xl flex items-center justify-center border border-[#034651]/30">
                    <User className="h-8 w-8 text-[#034651]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2 text-white text-shadow-md">
                  Independiente
                </h3>
                <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                  <p className="mt-1 text-white text-shadow-md font-bold">
                    Perfecto para vendedores individuales
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    5 listados
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Soporte básico
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98] after:absolute after:inset-0 after:bg-white/20 after:scale-0 after:transform after:transition-transform after:duration-300 hover:after:scale-100 relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    Seleccionar Plan
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            onClick={() => handlePlanSelect("Autolote")}
            onKeyDown={(e) => e.key === "Enter" && handlePlanSelect("Autolote")}
            tabIndex={0}
            role="button"
            aria-label="Seleccionar plan Autolote"
          >
            <div
              className={`
                relative bg-white/20 backdrop-blur-xl border border-white/20
                rounded-3xl p-8 shadow-2xl
                group-hover:shadow-3xl group-hover:border-white/30
                overflow-hidden
                ring-2 ring-[#034651]/30 bg-gradient-to-br from-[#034651]/10 to-[#034651]/5
                after:absolute after:inset-0 after:bg-gradient-to-r 
                after:from-transparent after:via-white/10 after:to-transparent
                after:opacity-0 group-hover:after:opacity-100
                after:transition-opacity after:duration-500
                before:absolute before:inset-0 before:bg-gradient-to-b
                before:from-white/5 before:to-transparent
                before:opacity-0 group-hover:before:opacity-100
                before:transition-opacity before:duration-500
              `}
              style={{
                backgroundImage:
                  "url('/assets/mundo/suscripcion-autolote.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#034651]/20 rounded-2xl flex items-center justify-center border border-[#034651]/30">
                    <Building2 className="h-8 w-8 text-[#034651]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2 text-white text-shadow-md">
                  Autolote
                </h3>
                <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                  <p className="mt-1 text-white text-shadow-md font-bold">
                    Ideal para pequeños negocios de autos
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    15 listados
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Soporte prioritario
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98] after:absolute after:inset-0 after:bg-white/20 after:scale-0 after:transform after:transition-transform after:duration-300 hover:after:scale-100 relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    ¡Elige este plan!
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            onClick={() => handlePlanSelect("Concesionario")}
            onKeyDown={(e) =>
              e.key === "Enter" && handlePlanSelect("Concesionario")
            }
            tabIndex={0}
            role="button"
            aria-label="Seleccionar plan Concesionario"
          >
            <div
              className={`
                relative bg-white/20 backdrop-blur-xl border border-white/20
                rounded-3xl p-8 shadow-2xl
                group-hover:shadow-3xl group-hover:border-white/30
                overflow-hidden
                bg-gradient-to-br from-[#034651]/10 to-[#034651]/5
                after:absolute after:inset-0 after:bg-gradient-to-r 
                after:from-transparent after:via-white/10 after:to-transparent
                after:opacity-0 group-hover:after:opacity-100
                after:transition-opacity after:duration-500
                before:absolute before:inset-0 before:bg-gradient-to-b
                before:from-white/5 before:to-transparent
                before:opacity-0 group-hover:before:opacity-100
                before:transition-opacity before:duration-500
              `}
              style={{
                backgroundImage:
                  "url('/assets/mundo/suscripcion-concesionario.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#034651]/20 rounded-2xl flex items-center justify-center border border-[#034651]/30">
                    <Crown className="h-8 w-8 text-[#034651]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2 text-white text-shadow-md">
                  Concesionario
                </h3>
                <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                  <p className="mt-1 text-white text-shadow-md font-bold">
                    Para concesionarios profesionales
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Listados ilimitados
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    Soporte premium
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98] after:absolute after:inset-0 after:bg-white/20 after:scale-0 after:transform after:transition-transform after:duration-300 hover:after:scale-100 relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    Seleccionar Plan
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedPlan && (
          <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mb-8">
            <div className="flex justify-center mb-6 transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]">
              <div
                className={`relative w-80 h-48 rounded-2xl shadow-xl overflow-hidden cursor-pointer
    bg-gradient-to-br from-[#034651] via-[#046b72] to-[#05707f]
    transform transition-all duration-300 hover:shadow-2xl
    ${selectedPlan ? "ring-4 ring-[#034651]" : "ring-2 ring-transparent"}`}
              >
                {/* Luces decorativas (simulan reflejo metálico) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_100%)]" />

                {/* Chip y banda */}
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <div className="w-10 h-7 bg-yellow-300 rounded-sm shadow-inner opacity-90" />
                  <div className="w-12 h-1 bg-white/50 rounded" />
                </div>

                {/* Marca o logo */}
                <div className="absolute top-5 right-5 text-white/80 text-sm font-semibold tracking-wider">
                  MUNDOCAR
                </div>

                {/* Número de tarjeta */}
                <div className="absolute bottom-16 left-6 text-white text-lg tracking-widest font-mono drop-shadow-md">
                  **** **** **** 1234
                </div>

                {/* Nombre */}
                <div className="absolute bottom-8 left-6 text-white/90 text-sm font-semibold uppercase tracking-widest">
                  Nombre Apellido
                </div>

                {/* Icono tipo plan (Premium, Gold, etc.) */}
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
            <h2 className="text-2xl font-bold text-[#034651] mb-6 text-center">
              Detalles de Pago para {selectedPlan}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#034651]/60" />
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Número de tarjeta"
                  className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  aria-label="Número de tarjeta"
                  aria-describedby={
                    errors.cardNumber ? "cardNumber-error" : undefined
                  }
                  title={
                    errors.cardNumber ||
                    "Ingresa tu número de tarjeta (XXXX XXXX XXXX XXXX)"
                  }
                />
                {errors.cardNumber && (
                  <p
                    id="cardNumber-error"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.cardNumber}
                  </p>
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
                    className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                    aria-label="Fecha de expiración"
                    aria-describedby={
                      errors.expiryDate ? "expiryDate-error" : undefined
                    }
                    title={
                      errors.expiryDate ||
                      "Ingresa la fecha de expiración (MM/YY)"
                    }
                  />
                  {errors.expiryDate && (
                    <p
                      id="expiryDate-error"
                      className="text-red-500 text-sm mt-1"
                    >
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
                    className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                    aria-label="Código CVV"
                    aria-describedby={errors.cvv ? "cvv-error" : undefined}
                    title={errors.cvv || "Ingresa el código CVV (3-4 dígitos)"}
                  />
                  {errors.cvv && (
                    <p id="cvv-error" className="text-red-500 text-sm mt-1">
                      {errors.cvv}
                    </p>
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
                  className="w-full pl-12 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  aria-label="Nombre del titular de la tarjeta"
                  aria-describedby={
                    errors.cardholderName ? "cardholderName-error" : undefined
                  }
                  title={
                    errors.cardholderName || "Ingresa el nombre del titular"
                  }
                />
                {errors.cardholderName && (
                  <p
                    id="cardholderName-error"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.cardholderName}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-white">
                <span className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Pago Seguro
                </span>
              </div>
              <button
                type="submit"
                disabled={
                  Object.values(errors).some((error) => error !== "") ||
                  Object.values(cardDetails).some((val) => !val.trim())
                }
                className="w-full py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-[#034651] to-[#034651]/80 text-white shadow-lg hover:shadow-[#034651]/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Pagar y continuar"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    Pagar y Continuar
                  </span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      {showSuccessModal && (
        <ModalContainer
          isOpen={showSuccessModal}
          onClose={handleSuccessConfirm}
          title="¡Pago Exitoso!"
          width="24rem"
        >
          <div className="text-center space-y-4">
            <p className="text-[#034651]/80">
              Tu suscripción a {selectedPlan} ha sido procesada con éxito.
            </p>
            <button
              onClick={handleSuccessConfirm}
              className="w-full bg-[#034651] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#05707f] transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <ChevronRight className="h-5 w-5" />
                Continuar
              </span>
            </button>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};

export default PlansPage;
