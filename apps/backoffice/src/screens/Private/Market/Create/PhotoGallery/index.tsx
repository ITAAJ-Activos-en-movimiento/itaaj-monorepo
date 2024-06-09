import { ImageInput } from '@/components'
import styles from './Photo.module.css';
import { X } from 'react-feather';

const PhotoGallery = ({remove, isLoading, urls, uploadImage }: any) => {
  return (
    <div>
        <h3>Galería de fotos</h3>
        <p>Organiza y muestra tus fotos</p>
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
              <picture className={styles.picture} >
                <button onClick={() => remove(url)} className={styles.close}><X  size={18} color='#fff' /></button>
                <img key={url} className={styles.property_image} src={url} />
              </picture>
            ))}
          </div>
    </div>
  )
}

export default PhotoGallery