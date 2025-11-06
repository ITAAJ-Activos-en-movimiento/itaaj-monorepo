import { useParams } from "next/navigation";

export const developments = async () => {
    try{
        const response = await fetch('https://itaaj-api-gt8a.onrender.com/api/v1/developments', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de desarrollos.');
      }
      // console.log(response)
      const data = await response.json();
      // console.log({data})
      return data;
    }catch(error){
        console.error('Error al obtener los Desarrollos:', error);
        throw error;
    }
}

// const response = await fetch(`https://itaaj-api-gt8a.onrender.com/api/v1/properties-developments?page=${page}&limit=${limit}&type=${type}&state=${state}`, { cache: 'no-store' });

export const propertiesDevelopments = async ({ type, page, limit, state }: { type: string,page: number, limit: number, state?: string }) => {
  try{
      const response = await fetch(`http://localhost:8002/api/v1/properties-developments?page=${page}&limit=${limit}&type=${type}&state=${state}`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de desarrollos.');
    }
    // console.log(response)
    const data = await response.json();
    // console.log({data})
    return data;
  }catch(error){
      console.error('Error al obtener los Desarrollos:', error);
      throw error;
  }
}


export const developmentApi = async (slug: string) => {
  try{
      const response = await fetch(`https://itaaj-api-gt8a.onrender.com/api/v1/developments/${slug}`, { cache: 'no-store' });

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