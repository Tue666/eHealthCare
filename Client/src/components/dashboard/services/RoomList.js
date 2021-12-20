import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography, Alert } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

// apis
import roomApi from '../../../apis/roomApi';
// components
import ECard from '../../ECard';
import AvatarBadge from '../../AvatarBadge';
// hooks
import useSnackbar from '../../../hooks/useSnackbar';
// path
import { PATH_DASHBOARD } from '../../../routes/path';

const propTypes = {
    rooms: PropTypes.array
};

const RoomList = ({ rooms }) => {
    const confirm = useConfirm();
    const navigate = useNavigate();
    const { setSnackbar } = useSnackbar();
    const handleJoinRoom = async doctorId => {
        try {
            await confirm({
                title: 'Join this room?',
                content: <Alert severity='info'>Get the number and go to the waiting room after that</Alert>
            });
            const res = await roomApi.joinRoom({
                doctorId
            });
            const { status, message } = res;
            status === 'success' && navigate(PATH_DASHBOARD.processing);
            setSnackbar({
                isOpen: true,
                type: status,
                message,
                anchor: 'bottom-center'
            });
        } catch (error) {

        }
    };
    return (
        <Grid
            container
            spacing={3}
        >
            {rooms.map(room => {
                const { doctor, currentPatient, inQueue } = room;
                const { _id, name, phone, image, dutyDay, dutyFrom, dutyTo } = doctor;
                return (
                    <Grid item xs={12} md={4} key={_id}>
                        <ECard
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleJoinRoom(_id)}
                        >
                            <Stack sx={{ width: '60%' }}>
                                {dutyDay.length !== 0 && (
                                    <Fragment>
                                        <Typography variant='subtitle2' component='p'>Duty day:</Typography>
                                        <Typography variant='caption'>
                                            {dutyDay.map((day, index) => `${day}${index < dutyDay.length - 1 ? ', ' : ''}`)}
                                        </Typography>
                                    </Fragment>
                                )}
                                <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Shift: {dutyFrom} - {dutyTo}</Typography>
                                {currentPatient && <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Current patient: {currentPatient}</Typography>}
                                {!currentPatient && <Typography variant='caption' sx={{ fontWeight: 'bold' }}>No patients yet</Typography>}
                                {inQueue !== 0 && <Typography variant='caption' sx={{ fontWeight: 'bold' }}>In queue: {inQueue}</Typography>}
                            </Stack>
                            <Stack
                                spacing={1}
                                alignItems='center'
                                sx={{ width: '35%' }}
                            >
                                <AvatarBadge
                                    image={image}
                                    status='online'
                                    sx={{
                                        width: '60px',
                                        height: '60px'
                                    }}
                                />
                                <Stack sx={{ textAlign: 'center' }}>
                                    <Typography variant='caption' sx={{ fontWeight: 'bold' }}>{name}</Typography>
                                    <Typography variant='caption' sx={{ fontWeight: 'bold' }}>{phone}</Typography>
                                </Stack>
                            </Stack>
                        </ECard>
                    </Grid>
                )
            })}
        </Grid>
    );
};

RoomList.propTypes = propTypes;

export default RoomList;
