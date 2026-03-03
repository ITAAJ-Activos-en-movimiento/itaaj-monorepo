import { ImageInput } from '@/components'
import styles from './Photo.module.css';

const PhotoGallery = ({isLoading, urls, uploadImage }: any) => {
  return (
    <div>
        <h3>Photos gallery</h3>
        <p>Organize and display your photos</p>
        <ImageInput 
            // preview={url || placeholderImage}
            uploadImage={uploadImage}
            loading={isLoading}
            src={urls[0] || ''}
            alt=""
            width={300}
            height={300}
          />

          <div className={styles.images}>
            {urls.map((url: string) => (
              <img className={styles.property_image} src={url} alt="" />
            ))}
          </div>
    </div>
  )
}

export default PhotoGallery