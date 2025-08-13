import React, { useState, useEffect, useRef, useCallback } from "react";

import { captureSteps } from "./captureConfig";
import { Car360Viewer } from "@/components/Car360Viewer";
// Importamos ambas funciones del procesador
import { processImageForViewer } from "./processImageForViewer";
type ModelStatus = "loading" | "ready" | "error";

const Car360CaptureGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<(File | null)[]>(
    Array(captureSteps.length).fill(null)
  );
  const [warnings, setWarnings] = useState<string[]>(
    Array(captureSteps.length).fill("")
  );
  const [showSummary, setShowSummary] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>("loading");
  const [processedImages, setProcessedImages] = useState<(string | null)[]>(
    Array(captureSteps.length).fill(null)
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("/imageValidator.worker.js", import.meta.url)
    );
    workerRef.current.postMessage({ type: "INIT" });

    workerRef.current.onmessage = async (event: MessageEvent) => {
      const { type, payload } = event.data;
      switch (type) {
        case "MODEL_READY":
          setModelStatus("ready");
          break;
        case "MODEL_ERROR":
          setModelStatus("error");
          break;
        case "VALIDATION_RESULT":
          const { index, warning, bbox, file } = payload;

          setWarnings((prev) => {
            const newWarnings = [...prev];
            newWarnings[index] = warning;
            return newWarnings;
          });

          if (warning === "" && file && bbox) {
            setIsProcessing(true);
            try {
              const processedUrl = await processImageForViewer(file, bbox);
              setProcessedImages((prev) => {
                const newUrls = [...prev];
                newUrls[index] = processedUrl;
                return newUrls;
              });
            } catch (e) {
              console.error("Fallo el procesamiento de la imagen:", e);
            } finally {
              setIsProcessing(false);
            }
          }
          break;
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  const handleImageUpload = useCallback(
    (file: File | null) => {
      if (!file || modelStatus !== "ready" || isProcessing) return;
      const newImages = [...images];
      newImages[currentStep] = file;
      setImages(newImages);

      setWarnings((prev) => {
        const newWarnings = [...prev];
        newWarnings[currentStep] = "Validando imagen...";
        return newWarnings;
      });

      workerRef.current?.postMessage({
        type: "VALIDATE",
        payload: { file, index: currentStep },
      });
    },
    [currentStep, isProcessing, modelStatus]
  );

  const handleNext = () => {
    if (currentStep < captureSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const imageUrls = images.map((file) =>
    file ? URL.createObjectURL(file) : ""
  );

  return (
    <div className="p-4 max-w-3xl mx-auto font-sans">
      {!showSummary ? (
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Paso {currentStep + 1} de {captureSteps.length}
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Captura: {captureSteps[currentStep]}
          </p>

          <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-50 transition-colors">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)}
              className="sr-only"
              disabled={modelStatus !== "ready" || isProcessing}
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer ${
                modelStatus !== "ready" || isProcessing
                  ? "cursor-not-allowed opacity-60"
                  : "hover:text-blue-600"
              }`}
            >
              {modelStatus === "loading" && (
                <p>⏳ Cargando IA de validación...</p>
              )}
              {modelStatus === "error" && <p>❌ Error al cargar la IA.</p>}
              {isProcessing && <p>✨ Recortando y centrando imagen...</p>}
              {modelStatus === "ready" && !isProcessing && (
                <p>Haz clic o arrastra una imagen aquí</p>
              )}
            </label>
          </div>

          {images[currentStep] && (
            <div className="mt-4">
              <img
                src={processedImages[currentStep] || imageUrls[currentStep]}
                alt={`Foto del paso ${currentStep + 1}`}
                className="w-full max-h-96 object-contain rounded border border-gray-300"
              />
              {warnings[currentStep] && (
                <p
                  className={`mt-2 font-semibold text-center ${
                    warnings[currentStep].startsWith("Validando")
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {warnings[currentStep].startsWith("Validando") ? "⏳" : "⚠️"}{" "}
                  {warnings[currentStep]}
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={
              !processedImages[currentStep] ||
              warnings[currentStep] !== "" ||
              isProcessing
            }
            className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {currentStep < captureSteps.length - 1
              ? "Siguiente"
              : "Ver Resumen"}
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Resumen de Imágenes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {processedImages.map((url, i) =>
              url ? (
                <div
                  key={i}
                  className="border p-2 rounded-lg shadow-sm bg-gray-200"
                >
                  <img
                    src={url}
                    alt={`Imagen ${i + 1}`}
                    className="w-full h-40 object-contain rounded"
                  />
                  <p className="text-sm font-bold mt-1">{captureSteps[i]}</p>
                </div>
              ) : (
                <div
                  key={i}
                  className="border p-2 rounded-lg shadow-sm bg-gray-100 flex items-center justify-center"
                >
                  <p className="text-sm text-gray-500">Pendiente</p>
                </div>
              )
            )}
          </div>
          <button
            onClick={() => setShowViewer(true)}
            className="mt-6 w-full bg-green-600 text-white px-4 py-3 rounded-lg font-bold text-lg hover:bg-green-700"
          >
            Ver en 360°
          </button>
          {showViewer && (
            <Car360Viewer
              images={processedImages.filter((url) => url) as string[]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Car360CaptureGuide;
