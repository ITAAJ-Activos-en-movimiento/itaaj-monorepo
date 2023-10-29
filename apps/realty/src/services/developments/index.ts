export const developments = async () => {
    try{
        const response = await fetch('https://troting.com/api/v1/developments');

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de desarrollos.');
      }
  
      const data = await response.json();
  
      return data;
    }catch(error){
        console.error('Error al obtener los Desarrollos:', error);
        throw error;
    }
}