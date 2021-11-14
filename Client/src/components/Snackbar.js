import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';

import useSnackbar from '../hooks/useSnackbar';

const Snackbar = () => {
    const { isOpen, type, message, anchor } = useSelector(state => state.snackbar);
    const [vertical, horizontal] = anchor.split('-');
    const { setSnackbar } = useSnackbar();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar();
    };
    if (!type) {
        return (
            <MuiSnackbar
                open={isOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                anchorOrigin={{
                    vertical,
                    horizontal
                }}
            />
        );
    }
    return (
        <MuiSnackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
                vertical,
                horizontal
            }}
        >
            <Alert severity={type} variant='filled' sx={{ width: '100%' }}>
                {message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;
