// import { Property, Result } from '@itaaj/types';
import { itaajApi } from '@/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Props {
    limit: number;
    page: number;
    search: string;
}


export const getProperties = createAsyncThunk<any, Props>('properties/getBrands', async (props) => {
    const { data } = await itaajApi.get(`/properties`);
    return data;
});

export const createProperties = createAsyncThunk<Partial<any>, any>('properties/create', async (brand) => {
    const { data } = await itaajApi.post('/properties', brand);
    return data;
});

export const updateProperties = createAsyncThunk<any, any>('properties/update', async (brand) => {
    const { data } = await itaajApi.put('/properties', brand);
    console.log("data up",data)
    return data;
});

export const deleteProperties = createAsyncThunk('properties/delete', async (uuid: string) => {
    const { data } = await itaajApi.delete(`/properties/${uuid}`);
    return data;
});

export const getProperty = createAsyncThunk<any, string>('properties/getProperty', async (slug) => {
    const { data } = await itaajApi.get(`/properties/${slug}`);
    return data;
  });