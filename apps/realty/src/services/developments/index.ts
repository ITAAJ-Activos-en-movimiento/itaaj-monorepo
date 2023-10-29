export const developments = async () => {
    try{
        const response = await fetch('https://troting.com/api/v1/developments', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de desarrollos.');
      }
      console.log(response)
      const data = await response.json();
      console.log({data})
      return data;
    }catch(error){
        console.error('Error al obtener los Desarrollos:', error);
        throw error;
    }
}