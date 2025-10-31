import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  maxWidth?: string;
  className?: string;
  showCloseButton?: boolean;
  preventCloseOnOverlayClick?: boolean;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "60rem",
  maxWidth = "95%",
  className = "",
  showCloseButton = true,
  preventCloseOnOverlayClick = false,
}) => {
  const modalRoot = document.getElementById("modal-root");

  // 🔒 Bloqueo del scroll del body
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 
        bg-gradient-to-br from-[#012f36]/60 via-[#034651]/70 to-[#04606A]/60 
        backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      onClick={!preventCloseOnOverlayClick ? onClose : undefined}
    >
      {/* 🔹 Tarjeta principal del modal */}
      <div
        className={`relative flex flex-col bg-[#F7FAFA] rounded-2xl shadow-2xl border border-brand-primary/10 transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: window.innerWidth > 768 ? width : "90%",
          maxWidth,
          maxHeight: "90vh",
        }}
      >
        {/* 🔸 Header con color de marca */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 bg-brand-primary text-white rounded-t-2xl">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* 🔹 Contenido del modal */}
        <div className="flex-grow overflow-y-auto p-6 text-text-main">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};

export default ModalContainer;
