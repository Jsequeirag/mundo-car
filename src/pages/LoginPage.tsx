import React, { useState, useEffect } from "react";
import { ChevronRight, Mail, Key } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IUserRegistered } from "../interfaces/IUser";
import { login } from "../api/urls/User";
import { useApiSend } from "../api/config/customHooks";
import { toast } from "@/components/ui/sonner";

const LoginPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [user, setUser] = useState<IUserRegistered | null>(null);

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError(null); // Clear email error on change
    }
  };

  const {
    mutate: loginUser,
    isPending: isLoginPending,
    data,
    isSuccess,
  } = useApiSend<IUser>(
    () => {
      const { email, password } = formData;
      if (!email || !password) {
        console.error("[Login] Correo o contraseña vacíos");
        toast.error("Por favor, completa todos los campos.");
        throw new Error("Correo o contraseña vacíos");
      }
      return login(email, password);
    },
    async (data: IUserRegistered) => {
      console.log("[Login] Inicio de sesión exitoso:", formData.email);
      console.log("[Login] Datos recibidos:", data);
      setUser(data);
      toast.success("Inicio de sesión exitoso. Bienvenido a MundoCar!");
    },
    (error) => {
      toast.error("El usuario no existe. Por favor, regístrate.");
      setEmailError("El usuario no existe. Por favor, regístrate.");
      console.log(error);
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const redirectPath = data.role === "user" ? "/dashboard" : "/admin";
      console.log("Redirecting to:", getCountryPath(redirectPath)); // Debug log
      navigate(getCountryPath(redirectPath));
    }
  }, [isSuccess, data, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[Login] Iniciando login...");
    setEmailError(null);
    loginUser();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 flex flex-col">
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-1">
        {/* Izquierda: Formulario de login */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 flex items-center justify-center px-6 md:px-10 py-10">
          <div className="w-full max-w-md text-center">
            {emailError && (
              <p className="text-red-500 text-sm mb-4">{emailError}</p>
            )}
            <Link to={`${getCountryPath("/")}`}>
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
              Inicia sesión en MundoCar
            </h2>
            <p className="text-[#034651]/80 mt-2">
              Accede a tu cuenta para comprar, vender o rentar vehículos.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                    disabled={isLoginPending}
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
                  htmlFor="password"
                  className="block text-sm font-medium text-[#034651]"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoginPending}
                    className="w-full pl-10 pr-4 py-3 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent text-[#034651] placeholder-[#034651]/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                    placeholder="••••••••"
                    aria-label="Contraseña"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoginPending}
                className="w-full flex items-center justify-center gap-2 bg-[#034651] text-white font-semibold p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-[#05707f] transition-all focus:outline-none focus:ring-2 focus:ring-[#034651] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Iniciar sesión"
              >
                {isLoginPending ? "Iniciando..." : "Iniciar sesión"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-[#034651]/80">
              ¿No tienes una cuenta?{" "}
              <Link to={`${getCountryPath("registro")}`}>
                <button
                  className="text-[#034651] hover:underline font-medium"
                  aria-label="Crear una cuenta"
                >
                  Regístrate
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
              Inicia sesión para explorar nuestra amplia selección de vehículos
              nuevos y usados en toda Centroamérica.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#034651] text-white py-5 text-center">
        <p className="text-xs opacity-90">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
