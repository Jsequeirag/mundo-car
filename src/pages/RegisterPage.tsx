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
import useCountryStore from "@/store/countryStore";
import { verifyExisted, register, sendVerification } from "../api/urls/User";
import { useApiSend } from "../api/config/customHooks";
import Flag from "react-flagkit";
import { toast } from "@/components/ui/sonner";
import ModalContainer from "@/components/ModalContainer";

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
    country: (countryCode as Country) || "HN",
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
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validación para campos numéricos
    if (["workphone1", "workphone2", "mobilephone"].includes(name)) {
      if (
        value === "" ||
        (/^\d{0,8}$/.test(value) && parseInt(value) <= 99999999)
      ) {
        setFormData({ ...formData, [name]: value });
      } else {
        toast.error("El número telefónico no puede exceder los 8 dígitos.");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "email") setEmailError(null);
  };

  // 🚀 Verificación de existencia del usuario
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
          toast.error("Las contraseñas no coinciden.");
          throw new Error("Contraseñas no coinciden");
        }

        return verifyExisted({
          name,
          email,
          workphone1: Number(workphone1),
          workphone2: Number(workphone2),
          mobilephone: Number(mobilephone),
          country,
          role: "user",
          createdDate: new Date().toISOString(),
          password,
        });
      },
      async (data) => {
        if (data.userExisted) {
          setEmailError("El usuario ya existe. Por favor, inicia sesión.");
          toast.error("El usuario ya existe. Por favor, inicia sesión.");
          return;
        }
        setUser(data);
        setStoredCode(data.user.validationCode);
        await sendVerification(
          data.user.validationCode,
          data.user.email,
          data.user.name
        );
        toast.success("Se envió un código de verificación a tu correo.");
        setShowVerificationModal(true);
      },
      (error) => toast.error(`Error al verificar: ${error.message}`)
    );

  const { mutate: registerUser } = useApiSend<IUser>(
    () => {
      if (!user?.user)
        throw new Error("No hay datos de usuario para registrar.");
      return register({ ...user.user, password: formData.password });
    },
    async (data: IUser) => {
      toast.success("Registro exitoso. ¡Bienvenido a MundoCar!");
      setShowVerificationModal(false);
      navigate(`/${formData.country}/dashboard`);
    },
    (error) => toast.error(`Error al registrar: ${error.message}`)
  );

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    verifyExistedUser();
  };

  const handleValidateCode = () => {
    const enteredCode = parseInt(verificationCode);
    if (storedCode === null) {
      toast.error("No se ha generado un código. Intenta registrarte de nuevo.");
      return;
    }
    if (enteredCode === storedCode) {
      registerUser();
    } else {
      toast.error("Código de verificación incorrecto. Intenta de nuevo.");
    }
  };

  if (loading)
    return (
      <div className="text-brand-primary text-center py-10">
        Cargando países...
      </div>
    );

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-1">
        {/* 🧊 Izquierda: Formulario */}
        <div className="bg-brand-card/80 backdrop-blur-lg border border-brand-primary/10 flex items-center justify-center px-6 md:px-10 py-12 shadow-inner">
          <div className="w-full max-w-2xl text-center">
            <Link to={getCountryPath("inicio")}>
              <button className="mb-6 px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-hover transition-all flex items-center gap-2 mx-auto shadow-sm hover:shadow-md">
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
            </Link>

            <img
              src="/assets/mundocar-logo.png"
              alt="MundoCar"
              className="mx-auto drop-shadow-md"
              width={230}
              loading="lazy"
            />

            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mt-4">
              Crea tu cuenta en MundoCar
            </h2>
            <p className="text-text-secondary mt-2">
              Regístrate para comprar, vender o rentar vehículos en toda
              Centroamérica.
            </p>

            <form
              onSubmit={handleRegister}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Nombre */}
              <InputField
                icon={<User />}
                name="name"
                value={formData.name}
                label="Nombre completo"
                placeholder="Tu nombre completo"
                onChange={handleInputChange}
                disabled={isRegisterPending}
              />

              {/* Correo */}
              <InputField
                icon={<Mail />}
                name="email"
                value={formData.email}
                label="Correo electrónico"
                placeholder="tucorreo@ejemplo.com"
                onChange={handleInputChange}
                disabled={isRegisterPending}
                error={emailError}
              />

              {/* Teléfonos */}
              <InputField
                icon={<Phone />}
                name="workphone1"
                value={formData.workphone1}
                label="Teléfono de trabajo 1"
                onChange={handleInputChange}
                type="number"
              />

              <InputField
                icon={<Phone />}
                name="mobilephone"
                value={formData.mobilephone}
                label="Teléfono móvil"
                onChange={handleInputChange}
                type="number"
              />

              {/* País */}
              <div className="md:col-span-2 text-left">
                <label className="block text-sm font-semibold text-text-main mb-1">
                  País
                </label>
                <div
                  className="relative w-full border border-brand-primary/20 rounded-xl px-4 py-3 flex justify-between items-center bg-white/70 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                >
                  <div className="flex items-center gap-2">
                    <Flag
                      country={formData.country.toUpperCase()}
                      size={20}
                      className="rounded-sm"
                    />
                    <span className="text-text-main">
                      {countries.find((c) => c.code === formData.country)
                        ?.name || "Selecciona un país"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-primary transition-transform ${
                      isCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isCountryOpen && (
                    <ul className="absolute top-full left-0 w-full mt-1 bg-white/80 backdrop-blur-xl border border-brand-primary/20 rounded-xl shadow-lg max-h-60 overflow-auto z-20">
                      {countries.map((c) => (
                        <li
                          key={c.code}
                          onClick={() => {
                            setFormData({ ...formData, country: c.code });
                            setIsCountryOpen(false);
                          }}
                          className="px-4 py-2 flex items-center gap-2 text-text-main hover:bg-brand-primary/10 cursor-pointer"
                        >
                          <Flag country={c.code} size={20} />
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Contraseñas */}
              <InputField
                name="password"
                value={formData.password}
                label="Contraseña"
                placeholder="••••••••"
                onChange={handleInputChange}
                type="password"
              />
              <InputField
                name="confirmPassword"
                value={formData.confirmPassword}
                label="Confirmar contraseña"
                placeholder="••••••••"
                onChange={handleInputChange}
                type="password"
              />

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isRegisterPending}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-hover text-white font-semibold p-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
                >
                  {isRegisterPending ? "Registrando..." : "Crear cuenta"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>

            <p className="mt-5 text-sm text-text-secondary">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to={getCountryPath("inicio")}
                className="text-brand-primary hover:underline font-semibold"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* 🎥 Derecha: Video */}
        <div className="relative h-[50vh] lg:h-full overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/videos/MundoCar3.webm" type="video/webm" />
            <source src="/assets/videos/MundoCar3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-primary/60 backdrop-blur-[2px]" />
          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
              ¡Únete a MundoCar hoy!
            </h1>
            <p className="text-white/90 mt-3 max-w-xl mx-auto leading-relaxed">
              Crea tu cuenta y descubre la mejor experiencia para comprar,
              vender o rentar vehículos.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de verificación */}
      {showVerificationModal && (
        <ModalContainer
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          title="Verifica tu cuenta"
          width="30rem"
        >
          <div className="space-y-6">
            <p className="text-text-secondary">
              Ingresa el código de verificación enviado a {formData.email}.
            </p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl focus:ring-2 focus:ring-brand-primary text-text-main placeholder-text-secondary/40 shadow-sm"
              placeholder="Código de verificación"
            />
            <button
              onClick={handleValidateCode}
              className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold p-3 rounded-xl shadow-md hover:bg-brand-hover transition-all"
            >
              Validar código
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ModalContainer>
      )}

      <footer className="bg-brand-primary text-white py-5 text-center">
        <p className="text-xs opacity-80">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

// 🔹 Componente reutilizable para inputs
interface InputProps {
  label: string;
  name: string;
  value: any;
  onChange: (e: any) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string | null;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  icon,
  placeholder,
  type = "text",
  disabled,
  error,
}) => (
  <div className="text-left">
    <label className="block text-sm font-semibold text-text-main mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-primary/60">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 border ${
          error ? "border-red-500" : "border-brand-primary/20"
        } rounded-xl 
        focus:ring-2 focus:ring-brand-primary focus:border-transparent text-text-main 
        placeholder-text-secondary/40 shadow-sm hover:shadow-md transition-all duration-300 
        disabled:opacity-50 focus:scale-[1.02]`}
        placeholder={placeholder}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default RegisterPage;
