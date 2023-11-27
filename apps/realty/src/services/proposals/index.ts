import axios from "axios";

export const createProposal = async (data: any) => {

  console.log(data)
    try{
        const response = await axios.post('https://itaajrealty.com/api/api/v1/proposals', data );

      // if (!response.ok) {
      //   throw new Error('No se pudo obtener la lista de propiedades.');
      // }
  
      const info = await response.data;
  
      return info;
    }catch(error){
        console.error('Error al obtener las propiedades:', error);
        throw error;
    }
}
