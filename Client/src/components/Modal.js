import { forwardRef } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Alert
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// apis
import roomApi from '../apis/roomApi';
// hooks
import useModal from '../hooks/useModal';
import useSnackbar from '../hooks/useSnackbar';
// path
import { PATH_DASHBOARD } from '../routes/path';

const Transition = forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const Modal = () => {
    const { _id, isOpen, title, content, type, caseSubmit } = useSelector(state => state.dialog);
    const navigate = useNavigate();
    const { setModal } = useModal();
    const { setSnackbar } = useSnackbar();
    const handleClose = () => {
        setModal();
    };
    const [action, which] = caseSubmit ? caseSubmit.split('/') : [null, null];
    const handleSubmit = async () => {
        if (action && which) {
            switch (action) {
                case 'save':
                    {
                        if (which === 'room') {
                            const res = await roomApi.joinRoom({
                                doctorId: _id
                            });
                            const { status, message } = res;
                            status === 'success' && navigate(PATH_DASHBOARD.processing);
                            setSnackbar({
                                isOpen: true,
                                type: status,
                                message,
                                anchor: 'bottom-center'
                            });
                        }
                    }
                    break;
                default:
                    break;
            }
            handleClose();
        }
    };
    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            {action && which && (
                <>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <Alert severity={type}>{content}</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            color={
                                action === 'save' ? 'success' :
                                    action === 'edit' ? 'warning' :
                                        action === 'remove' ? 'error' :
                                            ''
                            }
                            onClick={handleSubmit}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default Modal;
