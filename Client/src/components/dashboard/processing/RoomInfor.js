import PropTypes from 'prop-types';
import { Typography, Chip } from '@mui/material';

// components
import ECard from '../../ECard';
// utils
import { fDateUS } from '../../../utils/formatTime';

const propTypes = {
    room: PropTypes.object.isRequired
};

const RoomInfor = ({ room }) => {
    const { diagnosis, _roomId, createdAt, updatedAt, updatedBy, status } = room;
    return (
        <ECard
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start'
            }}
        >
            <Typography variant='subtitle1' sx={{ mb: 1 }}>----------- Room information -----------</Typography>
            <Typography variant='subtitle2'>Siagnosis: {diagnosis}</Typography>
            <Typography variant='subtitle2'>Serial number: {_roomId}</Typography>
            <Typography variant='subtitle2'>Created at: {fDateUS(createdAt)}</Typography>
            <Typography variant='subtitle2'>Updated at: {fDateUS(updatedAt)}</Typography>
            <Typography variant='subtitle2'>Updated by: {updatedBy}</Typography>
            <Typography variant='subtitle2'>
                Status:
                <Chip
                    color={status === 'processing' ? 'error' : 'primary'}
                    label={status}
                    sx={{ ml: 1 }}
                />
            </Typography>
        </ECard>
    );
};

RoomInfor.propTypes = propTypes;

export default RoomInfor;
