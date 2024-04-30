import { Button, Field, Input, Loader, TextEditor } from "@/components";
import styles from "./Create.module.css";
import { Columns, Image, Info, List, MapPin } from "react-feather";
import { useEffect, useState } from "react";
import Location from "./Location";
import {
  // useDevelopments,
  useForm,
  useProperty,
  useUpdateProperty,
  useUploadImage,
} from "@/hooks";
import Floorplants from "./Floorplants";
// import { Development } from "@itaaj/entities";
import PhotoGalleryUpdate from "./PhotoGallery";
import { useNavigate } from "react-router-dom";

const UpdateProperty = () => {
  const { isLoading, property: propertyInfo } = useProperty();

  const {formState:property, handleChange, setFormState} = useForm({
    name: propertyInfo?.name || "",
    address: propertyInfo?.address || "",
    city: propertyInfo?.city || "",
    state: propertyInfo?.state || "",
    country: propertyInfo?.country || "",
    price: propertyInfo?.price || 0,
    description: propertyInfo?.description || "",
    area: {
      building_area: propertyInfo?.area?.building_area || 0,
      land_area: propertyInfo?.area?.land_area || "",
      total_area: propertyInfo?.area?.total_area || 0,
    },
    images: propertyInfo?.images || [],
    garage: propertyInfo?.garage || 0,
    bedrooms: propertyInfo?.bedrooms || 0,
    bathrooms: propertyInfo?.bathrooms || 0,
    antiquity: propertyInfo?.antiquity || 0,
    balcony: 0,
    kitcken: 0,
    propertyStatus: propertyInfo?.propertyStatus || "",
    type: propertyInfo?.type || "",
    category: propertyInfo?.category || "",
    partner: "",
    floor: propertyInfo?.floor || "",
    development: propertyInfo?.development || "",
    zipcode: propertyInfo?.zipcode || 0,
    floorPlans: propertyInfo?.floorPlans || [],
  });

  const [images, setImages] = useState(propertyInfo?.images || []);
  const [floorPlans, seFloorPlans] = useState([""]);

  const [options, setOptions] = useState("overview");
  const [longitud, setLongitud] = useState(0);
  const [latitud, setLatitud] = useState(0);
  const [description, setDescription] = useState(propertyInfo?.description || "");

  // const { developments } = useDevelopments();
  const { url } = useUploadImage();

  const { isEditing, editProperty } = useUpdateProperty();
  const navigate = useNavigate();

  const onSubmitUpdate = () => {
    editProperty({
      ...property,
      id: propertyInfo.id,
      image: url,
      images,
      location: { longitude: longitud, latitude: latitud },
      description,
      floorPlans,
    }, {
      onSuccess: () => {
        navigate('/properties')
    }
    });
  };

  // const handleChangeDevelopment = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.name === "development") {
  //     const selectedDevelopment = developments.find(
  //       (development: Development) => development.id === e.target.value
  //     );

  //     if (selectedDevelopment) {
  //       const { location, images, city, country, state } = selectedDevelopment;
  //       handleChange({
  //         target: {
  //           name: "location",
  //           value: location,
  //         },
  //       } as React.ChangeEvent<HTMLInputElement>);

  //       handleChange({
  //         target: {
  //           name: "city",
  //           value: city,
  //         },
  //       } as React.ChangeEvent<HTMLInputElement>);

  //       handleChange({
  //         target: {
  //           name: "country",
  //           value: country,
  //         },
  //       } as React.ChangeEvent<HTMLInputElement>);

  //       handleChange({
  //         target: {
  //           name: "state",
  //           value: state,
  //         },
  //       } as React.ChangeEvent<HTMLInputElement>);

  //       handleChange(e);

  //       handleChange({
  //         target: {
  //           name: "images",
  //           value: images,
  //         },
  //       } as React.ChangeEvent<HTMLInputElement>);
  //     }
  //   } else {
  //     const { name, value } = e.target;
  //     handleChange({
  //       target: { name, value },
  //     } as React.ChangeEvent<HTMLInputElement>);
  //   }
  // };

  const handleEditorChange = (value: string) => {
    setDescription(value);
  };

  useEffect(() => {
    if(propertyInfo){

      setFormState({
        name: propertyInfo.name || '',
        address: propertyInfo.address || '',
        city: propertyInfo.city || '',
        state: propertyInfo.state || '',
        country: propertyInfo.country || '',
        price: propertyInfo.price || 0,
        description: propertyInfo.description || '',
        area: {
          building_area: propertyInfo.area?.building_area || 0,
          land_area: propertyInfo.area?.land_area || '',
          total_area: propertyInfo.area?.total_area || 0,
        },
        images: propertyInfo.images || [],
        garage: propertyInfo.garage || 0,
        bedrooms: propertyInfo.bedrooms || 0,
        bathrooms: propertyInfo.bathrooms || 0,
        antiquity: propertyInfo.antiquity || 0,
        balcony: propertyInfo.balcony || 0,
        kitcken: propertyInfo.kitcken || 0,
        propertyStatus: propertyInfo.propertyStatus || '',
        type: propertyInfo.type || '',
        category: propertyInfo.category || '',
        partner: propertyInfo.partner || '',
        floor: propertyInfo.floor || '',
        development: propertyInfo.development || '',
        zipcode: propertyInfo.zipcode || 0,
        floorPlans: propertyInfo.floorPlans || [],
      });
      setImages(propertyInfo?.images || []);
      setDescription(propertyInfo?.description)
    }

  }, [propertyInfo]);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          <Info color="rgba(0, 0, 0, 0.65)" size={20} /> Editar Información
        </h3>
        <div className={styles.buttons}>
          <Button variant="cancel">Vista</Button>
          <Button loading={isEditing} onClick={onSubmitUpdate}>
            Guardar
          </Button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.options}>
          <ul>
            {/* <li><Grid color='rgba(0, 0, 0, 0.65)' size={18} /> <button onClick={() => setOptions('overview')}>Overview</button></li> */}
            <li>
              <List color="rgba(0, 0, 0, 0.65)" size={18} />{" "}
              <button onClick={() => setOptions("overview")}> Detalles </button>{" "}
            </li>
            <li>
              <MapPin color="rgba(0, 0, 0, 0.65)" size={18} />{" "}
              <button onClick={() => setOptions("location")}>Ubicación</button>{" "}
            </li>
            <li>
              <Image color="rgba(0, 0, 0, 0.65)" size={18} />{" "}
              <button onClick={() => setOptions("photo")}>
                {" "}
                Galeria de Fotos{" "}
              </button>{" "}
            </li>
            {/* <li><Video color='rgba(0, 0, 0, 0.65)' size={18} />       <button> Videos        </button> </li> */}
            {/* <li><Codesandbox color='rgba(0, 0, 0, 0.65)' size={18} /> <button> 3D Tours      </button> </li> */}
            <li>
              <Columns color="rgba(0, 0, 0, 0.65)" size={18} />{" "}
              <button onClick={() => setOptions("floor")}> Planos </button>{" "}
            </li>
            {/* <li><FileText color='rgba(0, 0, 0, 0.65)' size={18} />    <button> Documents     </button> </li> */}
          </ul>
        </div>
        {options == "overview" && (
          <div className={styles.content}>
            <h3>Editar Detalles generales</h3>
            <p className={styles.subtitle}>
              Una breve descripción de estas configuraciones.
            </p>
            <div className={styles.col}>
              <Field label="Habitaciones">
                <Input
                type="number"
                  value={property.bedrooms}
                  name="bedrooms"
                  onChange={handleChange}
                />
              </Field>
              <Field label="Baños">
                <Input
                  value={property.bathrooms}
                  name="bathrooms"
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className={styles.col}>
              <Field label="Precio">
                <Input
                  type="number"
                  value={property.price}
                  name="price"
                  onChange={handleChange}
                />
              </Field>

              {/* <Field label="Desarrollo"> */}
                {/* <select
                  value={property.development}
                  name="development"
                  id=""
                  onChange={handleChangeDevelopment}
                >
                  <option value="">Ningúno</option>
                  {developments?.map((development: Development) => (
                    <option value={development.id}>{development.name}</option>
                  ))}
                </select> */}
                {/* <Input value={property.development} name='households' onChange={handleChange} /> */}
              {/* </Field> */}
            </div>

            <h3>Detalles</h3>
            <p className={styles.subtitle}></p>
            <Field label="Nombre">
              <Input
                name="name"
                value={property.name}
                onChange={handleChange}
              />
            </Field>

            <div className={styles.col}>
              <Field label='Superficie del Terreno"'>
                <Input
                  value={property.area.land_area}
                  name="area.land_area"
                  placeholder="80 m2"
                  onChange={handleChange}
                />
              </Field>
              <Field label="Superficie Construida">
                <Input
                  name="area.building_area"
                  value={property.area.building_area}
                  placeholder="91 m2"
                  onChange={handleChange}
                />
              </Field>
              <Field label="Piso" tip="En que piso esta la propiedad">
                <Input
                  value={property.floor}
                  name="floor"
                  placeholder="1"
                  onChange={handleChange}
                />
              </Field>
              <Field label='Estacionamientos' >
                                <Input type='number' name="garage" placeholder='1' onChange={handleChange} />
                            </Field>
            </div>

            <div className={styles.col}>
              <Field label="Tipo">
                <select
                  value={property.type}
                  name="type"
                  onChange={handleChange}
                >
                  <option value="">Seleccionar un tipo</option>

                  <option value="Departamento">Departamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Oficina">Oficina</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </Field>

              <Field label="Antigüedad">
                <Input
                  type="number"
                  name="antiquity"
                  value={property.antiquity}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className={styles.divider}>
              <Field label="Descripción">
                <TextEditor
                  value={description}
                  onChange={handleEditorChange}
                />
              </Field>
            </div>
          </div>
        )}

        {options == "photo" && (
          <PhotoGalleryUpdate
            oldUrls={property?.images}
            setImages={setImages}
          />
        )}

        {options == "floor" && (
          <Floorplants
            oldUrls={property?.floorPlans}
            setFloorplants={seFloorPlans}
          />
        )}

        {options == "location" && (
          <Location
            setLongitud={setLongitud}
            latitud={latitud}
            longitud={longitud}
            setLatitud={setLatitud}
            address={property.address}
            city={property.city}
            state={property.state}
            country={property.country}
            zipcode={property.zipcode}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateProperty;
