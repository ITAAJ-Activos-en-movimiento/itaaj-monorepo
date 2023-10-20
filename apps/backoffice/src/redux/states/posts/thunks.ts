// import { Property, Result } from '@itaaj/types';
import { itaajApi } from '@/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Props {
    limit: number;
    page: number;
    search: string;
}


export const getPosts = createAsyncThunk<any, Props>('posts/getPosts', async (props) => {
    const { data } = await itaajApi.get(`/posts`);
    return data;
});

export const createPosts = createAsyncThunk<Partial<any>, any>('posts/create', async (post) => {
    const { data } = await itaajApi.post('/posts', post);
    return data;
});

export const updatePosts = createAsyncThunk<any, any>('posts/update', async (post) => {
    const { data } = await itaajApi.put('/posts', post);
    return data;
});

export const deletePosts = createAsyncThunk('posts/delete', async (uuid: string) => {
    const { data } = await itaajApi.delete(`/posts/${uuid}`);
    return data;
});
