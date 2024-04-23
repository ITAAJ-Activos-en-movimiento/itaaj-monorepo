import { Button, Field, Input, TextEditor } from '@/components'
import styles from './Create.module.css'
import { Columns, Info, List  } from 'react-feather'
import { useState } from 'react'
import PhotoGallery from './PhotoGallery'
import Location from './Location'
import { useCreateProperties, useDevelopments, useForm, useUploadImage } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import initialPropertyState from './initial-state'
import Floorplants from './Floorplants'

const CreateProperty = () => {
    const [options, setOptions] = useState('overview');
    const [longitud, setLongitud] = useState(0);
    const [latitud, setLatitud] = useState(0);
    const [description, setDescription] = useState('');

    const { developments } = useDevelopments();
    const { isLoading, urls, url, uploadImage } = useUploadImage();

    const { formState: property, handleChange } = useForm(initialPropertyState);


    const navigate = useNavigate();
    console.log(property)

    const { isCreating, createProperty } = useCreateProperties();

    const onSubmit = () => {
        createProperty({ ...property, image: url, location: { longitude: longitud, latitude: latitud }, description }, {
            onSuccess: () => {
                navigate('/properties')
            }
        })
    }

    const handleChangeDevelopment = (e: any) => {
        if (e.target.name === 'development') {
            const selectedDevelopment = developments.find(
              (development: any) => development.id === e.target.value
            );
      
            if (selectedDevelopment) {
              const { location, images, city, country, state } = selectedDevelopment; // Agrega la ubicación y las imágenes del desarrollo
              handleChange({
                target: {
                  name: 'location',
                  value: location,
                },
              } as React.ChangeEvent<any>);

              handleChange({
                target: {
                  name: 'city',
                  value: city,
                },
              } as React.ChangeEvent<any>);
              
              handleChange({
                target: {
                  name: 'country',
                  value: country,
                },
              } as React.ChangeEvent<any>);
              
              handleChange({
                target: {
                  name: 'state',
                  value: state,
                },
              } as React.ChangeEvent<any>);

              handleChange({
                target: {
                  name: 'development',
                  value: e.target.value,
                },
              } as React.ChangeEvent<any>);
      
              handleChange({
                target: {
                  name: 'images',
                  value: images,
                },
              } as React.ChangeEvent<any>);
            }
          } else {
            const { name, value } = e.target;
            handleChange({ target: { name, value } } as React.ChangeEvent<any>);
          }
        };
     
    const handleEditorChange = (value: any) => {
        setDescription(value);
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3><Info color='rgba(0, 0, 0, 0.65)' size={20} /> Información</h3>
                <div className={styles.buttons}>
                    <Button variant='cancel'>Vista</Button>
                    <Button loading={isCreating} onClick={onSubmit}>Guardar</Button>
                </div>

            </div>
            <div className={styles.main}>
                <div className={styles.options}>
                    <ul>
                        {/* <li><Grid color='rgba(0, 0, 0, 0.65)' size={18} /> <button onClick={() => setOptions('overview')}>Overview</button></li> */}
                        <li><List color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('overview')} > Detalles       </button> </li>
                        {/* <li><MapPin color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('location')}>Location</button> </li> */}
                        {/* <li><Image color='rgba(0, 0, 0, 0.65)' size={18} />       <button onClick={() => setOptions('photo')}> Photo Gallery </button> </li> */}
                        {/* <li><Video color='rgba(0, 0, 0, 0.65)' size={18} />       <button> Videos        </button> </li> */}
                        {/* <li><Codesandbox color='rgba(0, 0, 0, 0.65)' size={18} /> <button> 3D Tours      </button> </li> */}
                        <li><Columns color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('floor')}> Planos </button> </li>
                        {/* <li><FileText color='rgba(0, 0, 0, 0.65)' size={18} />    <button> Documents     </button> </li> */}
                    </ul>

                </div>
                {options == 'overview' && (

                    <div className={styles.content}>
                        <h3>Detalles generales</h3>
                        <p className={styles.subtitle}>Una breve descripción de estas configuraciones.</p>
                        <div className={styles.col}>

                            <Field label='Habitaciones'>
                                <Input value={property.bedrooms} name='bedrooms' onChange={handleChange} />
                            </Field>
                            <Field label='Baños'>
                                <Input value={property.bathrooms} name='bathrooms' onChange={handleChange} />
                            </Field>

                        </div>

                        <div className={styles.col}>

                            <Field label='Precio'>
                                <Input type='number' value={property.price} name='price' onChange={handleChange} />
                            </Field>

                            <Field label='Desarrollo'>
                                <select name="development" id="" onChange={handleChangeDevelopment} >
                                    <option value="">Ningúno</option>
                                    {developments.map((development: any) => (
                                        <option value={development.id}>{development.name}</option>
                                    ))}
                                </select>
                                {/* <Input value={property.development} name='households' onChange={handleChange} /> */}
                            </Field>




                        </div>

                        <h3>Detalles</h3>
                        <p className={styles.subtitle}></p>
                        <Field label='Nombre'>
                            <Input name='name' value={property.name} onChange={handleChange} />
                        </Field>

                        <div className={styles.col}>

                            <Field label='Superficie del Terreno"'>
                                <Input name='area.land_area' placeholder='80 m2' onChange={handleChange} />
                            </Field>
                            <Field label='Superficie Construida'>
                                <Input name="area.building_area" placeholder='91 m2' onChange={handleChange} />
                            </Field>
                            <Field label='Superficie Total'>
                                <Input name="area.total_area" placeholder='128 m2' onChange={handleChange} />
                            </Field>
                            <Field label='Piso' tip='En que piso esta la propiedad'>
                                <Input name="floor" placeholder='1' onChange={handleChange} />
                            </Field>
                        </div>


                        <div className={styles.col}>

                            <Field label='Tipo'>
                                <select name='type' value={property.type} onChange={handleChange}>
                            <option value="apartment">Seleccionar un tipo</option>
                                 
                                    <option value="apartment">Departamento</option>
                                    <option value="apartment">Casa</option>
                                    <option value="apartment">Oficina</option>
                                    <option value="apartment">Terreno</option>
                                </select>
                            </Field>

                            <Field label='Antigüedad'>
                                <Input type='number' name='antiquity' value={property.antiquity} onChange={handleChange} />
                            </Field>
                        </div>

                        <div className={styles.divider}>

                            <Field label='Descripción'>
                                <TextEditor
                                    value={description}
                                    onChange={handleEditorChange}
                                />
                            </Field>
                        </div>
                    </div>
                )}

                {options == 'photo' && (
                    <PhotoGallery isLoading={isLoading} urls={urls} uploadImage={uploadImage} />
                )}
                
{options == 'floor' && (
                <Floorplants isLoading={isLoading} url={url} uploadImage={uploadImage} handleChange={handleChange} />
            )}

                {options == 'location' && (
                    <Location setLongitud={setLongitud} latitud={latitud} longitud={longitud} setLatitud={setLatitud} formState={property} handleChange={handleChange} />
                )}
            </div>

        </div>
    )
}

export default CreateProperty