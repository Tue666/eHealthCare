import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// apis
import roomApi from '../../../apis/roomApi';
// hooks
import useSnackbar from '../../../hooks/useSnackbar';
// path
import { PATH_DOCTOR } from '../../../routes/path';

const columns = [
    {
        field: 'name',
        headerName: 'Medicine name',
        flex: 1
    },
    {
        field: 'quantity',
        headerName: 'Quantity left',
        flex: 1
    }
];

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
            <DataGrid
                autoHeight
                autoPageSize
                rows={medicines}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                getRowId={row => row._id}
                onSelectionModelChange={ids => {
                    const selectedRows = prescription.filter(p => ids.includes(p.medicineId));
                    const unSelectedRows = medicines.filter(row => ids.includes(row._id) && !selectedRows.some(s => s.medicineId === row._id));
                    unSelectedRows.map(u => selectedRows.push({
                        ...u,
                        amount: '',
                        time: ''
                    }));
                    setPrescription(selectedRows);
                }}
            />
            <>
                {prescription.map(item => (
                    <Stack
                        key={item._id}
                        direction='row'
                        alignItems='center'
                        spacing={2}
                    >
                        <Typography variant='subtitle2'>{item.name}</Typography>
                        <TextField label='Amount' variant='standard' value={item.amount} onChange={e => handleChangeAmount(e, item._id)} />
                        <TextField label='Time' variant='standard' value={item.time} onChange={e => handleChangeTime(e, item._id)} />
                    </Stack>
                ))}
            </>
            <Button variant='contained' onClick={handleSubmit}>Save</Button>
        </Stack>
    );
};

Prescription.propTypes = propTypes;

export default Prescription;
