import { useState } from 'react';
import axios from 'axios';

export const rvApi = axios.create({
    baseURL:'https://real-vision-api.xyz/api/v1',
    // baseURL:'http://localhost:8000/api/v1',
    
    headers: {
        'api-key':
            'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd',
    },
});
export const useUploadImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [urls, setUrls] = useState<string[]>([]);

    
    const uploadImage = async (image: any) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'lsrzidsb');
        
        try {
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/djksixova/image/upload",
              formData
            );
            
            const newUrls: string[] = [...urls, response.data.url];
            setUrls(newUrls);
            setUrl(response.data.url);
            setIsLoading(false);
          } catch (err) {
            setIsLoading(false);
          }
    };

    return {
        isLoading,
        url,
        uploadImage,
        urls,
        setUrls
    };
};