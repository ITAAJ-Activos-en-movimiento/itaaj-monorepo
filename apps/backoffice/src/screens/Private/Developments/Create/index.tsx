import { Button } from '@/components'
import styles from './Create.module.css'
import { Image, Info, List, MapPin } from 'react-feather'
import PhotoGallery from './PhotoGallery'
import Location from './Location'
import { useCreateDevelopment, useForm, useUploadImage } from '@/hooks'
import { Development } from '@itaaj/entities'
// import { useNavigate } from 'react-router-dom'
import { useMultistep } from '@/hooks/form/useMultistep'
import Details from './Details'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INITIAL_DATA = {
    price: 0,
    name: '',
    type: '',
    antiquity: 0,
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    households: '',
    street: '',
    location: {
        longitude: 0,
        latitude: 0,
    },
    area: '',
    images: [],
    bathrooms: '',
    bedrooms: '',
}

const CreateDevelopment = () => {
    const { isCreating, createDevelopment } = useCreateDevelopment();
    const { isLoading, urls, uploadImage } = useUploadImage();
    const { formState: development, handleChange, setFormState } = useForm<Partial<Development>>(INITIAL_DATA);
    const [longitud, setLongitud] = useState(0);
    const [latitud, setLatitud] = useState(0);
    // const [description, setDescription] = useState('');

    console.log(development)
    const navigate = useNavigate();


    const onSubmit = () => {
        createDevelopment({ ...development, location: { longitude: longitud, latitude: latitud } }, {
            onSuccess: () => {
                navigate('/developments')
            }
        })
    }


  const removeImage = (image: string) => {
    const images = development?.images?.filter((img) => img !== image);
    setFormState(prev => ({...prev, images: images}));
  }

  useEffect(() => {
    if(urls.length > 0 && !development.images?.includes(urls[urls.length - 1])){
    const ima = development.images || [];
    setFormState(prev => ({...prev, images: [...ima, urls[urls.length - 1]]}))
  }

  }, [urls, development.images, setFormState]);

    const { step, goTo } = useMultistep([
        <Details  development={development} handleChange={handleChange}  />,
        <Location setLongitud={setLongitud} latitud={latitud} longitud={longitud} setLatitud={setLatitud} formState={development} handleChange={handleChange}  />,
        <PhotoGallery remove={removeImage} development={development} isLoading={isLoading} uploadImage={uploadImage} urls={development.images} handleChange={handleChange}  />

    ])
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
                        <li><List color='rgba(0, 0, 0, 0.65)' size={18} /> <button onClick={() => goTo(0)} > Detalles </button> </li>
                        <li><MapPin color='rgba(0, 0, 0, 0.65)' size={18} /> <button onClick={() => goTo(1)}>Ubicación</button> </li>
                        <li><Image color='rgba(0, 0, 0, 0.65)' size={18} />  <button onClick={() => goTo(2)}> Galería de fotos </button> </li>
                        {/* <li><Video color='rgba(0, 0, 0, 0.65)' size={18} />       <button> Videos        </button> </li> */}
                        {/* <li><Codesandbox color='rgba(0, 0, 0, 0.65)' size={18} /> <button> 3D Tours      </button> </li> */}
                        {/* <li><Columns color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('floor')}> Planos    </button> </li> */}
                        {/* <li><FileText color='rgba(0, 0, 0, 0.65)' size={18} />    <button> Documents     </button> </li> */}
                    </ul>

                </div>

                {step}
                {/* {options == 'photo' && (
                    <PhotoGallery isLoading={isLoading} urls={urls} uploadImage={uploadImage} />
                )} */}
                {/* 
{options == 'floor' && (
                <Floorplants handleChange={handleChange} />
            )} */}

                {/* {options == 'location' && (
                    <Location setLongitud={setLongitud} latitud={latitud} longitud={longitud} setLatitud={setLatitud} formState={development} handleChange={handleChange} />
                )} */}
            </div>

        </div>
    )
}

export default CreateDevelopment