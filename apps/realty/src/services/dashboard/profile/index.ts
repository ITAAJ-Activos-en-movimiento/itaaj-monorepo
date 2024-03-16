import axios from "axios";

export const fetchMyProperties = async (userId: number) => {
  try{
    const { data } = await axios.post(
      'http://localhost:8000/api/v1/dashboard/properties', 
      { userId }
    );

    return data;
  }catch(error){
    console.error('Error al obtener las propiedades:', error);
    throw error;
  }
}