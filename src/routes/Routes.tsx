import { Navigate } from "react-router-dom";
import CountrySelectionPage from "@/pages/CountrySelectionPage";
import HomePage from "@/pages/HomePage";
import NewCarsPage from "@/pages/NewCarsPage";
import UsedCarsPage from "@/pages/UsedCarsPage";
import AutoPartsPage from "@/pages/AutoPartsPage";
import LubricentrosPage from "@/pages/LubricentrosPage";
import RentalCarsPage from "@/pages/RentalCarsPage";
import Car360CaptureGuide from "@/pages/Car360CaptureGuide";
import CarDetailsPage from "@/pages/CarDetailsPage";
import PublishCarPage from "@/pages/PublishCarPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AutoLotsPage from "@/pages/AutoLotsPage";
import CarImageUploadAndDrag from "@/pages/CarImageUploadAndDrag";
import AutoDetailsPage from "@/pages/AutoDetailsPage";
import NewAutoDetailPage from "@/pages/NewAutoDetailPage";
import AutoBrandPage from "@/pages/AutoBrandPage";
import AdminDashboard from "@/pages/AdminDashboard";
import UserDashboard from "@/pages/UserDashboard";
import ManageAdsPage from "@/pages/ManageAdsPage";
import NotFound from "@/pages/NotFound";

export default [
  {
    path: "/",
    element: <Navigate to="/hr" replace />,
    title: "Redirect to Default Country",
  },
  {
    path: "/select-country",
    element: <CountrySelectionPage />,
    title: "Country Selection",
  },
  {
    path: "/:countryCode",
    element: <HomePage />,
    title: "Home",
  },
  {
    path: "/:countryCode/cars/:carId",
    element: <CarDetailsPage />,
    title: "Car Details",
  },
  {
    path: "/:countryCode/autos-nuevos",
    element: <NewCarsPage />,
    title: "New Cars",
  },
  {
    path: "/:countryCode/autos-usados",
    element: <UsedCarsPage />,
    title: "Used Cars",
  },
  {
    path: "/:countryCode/repuestos",
    element: <AutoPartsPage />,
    title: "Auto Parts",
  },
  {
    path: "/:countryCode/lubricentros",
    element: <LubricentrosPage />,
    title: "Lubricentros",
  },
  {
    path: "/:countryCode/renta",
    element: <RentalCarsPage />,
    title: "Car Rental",
  },
  {
    path: "/publicar/360",
    element: <Car360CaptureGuide />,
    title: "Car 360 Capture Guide",
  },
  {
    path: "/:countryCode/publicar",
    element: <PublishCarPage />,
    title: "Publish Car",
  },
  {
    path: "/:countryCode/CarImageUploadAndDrag",
    element: <CarImageUploadAndDrag />,
    title: "Car Image Upload",
  },
  {
    path: "/:countryCode/inicio",
    element: <LoginPage />,
    title: "Login",
  },
  {
    path: "/:countryCode/registro",
    element: <RegisterPage />,
    title: "Register",
  },
  {
    path: "/:countryCode/autolote/:id",
    element: <AutoLotsPage />,
    title: "Auto Lots",
  },
  {
    path: "/:countryCode/autoDetailsPage",
    element: <AutoDetailsPage />,
    title: "Auto Details",
  },
  {
    path: "/:countryCode/newAutoDetailsPage",
    element: <NewAutoDetailPage />,
    title: "New Auto Details",
  },
  {
    path: "/:countryCode/autoBrandPage",
    element: <AutoBrandPage />,
    title: "Auto Brand",
  },
  {
    path: "/:countryCode/admin",
    element: <AdminDashboard />,
    title: "Admin Dashboard",
  },
  {
    path: "/:countryCode/dashboard",
    element: <UserDashboard />,
    title: "User Dashboard",
  },
  {
    path: "/:countryCode/ManageAdsPage",
    element: <ManageAdsPage />,
    title: "Manage Ads ",
  },
  {
    path: "*",
    element: <NotFound />,
    title: "Not Found",
  },
];
