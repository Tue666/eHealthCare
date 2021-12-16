import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import { Container, Stack, Typography, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';

// apis
import roomApi from '../../../apis/roomApi';
// components
import Page from '../../../components/Page';

const columns = [
    {
        field: 'name',
        title: 'Name'
    },
    {
        field: 'phone',
        title: 'Phone',
    },
    {
        field: 'address',
        title: 'Address',
    },
    {
        field: 'actions',
        title: 'Actions',
        render: row => (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                <Link to={`/doctor/patients/${row.patientId}`}>
                    <IconButton>
                        <Visibility />
                    </IconButton>
                </Link>
            </Stack>
        )
    }
];

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1
};

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
                    <MaterialTable
                        title='Patients'
                        columns={columns}
                        data={patients}
                        options={options}
                    />
                )}
                {!patients && 'Loading...'}
            </Container>
        </Page>
    );
};

export default Patients;
