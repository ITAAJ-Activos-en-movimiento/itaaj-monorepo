import { useState } from 'react';
import axios from 'axios';

export const rvApi = axios.create({
    baseURL:'https://real-vision-api.cloud/api/v1',
    // baseURL:'http://localhost:8000/api/v1',
    
    headers: {
        'api-key':
            '291bd34bac86b4b84a11f0e8932beb92e6497e55a51ab72b511e427dc909f84de4791995f6672ed2a55e882a43c129d92d0c50b38ae69bda1f93ac5a4adc24af',
    },
});


export const useUploadImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [urls, setUrls] = useState<string[]>([]);

    const uploadImage = async (image: string | Blob ) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            const { data } = await rvApi.post('/upload/image', formData);
            const newUrls: string[] = [...urls, data.url];
            setUrls(newUrls);
            setUrl(data.url);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        url,
        uploadImage,
        urls,
    };
};
