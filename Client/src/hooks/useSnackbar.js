import { useDispatch } from 'react-redux';

import { initSnackbar } from '../redux/slices/snackbar';

const useSnackbar = () => {
    const dispatch = useDispatch();
    const setSnackbar = (settings = {
        isOpen: false,
        type: null,
        message: '',
        anchor: 'bottom-center'
    }) => {
        dispatch(initSnackbar(settings));
    };
    return { setSnackbar };
};

export default useSnackbar;
