import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Stack, Typography, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// apis
import roomApi from '../../../apis/roomApi';
// components
import Page from '../../../components/Page';

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1
    },
    {
        field: 'phone',
        headerName: 'Phone',
        flex: 1
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 1
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        sortable: false,
        renderCell: params => (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                <Link to={`/doctor/patients/${params.row._id}`}>
                    <IconButton>
                        <Visibility />
                    </IconButton>
                </Link>
            </Stack>
        )
    }
];

const Patients = () => {
    const [patients, setPatients] = useState(null);
    useEffect(() => {
        const getPatients = async () => {
            const res = await roomApi.findAllPatient();
            setPatients(res);
        };
        getPatients();
    }, []);
    return (
        <Page title='Patients | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>Patients waiting</Typography>
                {patients && (
                    <DataGrid
                        autoHeight
                        autoPageSize
                        rows={patients}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        getRowId={row => row._id}
                    />
                )}
                {!patients && 'Loading...'}
            </Container>
        </Page>
    );
};

export default Patients;
