export const downloadFiles = async (arrFiles: String[]) => {
  try {
    const blobs: Blob[] = [];

    for (const rutaArchivo of arrFiles) {
      const respuestaArchivo = await fetch(rutaArchivo as string);

      if (!respuestaArchivo.ok) {
        throw new Error(`Error al descargar el archivo ${rutaArchivo}`);
      }

      const blobArchivo = await respuestaArchivo.blob();
      blobs.push(blobArchivo);
    }

    for (let i = 0; i < blobs.length; i++) {
      const blob = blobs[i];
      const enlaceArchivo = document.createElement('a');
      const nameFile = arrFiles[i].split('.')[0];
      const typeFile = arrFiles[i].split('.')[1];

      enlaceArchivo.href = URL.createObjectURL(blob);
      enlaceArchivo.download = `${nameFile}.${typeFile}`;
      document.body.appendChild(enlaceArchivo);
      enlaceArchivo.click();
      URL.revokeObjectURL(enlaceArchivo.href);
      document.body.removeChild(enlaceArchivo);
    }
  } catch (error) {
    console.error(error);
  }
};