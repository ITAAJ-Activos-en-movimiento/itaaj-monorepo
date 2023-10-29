import { Button, Field, Input, TextEditor } from '@/components'
import styles from './Create.module.css'
import { Image, Info, List, MapPin } from 'react-feather'
import { useState } from 'react'
import PhotoGallery from './PhotoGallery'
import Location from './Location'
import { useCreateDevelopment, useForm, useUploadImage } from '@/hooks'
import { Development } from '@itaaj/entities'
import { useNavigate } from 'react-router-dom'

const CreateDevelopment = () => {
    const [options, setOptions] = useState('overview');
    const [longitud, setLongitud] = useState(0);
    const [latitud, setLatitud] = useState(0);
    const [description, setDescription] = useState('');

    
    const { isLoading, urls, uploadImage } = useUploadImage();

    console.log(urls)
    const { formState: development, handleChange } = useForm<Partial<Development>>({
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
        area:'',
        images: [],
        bathrooms: '',
        bedrooms: '',

    });

    const navigate = useNavigate();
    console.log(development)

    const { isCreating, createDevelopment } = useCreateDevelopment();

    const onSubmit = () => {
      createDevelopment({...development, images: urls, location: { longitude: longitud, latitude: latitud }, description}, {
        onSuccess: () => {
            navigate('/developments')
        }
      })
    }

    const handleEditorChange = (value: any) => {
        setDescription(value);
      };

    
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
                <li><List color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('overview')} > Details       </button> </li>
                <li><MapPin color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('location')}>Location</button> </li>
                <li><Image color='rgba(0, 0, 0, 0.65)' size={18} />       <button onClick={() => setOptions('photo')}> Photo Gallery </button> </li>
                {/* <li><Video color='rgba(0, 0, 0, 0.65)' size={18} />       <button> Videos        </button> </li> */}
                {/* <li><Codesandbox color='rgba(0, 0, 0, 0.65)' size={18} /> <button> 3D Tours      </button> </li> */}
                {/* <li><Columns color='rgba(0, 0, 0, 0.65)' size={18} />     <button onClick={() => setOptions('floor')}> Floorplans    </button> </li> */}
                {/* <li><FileText color='rgba(0, 0, 0, 0.65)' size={18} />    <button> Documents     </button> </li> */}
            </ul>
            
        </div>
        {options == 'overview' && (

        <div className={styles.content}>
            <h3>General details</h3>
            <p className={styles.subtitle}>A brief description of these settings</p>
            <div className={styles.col}>

<Field label='Bedrooms'>
    <Input value={development.bedrooms} name='bedrooms' onChange={handleChange} />
</Field>
<Field label='Bathrooms'>
    <Input value={development.bathrooms} name='bathrooms' onChange={handleChange} />
</Field>

</div>

            <div className={styles.col}>

            <Field label='Development price (From)'>
                <Input type='number' value={development.price} name='price' onChange={handleChange} />
            </Field>

            <Field label='Households'>
                <Input value={development.households} name='households' onChange={handleChange} />
            </Field>


            
            
            </div>

            <h3>Development details</h3>
            <p className={styles.subtitle}>A brief description of these settings</p>
            <Field label='Development name'>
                <Input name='name' value={development.name} onChange={handleChange} />
            </Field>
            <Field label='Area'>
                <Input name='area' value={development.area} placeholder='De 91 m2 a 128 m2' onChange={handleChange} />
            </Field>

            <div className={styles.col}>

            <Field label='Development type'>
                <Input name='type' value={development.type} onChange={handleChange} />
            </Field>

            <Field label='Antiquity'>
                <Input type='number' name='antiquity' value={development.antiquity} onChange={handleChange} />
            </Field>
            </div>

            <div className={styles.divider}>

            <Field label='Development description'>
                <TextEditor
                     value={description}
                     onChange={handleEditorChange}
                />
            </Field>
            </div>
        </div>
        )}

            {options == 'photo' && (
                <PhotoGallery isLoading={isLoading} urls={urls} uploadImage={uploadImage}  />
            )}
{/* 
{options == 'floor' && (
                <Floorplants handleChange={handleChange} />
            )} */}

{options == 'location' && (
                <Location setLongitud={setLongitud} latitud={latitud} longitud={longitud} setLatitud={setLatitud} formState={development} handleChange={handleChange} />
            )}
        </div>
      
    </div>
  )
}

export default CreateDevelopment