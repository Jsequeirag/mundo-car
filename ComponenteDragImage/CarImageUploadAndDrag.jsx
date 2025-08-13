import React, { useState, useRef } from "react";

const CarImageUploadAndDrag = () => {
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef(null);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 150; // Ajustar para centrar la imagen
      const y = e.clientY - rect.top - 100;
      setPosition({
        x: Math.max(0, Math.min(x, rect.width - 300)), // Limitar al área
        y: Math.max(0, Math.min(y, rect.height - 200)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 min-h-screen">
      <div
        ref={dropZoneRef}
        className="relative w-full max-w-4xl h-[500px] bg-gradient-to-b from-gray-800 to-gray-700 border-2 border-gray-500 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1585435465945-bef5a93d2422?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {!image ? (
          <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
            <p className="text-xl font-bold text-white mb-2">
              Sube la foto de tu auto
            </p>
            <p className="text-sm text-gray-300 mb-4">
              Arrastra y suelta aquí o selecciona una imagen
            </p>
            <label className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 cursor-pointer transition duration-300">
              Seleccionar imagen
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>
        ) : (
          <img
            src={image}
            alt="Car"
            className="absolute w-96 h-64 object-contain cursor-move select-none"
            style={{ left: position.x, top: position.y }}
            onMouseDown={handleMouseDown}
          />
        )}
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Sube la foto de tu auto y arrástrala para posicionarla en el fondo del
        concesionario.
      </p>
    </div>
  );
};

export default CarImageUploadAndDrag;
