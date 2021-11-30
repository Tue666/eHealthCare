import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

// apis
import patientApi from '../../../apis/patientApi';
// components
import ECard from '../../ECard';

const propTypes = {
    patientId: PropTypes.string.isRequired
};

const PatientInfor = ({ patientId }) => {
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        const getPatient = async () => {
            const res = await patientApi.findById(patientId);
            setPatient(res);
        };
        getPatient();
    }, [patientId]);
    return (
        <ECard
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            {patient && (
                <Stack>
                    <Typography variant='subtitle1' sx={{ mb: 1 }}>----------- Patient -----------</Typography>
                    <Typography variant='subtitle2'>Name: {patient.name}</Typography>
                    <Typography variant='subtitle2'>Phone: {patient.phone}</Typography>
                    <Typography variant='subtitle2'>Family Phone: {patient.familyPhone}</Typography>
                    <Typography variant='subtitle2'>Address: {patient.address}</Typography>
                    <Typography variant='subtitle2'>Date of birth: {patient.dateOfBirth}</Typography>

                    <Typography variant='subtitle2'>Sex: {patient.sex}</Typography>
                    <Typography variant='subtitle2'>Blood group: {patient.bloodGroup}</Typography>
                    <Typography variant='subtitle2'>Weight: {patient.weight}</Typography>
                    <Typography variant='subtitle2'>Height: {patient.height}</Typography>
                    <Typography variant='subtitle2'>Heartbeat: {patient.heartBeat}</Typography>
                </Stack>
            )}
        </ECard>
    );
};

PatientInfor.propTypes = propTypes;

export default PatientInfor;
