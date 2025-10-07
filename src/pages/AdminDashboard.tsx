import React, { useState, useEffect } from "react";
import useCountryStore from "@/store/countryStore";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Search,
  Clock,
  Eye,
  Edit3,
  Trash2,
  User,
  Key,
} from "lucide-react";
import ModalContainer from "@/components/ModalContainer";

// Tipos de datos
interface UserStats {
  country: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
}

interface AdStats {
  country: string;
  totalAds: number;
  pendingAds: number;
  approvedAds: number;
  rejectedAds: number;
}

interface PendingAd {
  id: string;
  title: string;
  userName: string;
  country: string;
  price: number;
  images: string[];
  status: "pending";
  createdAt: string;
  views: number;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  role: "admin" | "user";
}

interface AdminDashboardProps {
  userStats?: UserStats[];
  adStats?: AdStats[];
  pendingAds?: PendingAd[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  userStats: propUserStats,
  adStats: propAdStats,
  pendingAds: propPendingAds,
}) => {
  const { countries } = useCountryStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "ads" | "pending"
  >("overview");
  const [selectedAd, setSelectedAd] = useState<PendingAd | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");

  // Datos mock para los seis países (ajustados a cientos)
  const userStats: UserStats[] = propUserStats || [
    { country: "Honduras", totalUsers: 150, activeUsers: 110, newUsers: 5 },
    { country: "Costa Rica", totalUsers: 125, activeUsers: 89, newUsers: 4 },
    { country: "El Salvador", totalUsers: 100, activeUsers: 75, newUsers: 3 },
    { country: "Guatemala", totalUsers: 130, activeUsers: 95, newUsers: 4 },
    { country: "Nicaragua", totalUsers: 90, activeUsers: 65, newUsers: 2 },
    { country: "Panamá", totalUsers: 80, activeUsers: 60, newUsers: 2 },
  ];

  const adStats: AdStats[] = propAdStats || [
    {
      country: "Honduras",
      totalAds: 500,
      pendingAds: 15,
      approvedAds: 460,
      rejectedAds: 25,
    },
    {
      country: "Costa Rica",
      totalAds: 450,
      pendingAds: 12,
      approvedAds: 420,
      rejectedAds: 18,
    },
    {
      country: "El Salvador",
      totalAds: 350,
      pendingAds: 9,
      approvedAds: 320,
      rejectedAds: 21,
    },
    {
      country: "Guatemala",
      totalAds: 400,
      pendingAds: 11,
      approvedAds: 370,
      rejectedAds: 19,
    },
    {
      country: "Nicaragua",
      totalAds: 300,
      pendingAds: 8,
      approvedAds: 280,
      rejectedAds: 17,
    },
    {
      country: "Panamá",
      totalAds: 250,
      pendingAds: 7,
      approvedAds: 230,
      rejectedAds: 15,
    },
  ];

  const pendingAds: PendingAd[] = propPendingAds || [
    {
      id: "1",
      title: "Toyota Corolla 2019 - Excelente estado",
      userName: "Juan Pérez",
      country: "hr",
      price: 15000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T10:30:00Z",
      views: 45,
    },
    {
      id: "2",
      title: "Honda Civic 2020 - Bajo kilometraje",
      userName: "María González",
      country: "cr",
      price: 18000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T09:15:00Z",
      views: 23,
    },
    {
      id: "3",
      title: "Ford F-150 2018 - 4x4",
      userName: "Carlos López",
      country: "sv",
      price: 25000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T08:45:00Z",
      views: 67,
    },
    {
      id: "4",
      title: "Nissan Sentra 2021 - Como nuevo",
      userName: "Ana Ramírez",
      country: "gt",
      price: 20000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T08:00:00Z",
      views: 12,
    },
    {
      id: "5",
      title: "Hyundai Tucson 2017",
      userName: "Luis Fernández",
      country: "ni",
      price: 17000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T07:30:00Z",
      views: 35,
    },
    {
      id: "6",
      title: "BMW X5 2019 - Full extras",
      userName: "Sofía Castro",
      country: "pa",
      price: 35000,
      images: ["/assets/car-placeholder.jpg"],
      status: "pending",
      createdAt: "2025-09-28T07:00:00Z",
      views: 89,
    },
  ];

  // Datos mock para usuarios
  const adminUsers: AdminUser[] = [
    {
      id: "1",
      name: "Admin Honduras",
      email: "admin.hn@autoapp.com",
      status: "active",
      role: "admin",
    },
    {
      id: "2",
      name: "Admin Costa Rica",
      email: "admin.cr@autoapp.com",
      status: "active",
      role: "admin",
    },
    {
      id: "3",
      name: "Usuario Inactivo",
      email: "user@autoapp.com",
      status: "inactive",
      role: "user",
    },
  ];

  // Filtrar anuncios pendientes
  const filteredPendingAds = pendingAds
    .filter((ad) => ad.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((ad) => filterCountry === "all" || ad.country === filterCountry);

  // Función para aprobar anuncio (visual)
  const approveAd = (adId: string) => {
    console.log(`[Admin] Aprobando anuncio ID: ${adId}`);
    setSelectedAd(null);
    setShowAdModal(false);
  };

  // Función para rechazar anuncio (visual)
  const rejectAd = (adId: string, reason: string) => {
    console.log(`[Admin] Rechazando anuncio ID: ${adId} - Razón: ${reason}`);
    setSelectedAd(null);
    setShowAdModal(false);
  };

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

  // Log del país actual al cargar el componente
  /* useEffect(() => {
    console.log(
      `[AdminDashboard] País actual: ${country?.name} (${country?.code})`
    );
  }, [country]);*/

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#034651]/10 to-[#034651]/5 dark:from-[#034651]/20 dark:to-[#034651]/10">
      {/* Header del Dashboard */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-[#034651]/20 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#034651] to-[#05707f] rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#034651] dark:text-white">
                  Panel de Administración
                </h1>
                <p className="text-sm text-[#034651]/80 dark:text-[#034651]/60">
                  Gestión de plataforma multipaís
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-[#034651]/80 dark:text-[#034651]/60">
                {}
              </div>
              <button
                onClick={() => {
                  console.log("[AdminDashboard] Abriendo modal de perfil");
                  setShowProfileModal(true);
                }}
                className="p-2 bg-[#034651]/10 rounded-full hover:bg-[#034651]/20 transition-colors"
              >
                <User className="h-5 w-5 text-[#034651]" />
              </button>
              <button className="px-4 py-2 bg-[#034651] text-white rounded-xl hover:bg-[#05707f] transition-colors">
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs de navegación */}
        <div className="flex border-b border-[#034651]/20 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: "overview" as const, label: "Resumen" },
              { key: "users" as const, label: "Usuarios" },
              { key: "ads" as const, label: "Publicaciones" },
              { key: "pending" as const, label: "Pendientes" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  console.log(
                    `[AdminDashboard] Cambiando a pestaña: ${tab.label}`
                  );
                  setActiveTab(tab.key);
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-[#034651] text-[#034651] dark:text-[#05707f]"
                    : "border-transparent text-[#034651]/60 hover:text-[#034651] hover:border-[#034651]/30 dark:text-[#034651]/40 dark:hover:text-[#05707f]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de tabs */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Card Total Usuarios */}
              <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#034651]/10 rounded-2xl group-hover:bg-[#034651]/20 transition-colors">
                    <Users className="h-6 w-6 text-[#034651]" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#034651]">
                      {userStats.reduce((sum, u) => sum + u.totalUsers, 0)}
                    </p>
                    <p className="text-sm text-[#034651]/80">
                      Usuarios Totales
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#034651] font-medium">
                    +12% vs mes anterior
                  </div>
                  <div className="text-xs text-[#034651]/60">
                    Actualizado hoy
                  </div>
                </div>
              </div>

              {/* Card Publicaciones Totales */}
              <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#034651]/10 rounded-2xl group-hover:bg-[#034651]/20 transition-colors">
                    <FileText className="h-6 w-6 text-[#034651]" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#034651]">
                      {adStats.reduce((sum, a) => sum + a.totalAds, 0)}
                    </p>
                    <p className="text-sm text-[#034651]/80">
                      Publicaciones Totales
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#034651] font-medium">
                    +8% vs mes anterior
                  </div>
                  <div className="text-xs text-[#034651]/60">
                    Actualizado hoy
                  </div>
                </div>
              </div>

              {/* Card Pendientes */}
              <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#034651]/10 rounded-2xl group-hover:bg-[#034651]/20 transition-colors">
                    <Clock className="h-6 w-6 text-[#034651]" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#034651]">
                      {adStats.reduce((sum, a) => sum + a.pendingAds, 0)}
                    </p>
                    <p className="text-sm text-[#034651]/80">
                      Pendientes de Aprobar
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#034651] font-medium">
                    +15 pendientes
                  </div>
                  <div className="text-xs text-[#034651]/60">Última hora</div>
                </div>
              </div>

              {/* Card Usuarios Activos */}
              <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#034651]/10 rounded-2xl group-hover:bg-[#034651]/20 transition-colors">
                    <Eye className="h-6 w-6 text-[#034651]" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#034651]">
                      {userStats.reduce((sum, u) => sum + u.activeUsers, 0)}
                    </p>
                    <p className="text-sm text-[#034651]/80">
                      Usuarios Activos
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#034651] font-medium">
                    +5% hoy
                  </div>
                  <div className="text-xs text-[#034651]/60">
                    En tiempo real
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos de estadísticas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Gráfico de usuarios por país */}
              <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-[#034651] mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Usuarios por País
                </h3>
                <div className="space-y-4">
                  {userStats.map((stats) => (
                    <div
                      key={stats.country}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#034651]"></div>
                        <span className="font-medium text-[#034651]">
                          {stats.country}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#034651]">
                          {stats.totalUsers}
                        </p>
                        <p className="text-sm text-[#034651]/80">
                          {(
                            (stats.totalUsers /
                              userStats.reduce(
                                (sum, u) => sum + u.totalUsers,
                                0
                              )) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfico de publicaciones por país */}
              <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-[#034651] mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Publicaciones por País
                </h3>
                <div className="space-y-4">
                  {adStats.map((stats) => (
                    <div
                      key={stats.country}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#034651]"></div>
                        <span className="font-medium text-[#034651]">
                          {stats.country}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#034651]">
                          {stats.totalAds}
                        </p>
                        <p className="text-sm text-[#034651]/80">
                          {(
                            (stats.totalAds /
                              adStats.reduce((sum, a) => sum + a.totalAds, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#034651] flex items-center gap-2">
                <Users className="h-5 w-5" />
                Administrar Usuarios
              </h3>
              <button className="px-4 py-2 bg-[#034651] text-white rounded-xl hover:bg-[#05707f] transition-colors flex items-center gap-2">
                <User className="h-4 w-4" />
                Crear Nuevo Administrador
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#034651]/20">
                <thead className="bg-[#034651]/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Correo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#034651]/20">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#034651]/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#034651]">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]/80">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "active"
                              ? "bg-[#034651]/10 text-[#034651]"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]/80">
                        {user.role === "admin" ? "Administrador" : "Usuario"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-2 text-[#034651] hover:text-[#05707f] hover:bg-[#034651]/10 rounded-lg transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            className={`p-2 ${
                              user.status === "active"
                                ? "text-[#034651] hover:text-[#05707f] hover:bg-[#034651]/10"
                                : "text-green-400 hover:text-green-600 hover:bg-green-50"
                            } rounded-lg transition-colors`}
                          >
                            {user.status === "active" ? (
                              <XCircle className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "ads" && (
          <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-[#034651] mb-6">
              Estadísticas de Publicaciones
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#034651]/20">
                <thead className="bg-[#034651]/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      País
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Pendientes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Aprobadas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Rechazadas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#034651]/20">
                  {adStats.map((stats) => (
                    <tr key={stats.country} className="hover:bg-[#034651]/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#034651]/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-[#034651]">
                              {stats.country.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#034651]">
                              {stats.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]">
                        {stats.totalAds}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#034651]/10 text-[#034651]">
                          {stats.pendingAds}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {stats.approvedAds}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {stats.rejectedAds}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#034651] hover:text-[#05707f] mr-3">
                          Ver detalles
                        </button>
                        <button className="text-[#034651]/60 hover:text-[#034651]">
                          Exportar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "pending" && (
          <div className="bg-white/80 backdrop-blur-xl border border-[#034651]/20 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-lg font-semibold text-[#034651] flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Anuncios Pendientes de Aprobación
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
                      `[AdminDashboard] Filtrando anuncios por país: ${e.target.value}`
                    );
                    setFilterCountry(e.target.value);
                  }}
                  className="px-4 py-2 border border-[#034651]/20 rounded-xl focus:ring-2 focus:ring-[#034651] focus:border-transparent"
                >
                  <option value="all">Todos los países</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#034651]/20">
                <thead className="bg-[#034651]/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#034651]/80 uppercase tracking-wider">
                      Usuario
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
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#034651]/20">
                  {filteredPendingAds.map((ad) => (
                    <tr key={ad.id} className="hover:bg-[#034651]/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#034651] truncate max-w-xs">
                          {ad.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#034651]">
                          {ad.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#034651]/10 text-[#034651]">
                          {ad.country.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]">
                        {ad.price.toLocaleString()}{" "}
                        {countries.find((c) => c.code === ad.country)?.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]/80">
                        {formatDate(ad.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#034651]">
                        {ad.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => {
                              console.log(
                                `[Admin] Previsualizando anuncio ID: ${ad.id}`
                              );
                              setSelectedAd(ad);
                              setShowAdModal(true);
                            }}
                            className="p-2 text-[#034651] hover:text-[#05707f] hover:bg-[#034651]/10 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-[#034651]/60 hover:text-[#034651] hover:bg-[#034651]/10 rounded-lg transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredPendingAds.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-[#034651]/60 mb-4" />
                <h3 className="text-lg font-medium text-[#034651] mb-2">
                  No hay anuncios pendientes
                </h3>
                <p className="text-[#034651]/80">
                  Todos los anuncios han sido revisados y aprobados
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal de previsualización de anuncio */}
        {selectedAd && (
          <ModalContainer
            isOpen={showAdModal}
            onClose={() => {
              console.log("[Admin] Cerrando modal de previsualización");
              setSelectedAd(null);
              setShowAdModal(false);
            }}
            title="Revisar Anuncio"
            width="48rem"
          >
            <div className="space-y-6">
              <div className="aspect-video bg-[#034651]/10 rounded-xl overflow-hidden">
                <img
                  src={selectedAd.images[0] || "/assets/car-placeholder.jpg"}
                  alt={selectedAd.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-[#034651] mb-2">
                    {selectedAd.title}
                  </h4>
                  <p className="text-3xl font-bold text-[#034651] mb-4">
                    {selectedAd.price.toLocaleString()}{" "}
                    {
                      countries.find((c) => c.code === selectedAd.country)
                        ?.currency
                    }
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#034651]/80 mb-4">
                    <span>Por: {selectedAd.userName}</span>
                    <span>•</span>
                    <span>
                      {countries.find((c) => c.code === selectedAd.country)
                        ?.name || selectedAd.country.toUpperCase()}
                    </span>
                    <span>•</span>
                    <span>{formatDate(selectedAd.createdAt)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#034651]/80">
                    <Eye className="h-4 w-4" />
                    <span>{selectedAd.views} vistas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#034651]/80">
                    <Clock className="h-4 w-4" />
                    <span>Pendiente de aprobación</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t border-[#034651]/20">
                <button
                  onClick={() => {
                    console.log(
                      `[Admin] Aprobando anuncio ID: ${selectedAd.id}`
                    );
                    approveAd(selectedAd.id);
                  }}
                  className="flex-1 bg-[#034651] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#05707f] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Aprobar Anuncio
                </button>
                <button
                  onClick={() => {
                    console.log(
                      `[Admin] Rechazando anuncio ID: ${selectedAd.id} - Razón: Contenido inapropiado`
                    );
                    rejectAd(selectedAd.id, "Contenido inapropiado");
                  }}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="h-5 w-5" />
                  Rechazar
                </button>
              </div>
            </div>
          </ModalContainer>
        )}

        {/* Modal de perfil */}
        {showProfileModal && (
          <ModalContainer
            isOpen={showProfileModal}
            onClose={() => {
              console.log("[AdminDashboard] Cerrando modal de perfil");
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
                    Admin Principal
                  </h4>
                  <p className="text-sm text-[#034651]/80">admin@autoapp.com</p>
                </div>
              </div>
              <button className="w-full bg-[#034651] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#05707f] transition-colors flex items-center justify-center gap-2">
                <Key className="h-5 w-5" />
                Restablecer Contraseña
              </button>
            </div>
          </ModalContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
