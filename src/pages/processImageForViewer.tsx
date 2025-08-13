// Esta función ahora es mucho más simple y rápida.
// Toma la imagen original y el recuadro (bbox) detectado por la IA.
export async function processImageForViewer(
  file: File,
  bbox: [number, number, number, number], // [x, y, width, height]
  finalWidth = 800,
  finalHeight = 600
): Promise<string | null> {
  try {
    const imgBitmap = await createImageBitmap(file);

    // Desestructuramos el bbox para más claridad
    const [sx, sy, sWidth, sHeight] = bbox;

    const finalCanvas = new OffscreenCanvas(finalWidth, finalHeight);
    const finalCtx = finalCanvas.getContext("2d");
    if (!finalCtx) return null;

    // Lógica para escalar y centrar el RECORTE del auto
    // Se añade un 10% de padding para que el auto no toque los bordes
    const scale = Math.min(finalWidth / sWidth, finalHeight / sHeight) * 0.9;
    const scaledWidth = sWidth * scale;
    const scaledHeight = sHeight * scale;
    const dx = (finalWidth - scaledWidth) / 2;
    const dy = (finalHeight - scaledHeight) / 2;

    // Dibujamos solo la parte del auto de la imagen original en el canvas final
    finalCtx.drawImage(
      imgBitmap,
      sx,
      sy,
      sWidth,
      sHeight, // Coordenadas del recorte en la imagen original
      dx,
      dy,
      scaledWidth,
      scaledHeight // Coordenadas y tamaño en el canvas final
    );

    // Convertimos a Data URL, que es el método más robusto
    const blob = await finalCanvas.convertToBlob({ type: "image/png" });
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error en processImageForViewer:", error);
    return null;
  }
}
