import { Development } from "@itaaj/entities";
import axios from "axios";

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

export const generateMarketAnalysis = async ({ state, municipio, colonia }: { state: string, municipio: string, colonia: string }) => {
  let base_url =""

    if(municipio == "naucalpan"){
       base_url = "https://century21mexico.com/v/resultados/tipo_casa/operacion_venta/en-pais_mexico/en-estado_" +
        state.toLowerCase() + "/en-municipio_" + municipio + "/en-colonia_" + state + "-" + municipio + "-" + colonia;
     
    }else{
       base_url = "https://century21mexico.com/v/resultados/tipo_casa/operacion_venta/en-pais_mexico/en-estado_" +
        state.toLowerCase() + "/en-municipio_" + municipio + "/en-colonia_" + colonia;
    }

    const params = { json: "true" };
  const { data, status } = await axios.get(base_url, {
    params: {
      json: "true",
    },
  });

  console.log(data.totalHits);

  let properties: PropertyData[] = [];
  properties.push(...data.results);
  const amount = Math.ceil(Number(data.totalHits) / 100);

  console.log({ amount });
  for (let i = 1; i < amount; i++) {
    const { data, status } = await axios.get(base_url + "/pagina_" + i, {
      params: {
        json: "true",
      },
    });

    console.log("Lo envio");
    properties.push(...data.results);
  }

  console.log("Porperties", properties.length);
  const preciosProp = properties.map((propiedad) =>
    Number(propiedad.precios.vista.precio)
  );
  const sumaPrecios = preciosProp.reduce(
    (acc, precio) => acc + Number(precio),
    0
  );

  const precioPromedio = sumaPrecios / preciosProp.length;

  const totalPrecioPorMetroCuadrado = data.results.reduce(
    (total, propiedad) => {
      const precioPorMetroCuadrado =
        propiedad.precios.vista.precio / (propiedad.m2T + propiedad.m2C);
      return total + precioPorMetroCuadrado;
    },
    0
  );

  const preciosPorMetroCuadrado = properties.map(
    (propiedad) => propiedad.precios.vista.precio / (propiedad.m2T + propiedad.m2C)
  );

  const precios = properties.map((propiedad) => propiedad.precios.vista.precio);
  const distribucion = {
    "<1M": precios.filter((precio) => precio < 1000000).length,
    "1M-2M": precios.filter((precio) => precio >= 1000000 && precio < 2000000)
      .length,
    "2M-3M": precios.filter((precio) => precio >= 2000000 && precio < 3000000)
      .length,
    "3M-4M": precios.filter((precio) => precio >= 3000000 && precio < 4000000)
      .length,
    ">4M": precios.filter((precio) => precio >= 4000000).length,
  };
const precioPromedioPorMetroCuadrado = totalPrecioPorMetroCuadrado / preciosPorMetroCuadrado.length;

  //Desviación Estandar
  const promedio = totalPrecioPorMetroCuadrado;
  const sumatoriaDiferenciasCuadrado = preciosPorMetroCuadrado.reduce(
    (sum, precio) => sum + Math.pow(precio - precioPromedioPorMetroCuadrado, 2),
    0
  );

  const varianza = sumatoriaDiferenciasCuadrado / preciosPorMetroCuadrado.length;
  const desviacionEstandar = Math.sqrt(varianza);

  // for (let i = 0; i < data.totalHits; i++) {

  // }

  // for (let i = 0; i < 5; i++) {
  //     let url = base_url;
  //     if(i > 1){
  //         url =  base_url + "pagina_" + String(i)
  //     }

  //     const { data, status } = await axios.get(url, {
  //         params: {
  //             json: "true"
  //         }
  //     });

  //     if (status == 200){
  //         console.log(data)
  //     }

  // }

  return {
    properties: data.results.slice(0, 6),
    precioPromedio: precioPromedio,
    precioPorMetro: totalPrecioPorMetroCuadrado / data.results.length,
    distribucion: distribucion,
    desviacionEstandar: desviacionEstandar,
    amount: Number(data.totalHits),
  };
};

const calculateDaysPublished = (fechaAlta: string) => {
  const today = new Date();
  const publishedDate = new Date(fechaAlta);
  const timeDifference = today.getTime() - publishedDate.getTime();
  return Math.floor(timeDifference / (1000 * 3600 * 24));
};
