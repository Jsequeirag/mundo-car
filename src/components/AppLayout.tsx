import React, { useState } from "react";
import Header from "./Header";

import Footer from "./Footer";
import { mockUsedPremiumCars } from "@/data/mockUsedPremiumCars";
import { mockNewCars } from "@/data/mockNewCars";

import Hero from "./Hero";
import CategoryShowcase from "./CategoryShowcase";
import BusinessCTA from "@/components/BusinessCTA";
import MobileSidebar from "./MobileSidebar";

import { useParams, Outlet } from "react-router-dom";
const AppLayout: React.FC = () => {
  const [usedCars, setUsedCars] = useState(mockUsedPremiumCars);
  const [newCars, setNewCars] = useState(mockNewCars);
  const [loading, setLoading] = useState(false);

  const handleSearch = (filters: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsedCars(mockUsedPremiumCars);
      setNewCars(mockNewCars);
      setLoading(false);
    }, 1000);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { countryCode } = useParams<{ countryCode?: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        // Puedes pasar los navItems al MobileSidebar si no los define internamente
        // navItems={/* el mismo array navItems que tienes en Header, o adaptado */}
      />
      <div className="pt-[80px]">
        <Hero />
        <CategoryShowcase /> <BusinessCTA />
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
