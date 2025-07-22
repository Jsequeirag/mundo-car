import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Search, Heart, User, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    // Replaced the multi-color gradient with your brand-primary color
    <header className="bg-brand-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* Kept white/20 for icon background to maintain contrast and subtle transparency */}
            <div className="bg-white/20 p-2 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AutoTrader</h1>
              {/* Adjusted text opacity for slightly better readability on darker background */}
              <p className="text-xs text-white/90">Find Your Dream Car</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              {/* Adjusted search icon color for better visibility */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
              <Input
                placeholder="Search cars, makes, models..."
                // Adjusted input background, border, and placeholder for better contrast
                className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/70 focus:bg-white/20 focus:border-white"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-white hover:bg-white/20 hover:text-white" // Ensured hover text remains white
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-white hover:bg-white/20 hover:text-white" // Ensured hover text remains white
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/20 hover:text-white" // Ensured hover text remains white
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            {/* Adjusted search icon color for mobile search */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
            <Input
              placeholder="Search cars..."
              // Adjusted input background, border, and placeholder for mobile search
              className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/70 focus:bg-white/20 focus:border-white"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
