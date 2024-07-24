import axios from "axios";
import puppeteer from "puppeteer";


interface PropertyData {
    precios: {
      vista: { precio: number };
      contrato: number | null;
      principal: number | null;
    };
    m2T: number;
    m2C: number;
    recamaras: number;
    banos: number;
    fechaAlta: string;
    fechaModificacion: string;
  }
export const centuryScrapping = async ({ type, state, municipality, neighborhood }: { type: string, state: string, municipality: string, neighborhood: string }) => {
   let properties = []
    let base_url =""
    let actualType = "";

    if(type == "house"){
      actualType = "tipo_casa"
    }else{
      actualType = "tipo_departamento"
    }

    console.log({municipality})
    if(municipality == "naucalpan"){
        base_url = "https://century21mexico.com/v/resultados/tipo_casa/operacion_venta/en-pais_mexico/en-estado_" +
         state.toLowerCase() + "/en-municipio_" + municipality;
      
     }else{
        base_url = "https://century21mexico.com/v/resultados/tipo_casa/operacion_venta/en-pais_mexico/en-estado_" +
         state.toLowerCase() + "/en-municipio_" + municipality ;
     }

     console.log({base_url})
     console.log({actualType})

     const new_url = base_url.replace("{type}", actualType)
  const { data, status } = await axios.get(base_url, {
    params: {
      json: "true",
    },
  });

  const amount = Math.ceil(Number(data.totalHits) / 100);
  properties.push(...data.results)
  for (let i = 1; i < amount; i++) {
    const { data, status } = await axios.get(base_url + "/pagina_" + i, {
      params: {
        json: "true",
      },
    });

    properties.push(...data.results);
  }

  return properties;
}


  