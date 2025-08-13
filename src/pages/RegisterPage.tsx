import React from "react";
import { ChevronRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
const RegisterPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };
  const handleRegister = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    console.log("Register attempt:", {
      name,
      email,
      password,
      confirmPassword,
    });
    // Integrate with your backend API here
    // fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password, confirmPassword }) })
  };

  const handleSwitchToLogin = () => {
    console.log("Switch to login");
    // Example: navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    handleRegister(name, email, password, confirmPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Contenedor a pantalla completa */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-1">
        {/* Izquierda: Formulario de registro */}
        <div className="bg-white flex items-center justify-center px-6 md:px-10 py-10">
          <div className="w-full max-w-md text-center">
            {" "}
            <Link to={`${getCountryPath("inicio")}`}>
              {" "}
              <button className="mb-6 px-4 py-2 bg-[#034651] text-white rounded-md hover:bg-[#023a44] transition-colors duration-300 flex items-center gap-2">
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
                Atrás
              </button>
            </Link>
            <img
              src="/assets/mundocar-logo.png"
              alt="MundoCar"
              className="mx-auto"
              width={250}
              loading="lazy"
            />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-4">
              Crea tu cuenta en MundoCar
            </h2>
            <p className="text-gray-600 mt-2">
              Regístrate para comprar, vender o rentar vehículos en
              Centroamérica.
            </p>
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="
                    w-full mt-1 p-3 border border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                    text-gray-800 placeholder-gray-400
                    shadow-sm hover:shadow-md transition
                  "
                  placeholder="Tu nombre completo"
                  aria-label="Nombre completo"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="
                    w-full mt-1 p-3 border border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                    text-gray-800 placeholder-gray-400
                    shadow-sm hover:shadow-md transition
                  "
                  placeholder="tucorreo@ejemplo.com"
                  aria-label="Correo electrónico"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="
                    w-full mt-1 p-3 border border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                    text-gray-800 placeholder-gray-400
                    shadow-sm hover:shadow-md transition
                  "
                  placeholder="••••••••"
                  aria-label="Contraseña"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-800"
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="
                    w-full mt-1 p-3 border border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                    text-gray-800 placeholder-gray-400
                    shadow-sm hover:shadow-md transition
                  "
                  placeholder="••••••••"
                  aria-label="Confirmar contraseña"
                />
              </div>{" "}
              <Link to={`${getCountryPath("publicar")}`}>
                <button
                  type="submit"
                  className="
                  w-full flex items-center justify-center gap-2
                  bg-brand-primary text-white font-semibold p-3 rounded-xl
                  shadow-sm hover:shadow-md hover:bg-brand-primary/90
                  transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary
                "
                  aria-label="Crear cuenta"
                >
                  Crear cuenta
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to={`${getCountryPath("inicio")}`}>
                <button
                  onClick={handleSwitchToLogin}
                  className="text-brand-primary hover:underline font-medium"
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Texto centrado verticalmente */}
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

      {/* Franja inferior */}
      <div className="bg-brand-primary text-white py-5 text-center">
        <p className="text-xs opacity-90">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
