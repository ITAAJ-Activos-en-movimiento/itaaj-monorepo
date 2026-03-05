import { useState } from 'react';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dv4bzgfpr/image/upload';
const UPLOAD_PRESET = 'infoitaaj'; // lo configuras en Cloudinary

export const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const uploadImage = async (image: string | Blob) => {
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', image); // Cloudinary exige "file"
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const { data } = await axios.post(CLOUDINARY_URL, formData);

      const newUrls = [...urls, data.secure_url];
      setUrls(newUrls);
      setUrl(data.secure_url);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    url,
    uploadImage,
    urls,
    errorMessage,
  };
};
