import React, { useRef } from 'react'
import Loader from '../Loader';
import styles from './ImageInput.module.css'
import { Button } from '..';

interface Props  extends React.InputHTMLAttributes<HTMLInputElement>{
  loading?: boolean;
  uploadImage: (image: any) => Promise<void>;

}

const ImageInput = ({loading, uploadImage, ...rest}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadHandler = async (e: any) => {
    uploadImage(e.target.files[0]);
};

  return (
    <div>
    <div className={styles.formbold_file_input}>
      <input type="file" name="image" id="image"  {...rest} ref={fileInputRef} onChange={uploadHandler} />
      <label htmlFor="image">
        {loading? 
          <Loader small={true} primary={true} />         
        : (
          <div>
              <span className={styles.formbold_drop_file} >Upload photos</span>
              <span className={styles.formbold_or} >Select a file or drop one hero.</span>
              <Button onClick={handleButtonClick} loading={loading} >Browse photos</Button>
          </div>
        )}
      </label>
    </div>
  </div>
  )
}

export default ImageInput