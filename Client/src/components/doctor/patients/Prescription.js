import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import { Stack, TextField, Button, Typography } from '@mui/material';

// apis
import roomApi from '../../../apis/roomApi';
// hooks
import useSnackbar from '../../../hooks/useSnackbar';
// path
import { PATH_DOCTOR } from '../../../routes/path';

const columns = [
    {
        field: 'name',
        title: 'Medicine name'
    },
    {
        field: 'quantity',
        title: 'Quantity left'
    }
];

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1
};

const propTypes = {
    medicines: PropTypes.array,
    patientId: PropTypes.string.isRequired
};

const Prescription = ({ medicines, patientId }) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState([]);
    const { setSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleChangeAmount = (e, _id) => {
        const value = e.target.value;
        const newPrescription = prescription.map(p => p._id === _id ? { ...p, amount: value } : p);
        setPrescription(newPrescription);
    };
    const handleChangeTime = (e, _id) => {
        const value = e.target.value;
        const newPrescription = prescription.map(p => p._id === _id ? { ...p, time: value } : p);
        setPrescription(newPrescription);
    };
    const handleSubmit = async () => {
        const res = await roomApi.diagnosis({
            patientId,
            diagnosis,
            prescription
        });
        const { status, message } = res;
        status === 'success' && navigate(PATH_DOCTOR.patients);
        setSnackbar({
            isOpen: true,
            type: status,
            message: message,
            anchor: 'top-center'
        });
    };
    return (
        <Stack spacing={3}>
            <TextField
                fullWidth
                label='Diagnosis'
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
            />
            <MaterialTable
                title='Medicines'
                columns={columns}
                data={medicines}
                options={options}
                onSelectionChange={selectedRows => {
                    const ids = selectedRows.map(row => row._id);
                    const newPrescription = prescription.filter(p => ids.includes(p._id));
                    const unGetRows = medicines.filter(row => ids.includes(row._id) && !newPrescription.some(s => s._id === row._id));
                    unGetRows.map(u => newPrescription.push({
                        ...u,
                        amount: '',
                        time: ''
                    }));
                    setPrescription(newPrescription);
                }}
            />
            <Stack
                spacing={5}
            >
                {prescription.map(item => (
                    <Stack key={item._id}>
                        <Typography variant='subtitle2'>{item.name}</Typography>
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={2}
                        >
                            <TextField
                                size='small'
                                fullWidth
                                label='Amount'
                                variant='standard'
                                value={item.amount}
                                onChange={e => handleChangeAmount(e, item._id)}
                            />
                            <TextField
                                size='small'
                                fullWidth
                                label='Time'
                                variant='standard'
                                value={item.time}
                                onChange={e => handleChangeTime(e, item._id)}
                            />
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Button variant='contained' onClick={handleSubmit}>Save</Button>
        </Stack>
    );
};

Prescription.propTypes = propTypes;

export default Prescription;
