import axios from "axios";

const colonies = [
    {
        "techamachalco": 76688
    }
]

export const remaxScrapping = async (): Promise<any> => {
    let properties = [];
    
    const { data } = await axios.post("https://remax.com.mx/map/FetchMapData", {   moneda: 'MXN',
        operacion: 1,
        tipo: 1,
        colonia_id: 76688,
        locationKeyword: 'bosques de la herradura, huixquilucan de degollado, estado de méxico' });

    data.data.prop_data.filter((property) => property.tipo_nombre == "Casa" && property.estado_nombre == "Estado de México").map((property) => {
        properties.push({ m2T: Number(property.m2_terreno), m2C: Number(property.m2_construccion), banos: Number(property.banos), recamaras: Number(property.cuartos), precios:{ vista: { precio: Number(property.mxn_corriente) } }  })
    });

    console.log("proeprties",  data.data.prop_data)

    console.log("Cantidad Remax", properties.length)
    return properties;
}