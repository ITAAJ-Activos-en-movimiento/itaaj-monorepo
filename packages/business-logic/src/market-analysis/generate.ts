import { Development } from "@itaaj/entities";
import axios from "axios";

export const generateMarketAnalysis = async ( { state }: { state: string } ) => {
    const base_url = "https://century21mexico.com/v/resultados/tipo_casa/operacion_venta/en-pais_mexico/en-estado_" + state.toLowerCase();
    const params = { "json": "true" }
    const { data, status } = await axios.get(base_url, {
        params: {
            json: "true"
        }
    });

    const preciosProp = data.results.map(propiedad => Number(propiedad.precios.vista.precio));
    const sumaPrecios = preciosProp.reduce((acc, precio) => acc + Number(precio), 0);

    const precioPromedio = sumaPrecios / preciosProp.length;
    console.log({precioPromedio})

        const totalPrecioPorMetroCuadrado = data.results.reduce((total, propiedad) => {
            const precioPorMetroCuadrado = propiedad.precios.vista.precio / propiedad.m2T;
            return total + precioPorMetroCuadrado;
        }, 0);
    const precios = data.results.map(propiedad => propiedad.precios.vista.precio);
    const distribucion = {
        '<1M': precios.filter(precio => precio < 1000000).length,
        '1M-2M': precios.filter(precio => precio >= 1000000 && precio < 2000000).length,
        '2M-3M': precios.filter(precio => precio >= 2000000 && precio < 3000000).length,
        '3M-4M': precios.filter(precio => precio >= 3000000 && precio < 4000000).length,
        '>4M': precios.filter(precio => precio >= 4000000).length
    };
    console.log({distribucion});


    //Desviación Estandar
    const promedio = precios.reduce((total, precio) => total + precio, 0) / precios.length;
    const sumatoriaDiferenciasCuadrado = precios.reduce((sum, precio) => sum + Math.pow(precio - promedio, 2), 0);
    const varianza = sumatoriaDiferenciasCuadrado / precios.length;
    const desv = Math.sqrt(varianza);
    
    console.log(desv);
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
        desviacionEstandar: desv,
        amount: data.results.length
    }
};
