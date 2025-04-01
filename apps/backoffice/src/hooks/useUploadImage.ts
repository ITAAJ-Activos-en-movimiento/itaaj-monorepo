import { useState } from 'react';
import axios from 'axios';

export const rvApi = axios.create({
    
    baseURL:'https://api.revoluc.com/api/v1',
    // baseURL:'http://localhost:8000/api/v1',
    
    headers: {
        'api-key':
            'k7R8j2sB9xVwQ3tZ1gLeD4mP8hFjN6',
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
