import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Stack, Typography } from '@mui/material';

// components
import ECard from '../../ECard';
import AvatarBadge from '../../AvatarBadge';

const propTypes = {
    doctor: PropTypes.object.isRequired
};

const DoctorInfor = ({ doctor }) => {
    const { name, phone, address, dutyDay, dutyFrom, dutyTo, image } = doctor;
    return (
        <ECard
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Stack sx={{ width: '70%' }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>----------- Doctor in charge -----------</Typography>
                <Typography variant='subtitle2'>Doctor: {name}</Typography>
                <Typography variant='subtitle2'>Phone: {phone}</Typography>
                <Typography variant='subtitle2'>Address: {address}</Typography>
                {dutyDay.length !== 0 && (
                    <Fragment>
                        <Typography variant='subtitle2' component='p'>Duty day:</Typography>
                        <Typography variant='subtitle2'>
                            {dutyDay.map((day, index) => `${day}${index < dutyDay.length - 1 ? ', ' : ''}`)}
                        </Typography>
                    </Fragment>
                )}
                <Typography variant='subtitle2'>Shift: {dutyFrom} - {dutyTo}</Typography>
            </Stack>
            <AvatarBadge
                image={image}
                status='online'
                sx={{
                    width: '120px',
                    height: '120px'
                }}
            />
        </ECard>
    );
};

DoctorInfor.propTypes = propTypes;

export default DoctorInfor;
