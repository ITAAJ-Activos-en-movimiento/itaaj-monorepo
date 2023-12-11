import React, { useEffect, useState } from "react";
import { Button, Field,  Input, TextEditor } from "@/components";
import styles from "./Edit.module.css";
import { useNavigate } from "react-router-dom";
import { useDevelopment, useEditDevelopment, useUploadImage } from "@/hooks";
import { Image, Info, List, MapPin } from "react-feather";
import Location from "./Location";
import PhotoGallery from "./PhotoGallery";
import { Development } from "@itaaj/entities";

// const placeholderImage = "https://via.placeholder.com/300x300";

const EditDevelopment: React.FC = () => {
  const { isLoading, development: developmentInfo } = useDevelopment();
  const { isEditing, editDevelopment } = useEditDevelopment();
  const [options, setOptions] = useState('overview');
  const [longitud, setLongitud] = useState(developmentInfo?.longitud);
  const [latitud, setLatitud] = useState(developmentInfo?.latitud);
  const [description, setDescription] = useState(developmentInfo?.description);



  const { isLoading: isLoadingImage, urls, uploadImage } = useUploadImage();

  const [development, setProperty] = useState<Partial<Development>>({
    name: developmentInfo?.name,
    address: developmentInfo?.address,
    city: developmentInfo?.city,
    state: developmentInfo?.state,
    country: developmentInfo?.country,
    price: developmentInfo?.price,
    description: developmentInfo?.description,
    area: developmentInfo?.area,
    images: developmentInfo?.images,
    garage: developmentInfo?.garage,
    bedrooms: developmentInfo?.bedrooms,
    bathrooms: developmentInfo?.bathrooms,
    video: developmentInfo?.video,
    households: developmentInfo?.households,
    virtualTourUrl: developmentInfo?.virtualTourUrl,
    owner: developmentInfo?.owner,
    antiquity: developmentInfo?.antiquity,
    propertyStatus: developmentInfo?.propertyStatus,
    type: developmentInfo?.type,
    partner: developmentInfo?.partner,
  });




  const navigate = useNavigate();
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value: any) => {
    setDescription(value);
};

console.log(development)
useEffect(() => {
  setProperty({
    name: developmentInfo?.name,
    address: developmentInfo?.address,
    city: developmentInfo?.city,
    state: developmentInfo?.state,
    country: developmentInfo?.country,
    price: developmentInfo?.price,
    description: developmentInfo?.description,
    area: developmentInfo?.area,
    images: developmentInfo?.images,
    garage: developmentInfo?.garage,
    bedrooms: developmentInfo?.bedrooms,
    bathrooms: developmentInfo?.bathrooms,
    video: developmentInfo?.video,
    households: developmentInfo?.households,
    virtualTourUrl: developmentInfo?.virtualTourUrl,
    owner: developmentInfo?.owner,
    antiquity: developmentInfo?.antiquity,
    propertyStatus: developmentInfo?.propertyStatus,
    type: developmentInfo?.type,
    partner: developmentInfo?.partner,
  });
}, [isLoading])

const onSubmit = () => {
  editDevelopment({ ...development, slug: developmentInfo.slug, images: [...developmentInfo.images, ...urls,], location: { longitude: longitud, latitude: latitud }, description }, {
      onSuccess: () => {
          navigate('/developments')
      }
  })
}


  return (
    <div className={styles.container}>
    <div className={styles.header}>
        <h3><Info color='rgba(0, 0, 0, 0.65)' size={20} />Información del desarrollo</h3>
        <div className={styles.buttons}>
            <Button variant='cancel'>View</Button>
            <Button loading={isEditing} onClick={onSubmit}>Guardar</Button>
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

                <Field label='Video URL'>
                        <Input type='text' value={development?.video} name='video' onChange={handleChange} />
                    </Field>

                    <Field label='360 Tour URL'>
                        <Input value={development?.virtualTourUrl} name='virtualTourUrl' onChange={handleChange} />
                    </Field>


                    <Field label='PDF URL'>
                        <Input value={development?.owner} name='owner' onChange={handleChange} />
                    </Field>



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
            <PhotoGallery isLoading={isLoadingImage} urls={development.images} uploadImage={uploadImage} />
        )}
        {/* 
{options == 'floor' && (
        <Floorplants handleChange={handleChange} />
    )} */}

        {options == 'location' && (
            <Location city={development.city} state={development.state} country={development.country} address={development.address} setLongitud={setLongitud} latitud={latitud} longitud={longitud} setLatitud={setLatitud} formState={development} handleChange={handleChange} />
        )}
    </div>

</div>
  );
};

export default EditDevelopment;
