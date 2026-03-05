import * as XLSX from 'xlsx';

export const useDownloadProperties = (properties: any) => {

    const download = () => {
        const modifiedProperties = properties.map((property: any) => ({
            ...property,
            liga: `https://century21mexico.com${property.urlCorrectaPropiedad}`
          }));
    
        const worksheet = XLSX.utils.json_to_sheet(modifiedProperties);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Propiedades');
    
        // Convierte el libro de trabajo a un archivo binario (Buffer)
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
        // Crea un objeto Blob a partir del buffer de Excel
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        // Crea un objeto URL para el Blob y crea un enlace para descargar el archivo
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'properties.xlsx'); // Nombre del archivo
    
        // Simula un clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();
    
        // Limpia el objeto URL creado para la descarga
        URL.revokeObjectURL(url);
      }

      return {
        download
      }

}