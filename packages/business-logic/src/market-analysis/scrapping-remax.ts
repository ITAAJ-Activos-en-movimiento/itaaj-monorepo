import axios from "axios";

const colonies = [
  {
    techamachalco: 76688,
  },
];

const params = {
    moneda: 'MXN',
    operacion: 1,
    tipo: 1,
    colonia_id: 76692,
    locationKeyword: 'bosques de la herradura, huixquilucan de degollado, estado de méxico'
};

export const remaxScrapping = async (): Promise<any> => {
  let properties = [];

  const { data } = await axios.post(
    "https://remax.com.mx/ajax/FetchPropiedades"
  );

  data.data.prop_data
    .map((property) => {
      properties.push({
        m2T: Number(property.m2_terreno),
        m2C: Number(property.m2_construccion),
        banos: Number(property.banos),
        recamaras: Number(property.cuartos),
        precios: { vista: { precio: Number(property.mxn_corriente) } },
      });
    });

  console.log("proeprties",  data.data.prop_data)

  console.log("Cantidad Remax", properties.length);
  return properties;
};
