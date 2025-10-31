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

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [user, setUser] = useState<IUserRegistered | null>(null);

  const getCountryPath = (path: string) =>
    !countryCode || path === "/"
      ? path
      : path.startsWith("/")
      ? `/${countryCode}${path}`
      : `/${countryCode}/${path}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") setEmailError(null);
  };

  const {
    mutate: loginUser,
    isPending: isLoginPending,
    data,
    isSuccess,
  } = useApiSend<IUserRegistered>(
    () => {
      const { email, password } = formData;
      if (!email || !password) {
        toast.error("Por favor, completa todos los campos.");
        throw new Error("Correo o contraseña vacíos");
      }
      return login(email, password);
    },
    async (data) => {
      setUser(data);
      toast.success("Inicio de sesión exitoso. ¡Bienvenido a MundoCar!");
    },
    (error) => {
      toast.error("El usuario no existe. Por favor, regístrate.");
      setEmailError("El usuario no existe. Por favor, regístrate.");
      console.error(error);
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const redirectPath = data.role === "user" ? "/dashboard" : "/admin";
      navigate(getCountryPath(redirectPath));
    }
  }, [isSuccess, data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    loginUser();
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-1">
        {/* 🧊 Izquierda: Panel de login */}
        <div className="bg-brand-card/80 backdrop-blur-lg border border-brand-primary/10 flex items-center justify-center px-6 md:px-10 py-12 shadow-inner">
          <div className="w-full max-w-md text-center">
            {/* Error */}
            {emailError && (
              <p className="text-red-500 text-sm mb-4">{emailError}</p>
            )}

            {/* Botón regresar */}
            <Link to={getCountryPath("/")}>
              <button className="mb-6 px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-hover transition-all duration-300 flex items-center gap-2 mx-auto shadow-sm hover:shadow-md">
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

            {/* Logo */}
            <img
              src="/assets/mundocar-logo.png"
              alt="MundoCar"
              className="mx-auto drop-shadow-md"
              width={230}
              loading="lazy"
            />

            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mt-4">
              Inicia sesión en MundoCar
            </h2>
            <p className="text-text-secondary mt-2">
              Accede a tu cuenta para comprar, vender o rentar vehículos.
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-text-main mb-1 text-left"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary/60" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoginPending}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      emailError ? "border-red-500" : "border-brand-primary/20"
                    } rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent text-text-main placeholder-text-secondary/40 shadow-sm hover:shadow-md transition disabled:opacity-50`}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-text-main mb-1 text-left"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary/60" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoginPending}
                    className="w-full pl-10 pr-4 py-3 border border-brand-primary/20 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent text-text-main placeholder-text-secondary/40 shadow-sm hover:shadow-md transition disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginPending}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-hover text-white font-semibold p-3 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
              >
                {isLoginPending ? "Iniciando..." : "Iniciar sesión"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-5 text-sm text-text-secondary">
              ¿No tienes una cuenta?{" "}
              <Link
                to={getCountryPath("registro")}
                className="text-brand-primary hover:underline font-semibold"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        {/* 🎥 Derecha: Video hero */}
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
              Inicia sesión para explorar vehículos nuevos y usados en toda
              Centroamérica.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-primary text-white py-5 text-center">
        <p className="text-xs opacity-80">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
