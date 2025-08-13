import React, { useState, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

const backgroundImages = [
  "https://images.unsplash.com/photo-1585435465945-bef5a93d2422?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1517524206127-48f7b7b7dc6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
];

const CarImageUploadAndDrag: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<number>(0);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Obtener dimensiones reales de la imagen cargada
  useEffect(() => {
    if (image && imageRef.current) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    }
  }, [image]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const updatePosition = (clientX: number, clientY: number) => {
    if (dropZoneRef.current && imageRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      // Usar dimensiones reales de la imagen, ajustadas al tamaño renderizado
      const imgWidth = imageRef.current.offsetWidth;
      const imgHeight = imageRef.current.offsetHeight;
      const x = clientX - rect.left - imgWidth / 2;
      const y = clientY - rect.top - imgHeight / 2;
      setPosition({
        x: Math.max(0, Math.min(x, rect.width - imgWidth)),
        y: Math.max(0, Math.min(y, rect.height - imgHeight)),
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX, e.clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const changeBackground = (index: number) => {
    setCurrentBackground(index);
  };

  const downloadImage = () => {
    if (
      !canvasRef.current ||
      !dropZoneRef.current ||
      !image ||
      !imageRef.current
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = dropZoneRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous";
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      const carImage = new Image();
      carImage.crossOrigin = "anonymous";
      carImage.onload = () => {
        const imgWidth = imageRef.current!.offsetWidth;
        const imgHeight = imageRef.current!.offsetHeight;
        ctx.drawImage(carImage, position.x, position.y, imgWidth, imgHeight);
        const link = document.createElement("a");
        link.download = "car_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };
      carImage.src = image;
    };
    bgImage.src = backgroundImages[currentBackground];
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-900 min-h-screen">
      <div
        ref={dropZoneRef}
        className="relative w-full h-[50vh] sm:h-[60vh] max-w-4xl bg-gradient-to-b from-gray-800 to-gray-700 border-2 border-gray-500 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${backgroundImages[currentBackground]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!image ? (
          <div className="text-center bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg">
            <p className="text-lg sm:text-xl font-bold text-white mb-2">
              Sube la foto de tu auto
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mb-4">
              Arrastra y suelta aquí o selecciona una imagen
            </p>
            <label className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 cursor-pointer transition duration-300">
              Seleccionar imagen
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
            </label>
          </div>
        ) : (
          <img
            ref={imageRef}
            src={image}
            alt="Car"
            className="absolute max-w-[80%] max-h-[50%] object-contain cursor-move select-none"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full transition duration-300 ${
              currentBackground === index
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-gray-200 hover:bg-gray-500"
            }`}
            onClick={() => changeBackground(index)}
          >
            Fondo {index + 1}
          </button>
        ))}
        {image && (
          <button
            className="px-4 py-2 text-sm sm:text-base font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
            onClick={downloadImage}
          >
            Descargar imagen
          </button>
        )}
      </div>
      <p className="mt-4 text-xs sm:text-sm text-gray-400 text-center">
        Sube la foto de tu auto, arrástrala para posicionarla y selecciona un
        fondo.
      </p>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CarImageUploadAndDrag;
