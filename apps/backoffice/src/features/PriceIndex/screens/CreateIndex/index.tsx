import { Button, Field } from "@/components";
import { Header } from "../../components";
import styles from "./CreateIndex.module.css";
import SearchSelect, { Option } from "@/components/Shared/SearchSelect";
import { colonies, municipalities, states } from "../../utils/country-data";
import { useState } from "react";
import { useGenerateAnalysis } from "@/hooks/developments/useGenerateAnalysis";
import { DivisaFormater } from "@/utilities";
import ControlChartRandom from "@/components/ControlChartRandom";
import ControlChart from "@/components/ControlChart";
import { useDownloadProperties } from "../../hooks/useDownloadProperties";

const CreateIndex = () => {
    const { isGenerating, generate, data } = useGenerateAnalysis();
  const { download } = useDownloadProperties(data?.propertiesWithinLimits);

  const [state, setState] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [cologne, setCologne] = useState("");
  const [type, setType] = useState("");


  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      setState(selectedOption.value);
    }
  };
  console.log(isGenerating)
  const handleChangeMunipality = (selectedOption: Option | null) => {
    if (selectedOption) {
      setMunicipality(selectedOption.value);
    }
  };
  const handleChangeCologne = (selectedOption: Option | null) => {
    if (selectedOption) {
      setCologne(selectedOption.value);
    }
  };

  return (
    <div className={styles.container}>
      <Header>
        <Button onClick={download} variant="third">Descargar Propiedades</Button>
        <Button loading={isGenerating} onClick={() => generate({ type, state, municipio: municipality, colonia: cologne, maxPrice: 900000000 })} >Generar</Button>
      </Header>

      <div className={styles.content}>
        <div className={styles.options}>
          <Field label="Tipo">
            <select onChange={({ target }) => setType(target.value)} name="" id="">
              <option value="">Todos</option>
              <option value="house">Casa</option>
              <option value="department">Departamento</option>
              <option value="terrain">Terreno</option>
            </select>
          </Field>
          <Field label="Estado del Inmueble">
            <select name="" id="">
              <option value="">Todos</option>
              <option value="">Nuevo</option>
              <option value="">Usado</option>
            </select>
          </Field>
          <Field label="Estado">
            <SearchSelect
              options={states}
              onChange={handleChange}
              placeholder="Seleccionar estado"
            />
          </Field>
          {state.length > 0 && (
            <Field label="Municipio">
              <SearchSelect
                options={municipalities[state]}
                onChange={handleChangeMunipality}
                placeholder="Seleccionar municipio"
              />
            </Field>
          )}

          {municipality.length > 0 && (
            <Field label="Colonia">
              <SearchSelect
                options={colonies?.[municipality]}
                onChange={handleChangeCologne}
                placeholder="Seleccionar colonia"
              />
            </Field>
          )}
        </div>

        {data && (
          <>
          

        <div className={styles.information} >
          <div className={styles.card}>
                <img src="/area.svg" alt="" />
                <div>
                    <h3>{DivisaFormater({ value: data?.pricePerSquareMeter?.toFixed(0) })}</h3>
                    <p>Precio medio por metro m²</p>
                </div>
          </div>
          <div className={styles.card}>
                <img src="/house.svg" alt="" />
                <div>
                    <h3>{DivisaFormater({ value: data?.averagePrice?.toFixed(0) })}</h3>
                    <p>Precio medio</p>
                </div>
          </div>
          <div className={styles.card}>
            <div></div>
                <div>
                    <h3>{data?.properties?.length}</h3>
                    <p>Tamaño total de la muestra </p>
                </div>
          </div>
          <div className={styles.card}>
            <div></div>
                <div>
                    <h3>{data?.dataPoints.filter((dat: any) => dat.included)?.length}</h3>
                    <p>Muestra en Límites de control</p>
                </div>
          </div>
        </div>

        <div className={styles.charts} >
            <ControlChartRandom data={data?.dataPoints} limits={{ median: data?.median, lowerLimit: data?.lowerLimit, upperLimit: data?.upperLimit }} />
            <ControlChart data={data?.dataPoints} limits={{ median: data?.median, lowerLimit: data?.lowerLimit, upperLimit: data?.upperLimit }} />

        </div>


        </>
        )}
      </div>
    </div>
  );
};

export default CreateIndex;
