import axios from 'axios';

export const itaajApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
    }
})