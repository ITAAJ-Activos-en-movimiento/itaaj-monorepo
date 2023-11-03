import { ImageInput } from "@/components";

const Floorplants = ({ isLoading, url, uploadImage }: any) => {

  return (
    <div>
        <h3>Floorplants</h3>
        <p>Organize and display your floorplants</p>
        <ImageInput 
            // preview={url || placeholderImage}
            uploadImage={uploadImage}
            loading={isLoading}
            src={url || ''}
            alt=""
            width={300}
            height={300}
          />

    </div>
  )
}

export default Floorplants