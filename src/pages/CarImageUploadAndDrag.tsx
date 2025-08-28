import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { throttle } from "lodash";
import { useParams, Link } from "react-router-dom";

interface Position {
  x: number;
  y: number;
}

interface Transform {
  position: Position;
  scale: number;
  rotation: number;
}

const backgroundImages = ["/assets/CustomShowRoom/showroom-1.png"];

const CarImageUploadAndDrag: React.FC = () => {
  const getCountryPath = (path: string) => {
    const { countryCode } = useParams<{ countryCode?: string }>();
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };

  const [image, setImage] = useState<string | null>(null);
  const [transform, setTransform] = useState<Transform>({
    position: { x: 20, y: 20 },
    scale: 1,
    rotation: 0,
  });
  const [backgroundScale, setBackgroundScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<number>(0);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [dropZoneRect, setDropZoneRect] = useState<DOMRect | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preload background images
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Update drop zone dimensions on mount and resize
  useEffect(() => {
    const updateRect = () => {
      if (dropZoneRef.current) {
        setDropZoneRect(dropZoneRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  // Get image dimensions
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
    if (!file.type.startsWith("image/")) {
      alert("Por favor, sube un archivo de imagen (PNG, JPEG).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es demasiado grande. El tamaño máximo es 5MB.");
      return;
    }
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
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const updatePosition = (clientX: number, clientY: number) => {
    if (dropZoneRect && imageRef.current) {
      const imgWidth = imageRef.current.offsetWidth;
      const imgHeight = imageRef.current.offsetHeight;
      const x = clientX - dropZoneRect.left - imgWidth / 2;
      const y = clientY - dropZoneRect.top - imgHeight / 2;
      setTransform((prev) => ({
        ...prev,
        position: {
          x: Math.max(0, Math.min(x, dropZoneRect.width - imgWidth)),
          y: Math.max(0, Math.min(y, dropZoneRect.height - imgHeight)),
        },
      }));
    }
  };

  const throttledUpdatePosition = throttle(updatePosition, 16);

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        throttledUpdatePosition(e.clientX, e.clientY);
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        throttledUpdatePosition(touch.clientX, touch.clientY);
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.5, Math.min(prev.scale - e.deltaY * 0.001, 2)),
    }));
  };

  const handleRotate = () => {
    setTransform((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!image) return;
    switch (e.key) {
      case "ArrowUp":
        setTransform((prev) => ({
          ...prev,
          position: { ...prev.position, y: prev.position.y - 10 },
        }));
        break;
      case "ArrowDown":
        setTransform((prev) => ({
          ...prev,
          position: { ...prev.position, y: prev.position.y + 10 },
        }));
        break;
      case "ArrowLeft":
        setTransform((prev) => ({
          ...prev,
          position: { ...prev.position, x: prev.position.x - 10 },
        }));
        break;
      case "ArrowRight":
        setTransform((prev) => ({
          ...prev,
          position: { ...prev.position, x: prev.position.x + 10 },
        }));
        break;
    }
  };

  const changeBackground = (index: number) => {
    setCurrentBackground(index);
  };

  const adjustCarScale = (delta: number) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.5, Math.min(prev.scale + delta, 2)),
    }));
  };

  const adjustBackgroundScale = (delta: number) => {
    setBackgroundScale((prev) => Math.max(0.5, Math.min(prev + delta, 2)));
  };

  const handleUploadAnother = () => {
    setImage(null);
    setTransform({ position: { x: 20, y: 20 }, scale: 1, rotation: 0 });
    fileInputRef.current?.click();
  };

  const downloadImage = () => {
    if (!canvasRef.current || !dropZoneRect || !image || !imageRef.current)
      return;
    setIsLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dropZoneRect.width;
    canvas.height = dropZoneRect.height;

    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous";
    bgImage.onload = () => {
      const bgWidth = canvas.width * backgroundScale;
      const bgHeight = canvas.height * backgroundScale;
      const bgX = (canvas.width - bgWidth) / 2;
      const bgY = (canvas.height - bgHeight) / 2;
      ctx.drawImage(bgImage, bgX, bgY, bgWidth, bgHeight);

      const carImage = new Image();
      carImage.crossOrigin = "anonymous";
      carImage.onload = () => {
        const imgWidth = imageRef.current!.offsetWidth;
        const imgHeight = imageRef.current!.offsetHeight;
        ctx.translate(
          transform.position.x + imgWidth / 2,
          transform.position.y + imgHeight / 2
        );
        ctx.rotate((transform.rotation * Math.PI) / 180);
        ctx.scale(transform.scale, transform.scale);
        ctx.drawImage(
          carImage,
          -imgWidth / 2,
          -imgHeight / 2,
          imgWidth,
          imgHeight
        );
        ctx.resetTransform();
        ctx.font = "16px Montserrat";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(
          "Powered by [YourBrand]",
          canvas.width - 150,
          canvas.height - 20
        );
        const link = document.createElement("a");
        link.download = "car_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        setIsLoading(false);
      };
      carImage.src = image;
    };
    bgImage.src = backgroundImages[currentBackground];
  };

  // Handle Next button click (replace with your desired route)
  const handleNext = () => {
    // Example: Navigate to the next step in the process
    // Replace '/next-step' with the actual route
    window.location.href = getCountryPath("/next-step");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 min-h-screen">
      <div className="w-full">
        <Link to={`${getCountryPath("/publicar")}`}>
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
            Regresar
          </button>
        </Link>
      </div>
      <div
        ref={dropZoneRef}
        role="region"
        aria-label="Zona para subir y posicionar la imagen del auto"
        tabIndex={0}
        className="relative w-full h-[60vh] max-w-5xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:ring-4 hover:ring-blue-400/50"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${backgroundImages[currentBackground]}')`,
          backgroundSize: `${backgroundScale * 100}%`,
          backgroundPosition: "center",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!image ? (
          <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
            <p className="text-2xl font-bold text-white mb-2 font-montserrat">
              Sube la foto de tu auto
            </p>
            <p className="text-sm text-gray-300 mb-4">
              Arrastra y suelta aquí o selecciona una imagen
            </p>
            <label className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 cursor-pointer transition duration-300 transform hover:scale-105">
              Seleccionar imagen
              <input
                ref={fileInputRef}
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
            className={`absolute max-w-[80%] max-h-[50%] object-contain cursor-move select-none transition-transform duration-100 ${
              isDragging ? "shadow-lg ring-2 ring-blue-500/50" : ""
            }`}
            style={{
              left: `${transform.position.x}px`,
              top: `${transform.position.y}px`,
              transform: `scale(${transform.scale}) rotate(${transform.rotation}deg)`,
              willChange: "transform",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onWheel={handleWheel}
          />
        )}
      </div>
      <div className="mt-4">
        {backgroundImages.map((bg, index) => (
          <button
            key={index}
            className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
              currentBackground === index
                ? "ring-2 ring-blue-500"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => changeBackground(index)}
            aria-label={`Seleccionar fondo ${index + 1}`}
          >
            <img
              src={bg}
              alt={`Fondo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {image && (
          <>
            <div className="flex gap-2">
              <button
                className="h-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                onClick={() => adjustCarScale(-0.1)}
                title="Disminuir tamaño del auto"
              >
                -
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                onClick={() => adjustCarScale(0.1)}
                title="Aumentar tamaño del auto"
              >
                +
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                onClick={() => adjustBackgroundScale(-0.1)}
                title="Disminuir fondo"
              >
                -
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                onClick={() => adjustBackgroundScale(0.1)}
                title="Aumentar fondo"
              >
                +
              </button>
            </div>
            <button
              className="px-6 py-3 text-base font-semibold bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 transform hover:scale-105"
              onClick={downloadImage}
            >
              Descargar imagen
            </button>
            <button
              className="px-6 py-3 text-base font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105"
              onClick={handleUploadAnother}
            >
              Subir otra imagen
            </button>
            <Link to={getCountryPath("/publicar")}>
              <button
                className={`px-6 py-3 text-base font-semibold rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  image
                    ? "bg-[#034651] text-white hover:bg-[#023a44]"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!image}
                onClick={handleNext}
              >
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-400 text-center font-montserrat">
        Sube la foto de tu auto, arrástrala para posicionarla, ajusta el tamaño
        y selecciona un fondo.
      </p>
      <p className="mt-4 text-sm text-gray-400 text-center font-montserrat">
        Quitar fondo a imagen con
        <a
          href="https://www.erase.bg/es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline font-semibold"
        >
          {" "}
          erase.bg
        </a>{" "}
        o una herramienta similar
      </p>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CarImageUploadAndDrag;
