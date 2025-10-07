import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Clock,
  Eye,
  ChevronRight,
  Edit3,
  Trash2,
  User,
  Key,
  Car,
  Building,
  AlertCircle,
} from "lucide-react";
import ModalContainer from "@/components/ModalContainer";
import { Country } from "../interfaces/IUser";

// Tipos de datos
interface UserAd {
  id: string;
  title: string;
  country: Country;
  price: number;
  images: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  views: number;
}

interface Autolote {
  id: string;
  name: string;
  country: Country;
  cars: UserAd[];
}

interface Concessionaire {
  id: string;
  name: string;
  country: Country;
  cars: UserAd[];
}

interface UserDashboardProps {
  userAds?: UserAd[];
  autolotes?: Autolote[];
  concessionaires?: Concessionaire[];
  isSubscribed?: boolean;
}

// Lista de países para el filtro
const COUNTRIES = [
  { code: Country.Honduras, name: "Honduras", currency: "HNL" },
  { code: Country.CostaRica, name: "Costa Rica", currency: "CRC" },
  { code: Country.ElSalvador, name: "El Salvador", currency: "USD" },
  { code: Country.Guatemala, name: "Guatemala", currency: "GTQ" },
  { code: Country.Nicaragua, name: "Nicaragua", currency: "NIO" },
  { code: Country.Panama, name: "Panamá", currency: "USD" },
];

const UserDashboard: React.FC<UserDashboardProps> = ({
  userAds: propUserAds,
  autolotes: propAutolotes,
  concessionaires: propConcessionaires,
  isSubscribed = false,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(
    !isSubscribed
  );

  // Datos mock
  const userAds: UserAd[] = propUserAds || [
    {
      id: "1",
      title: "Toyota Corolla 2019 - Excelente estado",
      country: Country.Honduras,
      price: 15000,
      images: ["/assets/car-placeholder.jpg"],
      status: "approved",
      createdAt: "2025-09-28T10:30:00Z",
      views: 45,
    },
    {
      id: "2",
      title: "Honda Civic 2020 - Bajo kilometraje",
      country: Country.CostaRica,
      price: 18000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T09:15:00Z",
      views: 23,
    },
    {
      id: "3",
      title: "Ford F-150 2018 - 4x4",
      country: Country.ElSalvador,
      price: 25000,
      images: ["/assets/car-placeholder.jpg"],
      status: "approved",
      createdAt: "2025-09-28T08:45:00Z",
      views: 67,
    },
    {
      id: "4",
      title: "Nissan Sentra 2021 - Como nuevo",
      country: Country.Guatemala,
      price: 20000,
      images: ["/assets/car-placeholder.jpg"],
      status: "rejected",
      createdAt: "2025-09-28T08:00:00Z",
      views: 12,
    },
    {
      id: "5",
      title: "Hyundai Tucson 2017",
      country: Country.Nicaragua,
      price: 17000,
      images: ["/assets/car-placeholder.jpg"],
      status: "approved",
      createdAt: "2025-09-28T07:30:00Z",
      views: 35,
    },
    {
      id: "6",
      title: "BMW X5 2019 - Full extras",
      country: Country.Panama,
      price: 35000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T07:00:00Z",
      views: 89,
    },
  ];

  const autolotes: Autolote[] = propAutolotes || [
    {
      id: "lot1",
      name: "Autolote San Pedro",
      country: Country.Honduras,
      cars: [
        {
          id: "lot1-car1",
          title: "Mazda 3 2020",
          country: Country.Honduras,
          price: 16000,
          images: ["/assets/car-placeholder.jpg"],
          status: "approved",
          createdAt: "2025-09-28T11:00:00Z",
          views: 30,
        },
        {
          id: "lot1-car2",
          title: "Kia Rio 2019",
          country: Country.Honduras,
          price: 14000,
          images: ["/assets/car-placeholder.jpg"],
          status: "pending",
          createdAt: "2025-09-28T10:45:00Z",
          views: 15,
        },
      ],
    },
    {
      id: "lot2",
      name: "Autolote Heredia",
      country: Country.CostaRica,
      cars: [
        {
          id: "lot2-car1",
          title: "Toyota RAV4 2021",
          country: Country.CostaRica,
          price: 22000,
          images: ["/assets/car-placeholder.jpg"],
          status: "approved",
          createdAt: "2025-09-28T10:15:00Z",
          views: 50,
        },
      ],
    },
  ];

  const concessionaires: Concessionaire[] = propConcessionaires || [
    {
      id: "deal1",
      name: "Concesionario MundoCar HN",
      country: Country.Honduras,
      cars: [
        {
          id: "deal1-car1",
          title: "Mercedes-Benz C300 2020",
          country: Country.Honduras,
          price: 30000,
          images: ["/assets/car-placeholder.jpg"],
          status: "approved",
          createdAt: "2025-09-28T09:30:00Z",
          views: 70,
        },
      ],
    },
    {
      id: "deal2",
      name: "Concesionario MundoCar CR",
      country: Country.CostaRica,
      cars: [
        {
          id: "deal2-car1",
          title: "Audi Q5 2019",
          country: Country.CostaRica,
          price: 28000,
          images: ["/assets/car-placeholder.jpg"],
          status: "pending",
          createdAt: "2025-09-28T09:00:00Z",
          views: 25,
        },
      ],
    },
  ];

  // Filtrar publicaciones
  const filteredAds = userAds
    .filter((ad) => ad.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((ad) => filterCountry === "all" || ad.country === filterCountry);

  // Filtrar autolotes
  const filteredAutolotes = autolotes
    .filter((lot) => lot.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((lot) => filterCountry === "all" || lot.country === filterCountry);

  // Filtrar concesionarios
  const filteredConcessionaires = concessionaires
    .filter((deal) =>
      deal.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (deal) => filterCountry === "all" || deal.country === filterCountry
    );

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Componente para renderizar tabla de autos
  const CarTable = ({
    cars,
    parentId,
    parentType,
  }: {
    cars: UserAd[];
    parentId: string;
    parentType: "ad" | "autolote" | "concessionaire";
  }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#034651]/20">
        <thead className="bg-[#034651]/5">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              País
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              Vistas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#034651]/20">
          {cars.map((car) => (
            <tr key={car.id} className="hover:bg-[#034651]/5">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-[#034651] truncate max-w-xs">
                  {car.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#034651]/10 text-[#034651]">
                  {car.country.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]">
                {car.price.toLocaleString()}{" "}
                {COUNTRIES.find((c) => c.code === car.country)?.currency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]/80">
                {formatDate(car.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]">
                {car.views}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    car.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : car.status === "pending"
                      ? "bg-[#034651]/10 text-[#034651]"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {car.status === "approved"
                    ? "Aprobado"
                    : car.status === "pending"
                    ? "Pendiente"
                    : "Rechazado"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() =>
                      console.log(
                        `[UserDashboard] Previsualizando ${parentType} auto ID: ${car.id} de ${parentId}`
                      )
                    }
                    className="p-2 text-[#034651] hover:text-[#05707f] hover:bg-[#034651]/10 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      console.log(
                        `[UserDashboard] Editando ${parentType} auto ID: ${car.id} de ${parentId}`
                      )
                    }
                    className="p-2 text-[#034651]/60 hover:text-[#034651] hover:bg-[#034651]/10 rounded-lg transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      console.log(
                        `[UserDashboard] Eliminando ${parentType} auto ID: ${car.id} de ${parentId}`
                      )
                    }
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 dark:from-[#034651]/20 dark:to-[#034651]/10">
      {/* Banner de suscripción */}
      {!isSubscribed && (
        <div className="bg-[#034651] text-white py-4 px-6 text-center">
          <p className="text-sm font-medium">
            ¡Suscríbete a un plan para desbloquear todas las funcionalidades de
            MundoCar!
            <button
              onClick={() => {
                console.log(
                  "[UserDashboard] Abriendo modal de suscripción desde banner"
                );
                setShowSubscriptionModal(true);
              }}
              className="ml-4 inline-flex items-center px-4 py-2 bg-[#05707f] rounded-xl hover:bg-[#034651] transition-colors"
            >
              Suscribirse ahora
            </button>
          </p>
        </div>
      )}

      {/* Header del Dashboard */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-[#034651]/20 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#034651] to-[#05707f] rounded-2xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#034651] dark:text-white">
                  Mi Panel de Control
                </h1>
                <p className="text-sm text-[#034651]/80 dark:text-[#034651]/60">
                  Gestiona tus anuncios, autolotes y concesionarios
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  console.log("[UserDashboard] Abriendo modal de perfil");
                  setShowProfileModal(true);
                }}
                className="p-2 bg-[#034651]/10 rounded-full hover:bg-[#034651]/20 transition-colors"
              >
                <User className="h-5 w-5 text-[#034651]" />
              </button>
              <button
                onClick={() => {
                  console.log("[UserDashboard] Cerrando sesión");
                  navigate("/hr/inicio");
                }}
                className="px-4 py-2 bg-[#034651] text-white rounded-xl hover:bg-[#05707f] transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sección de publicaciones personales */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-[#034651] flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tus Publicaciones
            </h3>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#034651]/60" />
                <input
                  type="text"
                  placeholder="Buscar anuncios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent w-64"
                />
              </div>
              <select
                value={filterCountry}
                onChange={(e) => {
                  console.log(
                    `[UserDashboard] Filtrando por país: ${e.target.value}`
                  );
                  setFilterCountry(e.target.value);
                }}
                className="px-4 py-2 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent"
              >
                <option value="all">Todos los países</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {filteredAds.length > 0 ? (
            <CarTable cars={filteredAds} parentId="user" parentType="ad" />
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-[#034651]/60 mb-4" />
              <h3 className="text-lg font-medium text-[#034651] mb-2">
                No hay publicaciones
              </h3>
              <p className="text-[#034651]/80">No has publicado anuncios aún</p>
            </div>
          )}
        </div>

        {/* Sección de autolotes */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl mb-8">
          <h3 className="text-lg font-semibold text-[#034651] flex items-center gap-2 mb-6">
            <Car className="h-5 w-5" />
            Tus Autolotes
          </h3>
          {filteredAutolotes.length > 0 ? (
            filteredAutolotes.map((lot) => (
              <div key={lot.id} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-[#034651]">
                    {lot.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        console.log(
                          `[UserDashboard] Editando autolote ID: ${lot.id}`
                        )
                      }
                      className="p-2 text-[#034651]/60 hover:text-[#034651] hover:bg-[#034651]/10 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        console.log(
                          `[UserDashboard] Eliminando autolote ID: ${lot.id}`
                        )
                      }
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {lot.cars.length > 0 ? (
                  <CarTable
                    cars={lot.cars}
                    parentId={lot.id}
                    parentType="autolote"
                  />
                ) : (
                  <div className="text-center py-6">
                    <Car className="mx-auto h-10 w-10 text-[#034651]/60 mb-4" />
                    <p className="text-[#034651]/80">
                      No hay autos en este autolote
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Car className="mx-auto h-12 w-12 text-[#034651]/60 mb-4" />
              <h3 className="text-lg font-medium text-[#034651] mb-2">
                No hay autolotes
              </h3>
              <p className="text-[#034651]/80">
                No tienes autolotes registrados
              </p>
            </div>
          )}
        </div>

        {/* Sección de concesionarios */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-[#034651] flex items-center gap-2 mb-6">
            <Building className="h-5 w-5" />
            Tus Concesionarios
          </h3>
          {filteredConcessionaires.length > 0 ? (
            filteredConcessionaires.map((deal) => (
              <div key={deal.id} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-[#034651]">
                    {deal.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        console.log(
                          `[UserDashboard] Editando concesionario ID: ${deal.id}`
                        )
                      }
                      className="p-2 text-[#034651]/60 hover:text-[#034651] hover:bg-[#034651]/10 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        console.log(
                          `[UserDashboard] Eliminando concesionario ID: ${deal.id}`
                        )
                      }
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {deal.cars.length > 0 ? (
                  <CarTable
                    cars={deal.cars}
                    parentId={deal.id}
                    parentType="concessionaire"
                  />
                ) : (
                  <div className="text-center py-6">
                    <Car className="mx-auto h-10 w-10 text-[#034651]/60 mb-4" />
                    <p className="text-[#034651]/80">
                      No hay autos en este concesionario
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-[#034651]/60 mb-4" />
              <h3 className="text-lg font-medium text-[#034651] mb-2">
                No hay concesionarios
              </h3>
              <p className="text-[#034651]/80">
                No tienes concesionarios registrados
              </p>
            </div>
          )}
        </div>

        {/* Modal de perfil */}
        {showProfileModal && (
          <ModalContainer
            isOpen={showProfileModal}
            onClose={() => {
              console.log("[UserDashboard] Cerrando modal de perfil");
              setShowProfileModal(false);
            }}
            title="Mi Perfil"
            width="32rem"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#034651]/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-[#034651]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#034651]">
                    Usuario Ejemplo
                  </h4>
                  <p className="text-sm text-[#034651]/80">
                    usuario@autoapp.com
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  console.log("[UserDashboard] Restableciendo contraseña")
                }
                className="w-full bg-[#034651] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#05707f] transition-colors flex items-center justify-center gap-2"
              >
                <Key className="h-5 w-5" />
                Restablecer Contraseña
              </button>
            </div>
          </ModalContainer>
        )}

        {/* Modal de suscripción */}
        {showSubscriptionModal && (
          <ModalContainer
            isOpen={showSubscriptionModal}
            onClose={() => {
              console.log("[UserDashboard] Cerrando modal de suscripción");
              setShowSubscriptionModal(false);
            }}
            title="¡Suscríbete a MundoCar!"
            width="32rem"
          >
            <div className="space-y-6">
              <p className="text-[#034651]/80">
                Para disfrutar de todas las funcionalidades, como gestionar
                autolotes y concesionarios, suscríbete a uno de nuestros planes.
              </p>
              <button
                onClick={() => {
                  console.log(
                    "[UserDashboard] Navegando a planes de suscripción"
                  );
                  navigate("/hr/plans"); // Ruta de ejemplo para planes
                }}
                className="w-full bg-[#034651] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#05707f] transition-colors flex items-center justify-center gap-2"
              >
                Ver Planes
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </ModalContainer>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
