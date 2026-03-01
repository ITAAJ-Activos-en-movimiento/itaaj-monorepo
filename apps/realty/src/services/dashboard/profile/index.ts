import axios from "axios";

export const fetchMyProfile = async (userId: string) => {
  try {
    const { data } = await axios.post(
      'https://itaaj-realty.onrender.com/api/v1/dashboard/profile',
      { userId }
    )
    return data;
  } catch (error) {
    console.error("Error al obtener el perfil: ", error)
    throw error;
  }
}

export const fetchMyDevelopments = async (userId: number) => {
  try{
    const { data } = await axios.post(
      'https://itaaj-realty.onrender.com/api/v1/dashboard/developments', 
      { userId }
    );

    return data;
  }catch(error){
    console.error('Error al obtener las propiedades:', error);
    throw error;
  }
}