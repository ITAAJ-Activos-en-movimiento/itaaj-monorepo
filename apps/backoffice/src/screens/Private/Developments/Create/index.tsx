import { Button, Field, Input, TextEditor } from '@/components'
import styles from './Create.module.css'
import { Image, Info, List, MapPin } from 'react-feather'
import { useState } from 'react'
import PhotoGallery from './PhotoGallery'
import Location from './Location'
import { useCreateDevelopment, useForm, useUploadImage } from '@/hooks'
import { Development } from '@itaaj/entities'
import { useNavigate } from 'react-router-dom'
import { useMultistep } from '@/hooks/form/useMultistep'
import Details from './Details'

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
    const { formState: development, handleChange } = useForm<Partial<Development>>(INITIAL_DATA);

    const navigate = useNavigate();


    const onSubmit = () => {
        console.log(urls)
        // createDevelopment({ ...development, images: urls, location: { longitude: longitud, latitude: latitud }, description }, {
        //     onSuccess: () => {
        //         navigate('/developments')
        //     }
        // })
    }



    const { step, goTo } = useMultistep([
        <Details  development={development} handleChange={handleChange}  />
    ])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3><Info color='rgba(0, 0, 0, 0.65)' size={20} /> Development info</h3>
                <div className={styles.buttons}>
                    <Button variant='cancel'>View</Button>
                    <Button loading={isCreating} onClick={onSubmit}>Save</Button>
                </div>

            </div>
            <div className={styles.main}>
                <div className={styles.options}>
                    <ul>
                        {/* <li><Grid color='rgba(0, 0, 0, 0.65)' size={18} /> <button onClick={() => setOptions('overview')}>Overview</button></li> */}
                        <li><List color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => goTo(0)} > Details       </button> </li>
                        <li><MapPin color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => goTo(1)}>Location</button> </li>
                        <li><Image color='rgba(0, 0, 0, 0.65)' size={18} />       <button onClick={() => goTo(2)}> Photo Gallery </button> </li>
                        {/* <li><Video color='rgba(0, 0, 0, 0.65)' size={18} />       <button> Videos        </button> </li> */}
                        {/* <li><Codesandbox color='rgba(0, 0, 0, 0.65)' size={18} /> <button> 3D Tours      </button> </li> */}
                        {/* <li><Columns color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('floor')}> Floorplans    </button> </li> */}
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