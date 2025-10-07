import React, { useState } from "react";
import {
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Country, IUser, IUserRegistered } from "../interfaces/IUser";
import { CountryCode } from "../enums/CountryEnum";
import useCountryStore from "@/store/countryStore";
import { verifyExisted, register, sendVerification } from "../api/urls/User";
import { useApiSend } from "../api/config/customHooks";
import Flag from "react-flagkit";
import { toast } from "@/components/ui/sonner";
import ModalContainer from "@/components/ModalContainer";

// Mapeo de códigos de país del enum a códigos ISO 3166-1 alpha-2 para react-flagkit

const RegisterPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const navigate = useNavigate();
  const { countries, loading } = useCountryStore();
  const [formData, setFormData] = useState<
    IUser & { password: string; confirmPassword: string }
  >({
    name: "",
    email: "",
    workphone1: 0,
    workphone2: 0,
    mobilephone: 0,
    country: (countryCode as Country) || Country.Honduras,
    password: "",
    confirmPassword: "",
  });
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [storedCode, setStoredCode] = useState<number | null>(null);
  const [user, setUser] = useState<IUserRegistered | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError(null); // Clear email error on change
    }
  };

  const handleCountrySelect = (country: Country) => {
    setFormData({ ...formData, country });
    setIsCountryOpen(false);
    console.log(`[Register] País seleccionado: ${country}`);
  };

  const { mutate: verifyExistedUser, isPending: isRegisterPending } =
    useApiSend<IUserRegistered>(
      () => {
        const {
          name,
          email,
          password,
          confirmPassword,
          workphone1,
          workphone2,
          mobilephone,
          country,
        } = formData;

        if (password !== confirmPassword) {
          console.error("[Register] Las contraseñas no coinciden");
          toast.error("Las contraseñas no coinciden");
          throw new Error("Las contraseñas no coinciden");
        }

        const userData = {
          name,
          email,
          workphone1: workphone1 ? parseInt(workphone1.toString()) : null,
          workphone2: workphone2 ? parseInt(workphone2.toString()) : null,
          mobilephone: mobilephone ? parseInt(mobilephone.toString()) : null,
          country,
          role: "user",
          createdDate: new Date().toISOString(),
          password,
        };

        return verifyExisted(userData);
      },
      async (data: IUserRegistered) => {
        console.log("[Register] Registro exitoso:", formData.email);
        console.log("[Register] Datos recibidos:", data);
        setUser(data);
        if (data.userExisted) {
          setEmailError("El usuario ya existe. Por favor, inicia sesión.");
          toast.error("El usuario ya existe. Por favor, inicia sesión.");
          return;
        }
        const generatedCode = Math.floor(100000 + Math.random() * 900000);
        setStoredCode(data.user.validationCode);
        console.log(
          "[Register] Enviando correo de verificación a:",
          formData.email
        );
        try {
          const response = await sendVerification(
            generatedCode,
            data.user.email,
            data.user.name
          );
          console.log(
            "[Register] Correo de verificación enviado:",
            generatedCode
          );
          toast.success(
            "Registro exitoso. Ingresa el código de verificación enviado a tu correo."
          );
          setShowVerificationModal(true);
        } catch (error) {
          console.error(
            "[Register] Error al enviar correo de verificación:",
            error
          );
          toast.error(
            "Registro exitoso, pero falló el envío del correo de verificación."
          );
        }
      },
      (error) => {
        console.error("[Register] Error en registro:", error);
        toast.error(`Error al registrar: ${error.message}`);
      }
    );

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[Register] Iniciando registro...");
    setEmailError(null); // Clear any previous email error
    verifyExistedUser();
  };

  const handleValidateCode = () => {
    try {
      console.log(
        "[Register] Validando código de verificación:",
        verificationCode
      );
      const enteredCode = parseInt(verificationCode);

      if (storedCode === null) {
        console.error("[Register] No se ha generado un código de verificación");
        toast.error(
          "No se ha generado un código de verificación. Por favor, intenta registrarte de nuevo."
        );
        return;
      }

      if (enteredCode === storedCode) {
        console.log(
          "[Register] Código de verificación correcto:",
          verificationCode
        );
        toast.success(
          "Código verificado correctamente. Bienvenido a MundoCar!"
        );
        setShowVerificationModal(false);
        navigate(`/${formData.country}/dashboard`);
      } else {
        console.error(
          "[Register] Código de verificación incorrecto:",
          verificationCode
        );
        toast.error(
          "Código de verificación incorrecto. Por favor, intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("[Register] Error al validar código:", error);
      toast.error("Error al validar el código. Por favor, intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="text-[#034651] text-center py-10">Cargando países...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 flex flex-col">
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-1">
        {/* Izquierda: Formulario de registro */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 flex items-center justify-center px-6 md:px-10 py-10">
          <div className="w-full max-w-2xl text-center">
            <Link to={`${getCountryPath("inicio")}`}>
              <button className="mb-6 px-4 py-2 bg-[#034651] text-white rounded-xl hover:bg-[#05707f] transition-colors duration-300 flex items-center gap-2 mx-auto">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
            </Link>
            <img
              src="/assets/mundocar-logo.png"
              alt="MundoCar"
              className="mx-auto"
              width={250}
              loading="lazy"
            />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#034651] mt-4">
              Crea tu cuenta en MundoCar
            </h2>
            <p className="text-[#034651]/80 mt-2">
              Regístrate para comprar, vender o rentar vehículos en
              Centroamérica.
            </p>
            {/* Formulario */}
            <form
              onSubmit={handleRegister}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isRegisterPending}
                    className="w-full pl-10 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                    placeholder="Tu nombre completo"
                    aria-label="Nombre completo"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isRegisterPending}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      emailError ? "border-red-500" : "border-[#034651]/20"
                    } rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50`}
                    placeholder="tucorreo@ejemplo.com"
                    aria-label="Correo electrónico"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="workphone1"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Teléfono de trabajo 1
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <input
                    type="number"
                    id="workphone1"
                    name="workphone1"
                    value={formData.workphone1 || ""}
                    onChange={handleInputChange}
                    disabled={isRegisterPending}
                    className="w-full pl-10 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                    placeholder="Teléfono de trabajo 1"
                    aria-label="Teléfono de trabajo 1"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="workphone2"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Teléfono de trabajo 2 (opcional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <input
                    type="number"
                    id="workphone2"
                    name="workphone2"
                    value={formData.workphone2 || ""}
                    onChange={handleInputChange}
                    disabled={isRegisterPending}
                    className="w-full pl-10 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                    placeholder="Teléfono de trabajo 2"
                    aria-label="Teléfono de trabajo 2"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="mobilephone"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Teléfono móvil
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <input
                    type="number"
                    id="mobilephone"
                    name="mobilephone"
                    value={formData.mobilephone || ""}
                    onChange={handleInputChange}
                    required
                    disabled={isRegisterPending}
                    className="w-full pl-10 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                    placeholder="Teléfono móvil"
                    aria-label="Teléfono móvil"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-[#034651]"
                >
                  País
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <div
                    className="w-full pl-10 pr-4 py-3 border border-[#034651]/20 rounded-xl text-[#034651] shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between disabled:opacity-50"
                    onClick={() =>
                      !isRegisterPending && setIsCountryOpen(!isCountryOpen)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Flag
                        country={formData.country.toUpperCase()}
                        size={20}
                        className="inline-block"
                      />
                      <span>
                        {countries.find((c) => c.code === formData.country)
                          ?.name || "Selecciona un país"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-[#034651]/60 transition-transform ${
                        isCountryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isCountryOpen && (
                    <ul className="absolute z-10 w-full mt-1 bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-xl shadow-lg max-h-60 overflow-auto">
                      {countries.map((c) => (
                        <li
                          key={c.code}
                          className="px-4 py-2 flex items-center gap-2 text-[#034651] hover:bg-[#034651]/10 cursor-pointer"
                          onClick={() => handleCountrySelect(c.code)}
                        >
                          <Flag
                            country={c.code}
                            size={20}
                            className="inline-block"
                          />
                          <span>{c.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isRegisterPending}
                  className="w-full pl-4 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                  placeholder="••••••••"
                  aria-label="Contraseña"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={isRegisterPending}
                  className="w-full pl-4 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                  placeholder="••••••••"
                  aria-label="Confirmar contraseña"
                />
              </div>
              <div className="md:col-span-2">
                {emailError && (
                  <p className="text-red-500 text-sm mb-4">{emailError}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isRegisterPending}
                  className="w-full flex items-center justify-center gap-2 bg-[#034651] text-white font-semibold p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-[#05707f] transition-all focus:outline-none focus:ring-2 focus:ring-[#034651] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Crear cuenta"
                >
                  {isRegisterPending ? "Registrando..." : "Crear cuenta"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-[#034651]/80 md:col-span-2">
              ¿Ya tienes una cuenta?{" "}
              <Link to={`${getCountryPath("inicio")}`}>
                <button
                  className="text-[#034651] hover:underline font-medium"
                  aria-label="Iniciar sesión"
                >
                  Inicia sesión
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* Derecha: Video con overlay y texto */}
        <div className="relative h-[50vh] lg:h-full overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            poster="/assets/videos/MundoCar3.mp4"
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/videos/MundoCar3.webm" type="video/webm" />
            <source src="/assets/videos/MundoCar3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#034651]/55" />
          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow text-center">
              ¡Únete a MundoCar hoy!
            </h1>
            <p className="text-white/90 mt-3 max-w-xl text-center">
              Crea tu cuenta y descubre la mejor experiencia para comprar,
              vender o rentar vehículos en toda Centroamérica.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de verificación */}
      {showVerificationModal && (
        <ModalContainer
          isOpen={showVerificationModal}
          onClose={() => {
            console.log("[Register] Cerrando modal de verificación");
            setShowVerificationModal(false);
          }}
          title="Verifica tu cuenta"
          width="32rem"
        >
          <div className="space-y-6">
            <p className="text-[#034651]/80">
              Ingresa el código de verificación enviado a {formData.email}.
            </p>
            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-[#034651]"
              >
                Código de verificación
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition"
                placeholder="Ingresa el código"
                aria-label="Código de verificación"
              />
            </div>
            <button
              onClick={handleValidateCode}
              className="w-full flex items-center justify-center gap-2 bg-[#034651] text-white font-semibold p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-[#05707f] transition-all focus:outline-none focus:ring-2 focus:ring-[#034651]"
              aria-label="Validar código"
            >
              Validar código
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ModalContainer>
      )}

      <div className="bg-[#034651] text-white py-5 text-center">
        <p className="text-xs opacity-90">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
