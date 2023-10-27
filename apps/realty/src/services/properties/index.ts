export const properties = async () => {
    try{
        const response = await fetch('https://troting.com/api/v1/properties');

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de propiedades.');
      }
  
      const data = await response.json();
  
      return data;
    }catch(error){
        console.error('Error al obtener las propiedades:', error);
        throw error;
    }
}