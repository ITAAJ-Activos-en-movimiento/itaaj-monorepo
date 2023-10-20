import { State } from '@/types/redux/State';
import { createSlice } from '@reduxjs/toolkit';
import { getPosts, createPosts, deletePosts, updatePosts } from './thunks';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        result: {},
        loading: false,
        error: undefined,
        success: false,
    } as State<any>,
    reducers: {
        resetPosts: (state) => {
            (state.loading = false), (state.success = false), (state.error = '');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending || createPosts.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deletePosts.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deletePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })
            .addCase(deletePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updatePosts.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updatePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updatePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice;
