import { State } from '@/types/redux/State';
import { configureStore } from '@reduxjs/toolkit';
import propertiesSlice from './states/properties/slice';
import postsSlice from './states/posts/slice';

export interface AppStore {
    properties: State<any>;
    posts: State<any>;
}

export default configureStore({
    reducer: {
        properties: propertiesSlice.reducer,
        posts: postsSlice.reducer
    },
});
