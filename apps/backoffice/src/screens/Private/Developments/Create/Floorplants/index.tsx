import { ImageInput } from '@/components'

const Floorplants = () => {
  return (
    <div>
        <h3>Floorplants</h3>
        <p>Organize and display your floorplants</p>
        <ImageInput 
            // preview={url || placeholderImage}
            // onChange={(e) => addImages(e)}
            // loading={isLoading}
            // src={url || placeholderImage}
            alt=""
            width={300}
            height={300}
          />
    </div>
  )
}

export default Floorplants