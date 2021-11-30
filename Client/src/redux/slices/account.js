import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import accountApi from '../../apis/accountApi';

const initialState = {
    user: null
};

export const getProfile = createAsyncThunk('account/getProfile', async () => {
    const user = await accountApi.getProfile();
    return user;
});

const slice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        removeUser: state => {
            state.user = null
        }
    },
    extraReducers: {
        [getProfile.fulfilled]: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const {
    removeUser
} = slice.actions;

export default slice.reducer;
