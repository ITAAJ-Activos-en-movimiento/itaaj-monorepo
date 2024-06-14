import { Development } from "@itaaj/entities";
import axios from "axios";
import { PropiedadesScrapping } from "./scrapping-propc";
import { centuryScrapping } from "./scrapping-century";

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
  let properties: PropertyData[] = [];
  const centuryProperties = await centuryScrapping({ state, municipio, colonia });
  // const propiedadesProperties = await PropiedadesScrapping();
  
  properties.push(...centuryProperties);
  // properties.push(...propiedadesProperties);
 
  properties = properties.filter((property) => property.precios.vista.precio !== null && property.m2C > 0)
    
  const preciosProp = properties.map((propiedad) =>
    Number(propiedad.precios.vista.precio)
  );

  const sumaPrecios = preciosProp.reduce(
    (acc, precio) => acc + Number(precio),
    0
  );


  const precioPromedio = sumaPrecios / preciosProp.length;

  console.log({precioPromedio});

  const totalPrecioPorMetroCuadrado = calcularPrecioPromedioPorMetroCuadrado(properties);
  console.log({totalPrecioPorMetroCuadrado})

  const preciosPorMetroCuadrado = properties.map(
    (propiedad) => propiedad.precios.vista.precio / (propiedad.m2C + propiedad.m2T)
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


  //Desviación Estandar
  const promedio = totalPrecioPorMetroCuadrado;
  const sumatoriaDiferenciasCuadrado = preciosPorMetroCuadrado.reduce(
    (sum, precio) => sum + Math.pow(precio - totalPrecioPorMetroCuadrado, 2),
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
    properties: properties,
    precioPromedio: precioPromedio,
    precioPorMetro: totalPrecioPorMetroCuadrado,
    distribucion: distribucion,
    desviacionEstandar: desviacionEstandar,
    amount: Number(properties.length),
  };
};

const calculateDaysPublished = (fechaAlta: string) => {
  const today = new Date();
  const publishedDate = new Date(fechaAlta);
  const timeDifference = today.getTime() - publishedDate.getTime();
  return Math.floor(timeDifference / (1000 * 3600 * 24));
};


function calcularPrecioPromedioPorMetroCuadrado(propiedades: PropertyData[]): number {
  if (propiedades.length === 0) {
      return 0; // En caso de que el arreglo esté vacío, retornar 0 o NaN según convenga.
  }

  // Calcular la suma total de precios y de metros cuadrados
  let sumaPrecios = 0;
  let sumaMetrosCuadrados = 0;

  propiedades.forEach(propiedad => {
      sumaPrecios += Number(propiedad.precios.vista.precio);
      sumaMetrosCuadrados += (propiedad.m2C + propiedad.m2T);
  });

  // Calcular el precio promedio por metro cuadrado
  const precioPromedioPorMetroCuadrado = sumaPrecios / sumaMetrosCuadrados;

  return precioPromedioPorMetroCuadrado;
}