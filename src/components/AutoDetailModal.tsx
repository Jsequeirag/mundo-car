import React, { useState } from "react";
import { X } from "lucide-react";

interface AutoDetailsModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const AutoDetailsModal: React.FC<AutoDetailsModalProps> = ({
  onClose,
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors duration-300 z-50 shadow-lg"
        >
          <X size={20} />
        </button>
        <div className="relative">
          <div
            className={`transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoDetailsModal;
