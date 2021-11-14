import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import patientApi from '../../apis/patientApi';

const initialState = {
    user: null
};

export const getProfile = createAsyncThunk('patient/getProfile', async () => {
    const user = await patientApi.getProfile();
    return user;
});

const slice = createSlice({
    name: 'patient',
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
