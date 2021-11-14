import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    type: null,
    message: '',
    anchor: 'bottom-center'
};

const slice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        initSnackbar: (state, action) => {
            const { isOpen, type, message, anchor } = action.payload;
            state.isOpen = isOpen;
            state.type = type;
            state.message = message;
            state.anchor = anchor;
        }
    }
});

export const {
    initSnackbar
} = slice.actions;

export default slice.reducer;
