// Importamos las librerías necesarias dentro del worker
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd");

let model = null;

async function validateImage(file, index, angleKeywords, captureSteps) {
  let imgBitmap;
  try {
    imgBitmap = await createImageBitmap(file);
  } catch (error) {
    console.error("Error al decodificar la imagen:", error);
    return "El archivo parece no ser una imagen válida.";
  }

  const canvas = new OffscreenCanvas(imgBitmap.width, imgBitmap.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) return "No se pudo procesar la imagen.";
  ctx.drawImage(imgBitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, imgBitmap.width, imgBitmap.height);
  const data = imageData.data;
  let warning = "";

  if (imgBitmap.width < 600 || imgBitmap.height < 400)
    warning = "La resolución es muy baja (mínimo 600x400).";

  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 4)
    totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
  if (totalBrightness / (data.length / 4) < 40)
    warning = "La imagen parece demasiado oscura.";

  let totalContrast = 0;
  for (let i = 0; i < data.length - 4 * imgBitmap.width; i += 4) {
    const r1 = data[i],
      g1 = data[i + 1],
      b1 = data[i + 2];
    const r2 = data[i + 4 * imgBitmap.width],
      g2 = data[i + 1 + 4 * imgBitmap.width],
      b2 = data[i + 2 + 4 * imgBitmap.width];
    totalContrast += Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
  }
  if (totalContrast / (data.length / 4) < 15)
    warning = "La imagen parece desenfocada o borrosa.";

  if (model && warning === "") {
    const predictions = await model.detect(imgBitmap);
    // console.log("Predicciones de la IA:", predictions); // Descomentar para depurar

    const VEHICLE_CLASSES = ["car", "truck", "bus"];
    const vehicle = predictions.find((p) => VEHICLE_CLASSES.includes(p.class));

    if (!vehicle) return "No se detectó un vehículo en la imagen.";

    const [x, y, width, height] = vehicle.bbox;
    const areaRatio = (width * height) / (imgBitmap.width * imgBitmap.height);
    const centerX = x + width / 2;
    // Reglas de encuadre más flexibles (25% a 75%)
    const isCentered =
      centerX > imgBitmap.width * 0.25 && centerX < imgBitmap.width * 0.75;

    // Regla de área más flexible (acepta si ocupa más del 15%)
    if (areaRatio < 0.15) warning = "El vehículo está muy lejos.";
    if (!isCentered) warning = "El vehículo no está centrado en la imagen.";
  } else if (!model) {
    return "El modelo de IA no está listo. Intenta de nuevo.";
  }

  return warning;
}

self.onmessage = async (event) => {
  const { type, payload } = event.data;
  switch (type) {
    case "INIT":
      try {
        if (!model) model = await cocoSsd.load();
        self.postMessage({ type: "MODEL_READY" });
      } catch (error) {
        console.error("Error al cargar el modelo en el Worker:", error);
        self.postMessage({ type: "MODEL_ERROR" });
      }
      break;
    case "VALIDATE":
      const { file, index, angleKeywords, captureSteps } = payload;
      const warning = await validateImage(
        file,
        index,
        angleKeywords,
        captureSteps
      );
      self.postMessage({
        type: "VALIDATION_RESULT",
        // Añadimos 'file' al payload de respuesta
        payload: { index, warning, file },
      });
      // ---- FIN DE LA MODIFICACIÓN ----
      break;
  }
};
