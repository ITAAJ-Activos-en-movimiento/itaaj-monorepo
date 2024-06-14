import { Button, Field } from "@/components";
import styles from "./Create.module.css";
import { Info } from "react-feather";
import { useForm, useUploadImage } from "@/hooks";
import { Development } from "@itaaj/entities";
// import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useGenerateAnalysis } from "@/hooks/developments/useGenerateAnalysis";
import { DivisaFormater } from "@/utilities";
import BarChart from "../Bar";
import { Table } from "@/containers";
import PropertyRow from "../Table/PropertyRow";
import { colonias, municipios } from "./data";
import * as XLSX from 'xlsx';

const INITIAL_DATA = {
  price: 0,
  name: "",
  type: "",
  antiquity: 0,
  description: "",
  address: "",
  city: "",
  state: "",
  country: "",
  households: "",
  street: "",
  location: {
    longitude: 0,
    latitude: 0,
  },
  area: "",
  images: [],
  bathrooms: "",
  bedrooms: "",
};

const CreateAnalysis = () => {
  const { urls } = useUploadImage();
  const { formState: development, setFormState } =
    useForm<Partial<Development>>(INITIAL_DATA);

  const [state, setState] = useState("aguascalientes");
  const [municipio, setMunicipio] = useState("");
  const [colonia, setColonia] = useState("");

  const { isGenerating, generate, data } = useGenerateAnalysis();

  const download = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.properties);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Propiedades');

    // Convierte el libro de trabajo a un archivo binario (Buffer)
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Crea un objeto Blob a partir del buffer de Excel
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crea un objeto URL para el Blob y crea un enlace para descargar el archivo
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'properties.xlsx'); // Nombre del archivo

    // Simula un clic en el enlace para iniciar la descarga
    document.body.appendChild(link);
    link.click();

    // Limpia el objeto URL creado para la descarga
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (
      urls.length > 0 &&
      !development.images?.includes(urls[urls.length - 1])
    ) {
      const ima = development.images || [];
      setFormState((prev) => ({
        ...prev,
        images: [...ima, urls[urls.length - 1]],
      }));
    }
  }, [urls, development.images, setFormState]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          <Info color="rgba(0, 0, 0, 0.65)" size={20} /> Información
        </h3>
        <div className={styles.buttons}>
          <Button
            variant="third"
            loading={isGenerating}
            onClick={() => generate({ state, municipio, colonia })}
          >
            Generar
          </Button>
          <Button
            variant="third"
            loading={isGenerating}
            onClick={() => download()}
          >
            Imprimir propiedades
          </Button>
          
          <Button loading={false}>Guardar</Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.inputs}>
          <Field label="Estado">
            <select onChange={({ target }) => setState(target.value)}>
              <option value="aguascalientes">Aguascalientes</option>
              <option value="baja-california">Baja California</option>
              <option value="baja-california-sur">Baja California Sur</option>
              <option value="campeche">Campeche</option>
              <option value="chiapas">Chiapas</option>
              <option value="chihuahua">Chihuahua</option>
              <option value="ciudad-de-mexico">Ciudad de México</option>
              <option value="coahuila">Coahuila</option>
              <option value="colima">Colima</option>
              <option value="durango">Durango</option>
              <option value="estado-de-mexico">Estado de México</option>
              <option value="guanajuato">Guanajuato</option>
              <option value="guerrero">Guerrero</option>
              <option value="hidalgo">Hidalgo</option>
              <option value="jalisco">Jalisco</option>
              <option value="michoacan">Michoacán</option>
              <option value="morelos">Morelos</option>
              <option value="nayarit">Nayarit</option>
              <option value="nuevo-leon">Nuevo León</option>
              <option value="oaxaca">Oaxaca</option>
              <option value="puebla">Puebla</option>
              <option value="queretaro">Querétaro</option>
              <option value="quintana-roo">Quintana Roo</option>
              <option value="yucatan">Yucatán</option>
            </select>
          </Field>
          <Field label="Municipio">
            <select onChange={({ target }) => setMunicipio(target.value)}>
              <option value="">Seleccionar municipio</option>

              {municipios[state]?.map((muni) => (
                <option value={muni.value}>{muni.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Colonia">
            <select onChange={({ target }) => setColonia(target.value)}>
              <option value="">Seleccionar colonia</option>
              {colonias[municipio]?.map((col) => (
                <option value={col.value}>{col.label}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className={styles.results}>
          <div className={styles.numbers}>
            <h3>Propiedades Analizadas: {data?.amount}</h3>

            <h3>
              Precio por Metro Cuadrado:{" "}
              {DivisaFormater({ value: data?.precioPorMetro })}
            </h3>
            <h3>
              Desviación Estandar:{" "}
              {DivisaFormater({ value: data?.desviacionEstandar })}
            </h3>
            <h3>
              Precio Promedio: {DivisaFormater({ value: data?.precioPromedio })}
            </h3>
          </div>

          <div>
            {data?.distribucion && <BarChart data={data?.distribucion} />}
          </div>
          <div className={styles.table}>
            <h4>Propiedades de Referencia</h4>
            <Table columns="1fr 1fr 1fr 1fr 1fr 5rem">
              <Table.Header>
                {/* <div> <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} style={{
                    border: "1px solid rgba(0,0,0,0.3)",
                    width: 23,
                    height: 23
                }} /> </div> */}
                <div>Nombre</div>
                <div style={{ textAlign: "right" }}>Precio</div>
              </Table.Header>
              <Table.Body<{ encabezado: string; precio: number; url: string }>
                data={data?.properties.map(
                  (property: {
                    encabezado: string;
                    urlCorrectaPropiedad: string;
                    precios: { vista: { precio: number } };
                  }) => ({
                    encabezado: property.encabezado,
                    url: property.urlCorrectaPropiedad,
                    precio: property.precios.vista.precio,
                  })
                )}
                render={(property, index) => (
                  <PropertyRow
                    properties={property}
                    index={index}
                    key={property.encabezado}
                  />
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnalysis;
