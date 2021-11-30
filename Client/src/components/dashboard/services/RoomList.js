import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';

// components
import ECard from '../../ECard';
import AvatarBadge from '../../AvatarBadge';
// hooks
import useModal from '../../../hooks/useModal';

const propTypes = {
    rooms: PropTypes.array
};

const RoomList = ({ rooms }) => {
    const { setModal } = useModal();
    const handleJoinRoom = doctorId => {
        setModal({
            isOpen: true,
            _id: doctorId,
            title: 'Join this room?',
            content: 'Get the number and go to the waiting room after that',
            type: 'success',
            caseSubmit: 'save/room'
        });
    };
    return (
        <Grid
            container
            spacing={3}
        >
            {rooms.map(room => {
                const { doctor, currentPatient, inQueue } = room;
                const { _id, name, image, phone, dutyDay, dutyFrom, dutyTo } = doctor;
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
                            <Stack sx={{ width: '70%' }}>
                                <Typography variant='subtitle2'>{name}</Typography>
                                <Typography variant='caption'>Phone: {phone}</Typography>
                                {dutyDay.length !== 0 && (
                                    <Fragment>
                                        <Typography variant='caption' component='p'>Duty day:</Typography>
                                        <Typography variant='caption'>
                                            {dutyDay.map((day, index) => `${day}${index < dutyDay.length - 1 ? ', ' : ''}`)}
                                        </Typography>
                                    </Fragment>
                                )}
                                <Typography variant='caption'>Shift: {dutyFrom} - {dutyTo}</Typography>
                                {currentPatient && <Typography variant='caption'>Current patient: {currentPatient}</Typography>}
                                {!currentPatient && <Typography variant='caption'>No patients yet</Typography>}
                                {inQueue !== 0 && <Typography variant='caption'>In queue: {inQueue}</Typography>}
                            </Stack>
                            <AvatarBadge
                                image={image}
                                status='online'
                                sx={{
                                    width: '60px',
                                    height: '60px'
                                }}
                            />
                        </ECard>
                    </Grid>
                )
            })}
        </Grid>
    );
};

RoomList.propTypes = propTypes;

export default RoomList;
