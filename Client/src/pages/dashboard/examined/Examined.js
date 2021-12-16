import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import { Container, Stack, Typography, IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

// apis
import roomApi from '../../../apis/roomApi';
// components
import Page from '../../../components/Page';
// utils
import { fDateUS } from '../../../utils/formatTime';

const columns = [
    {
        field: 'diagnosis',
        title: 'Diagnosis',
        width: '30%'
    },
    {
        field: 'updatedBy',
        title: 'Updated By',
        width: '18%'
    },
    {
        field: 'createdAt',
        title: 'Created At',
        width: '30%',
        render: row => <Typography variant='subtitle2'>{fDateUS(row.createdAt)}</Typography>
    },
    {
        field: 'status',
        title: 'Status',
        width: '12%',
        render: row => (
            <Chip color='primary' label={row.status} />
        )
    },
    {
        field: 'actions',
        title: 'Actions',
        sortable: false,
        render: row => (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                <Link to={`/dashboard/examined/${row._id}`}>
                    <IconButton>
                        <Visibility />
                    </IconButton>
                </Link>
            </Stack>
        )
    }
];

const options = {
    addRowPosition: 'first',
    actionsColumnIndex: -1
};

const Examined = () => {
    const [examined, setExamined] = useState(null);
    useEffect(() => {
        const getExamined = async () => {
            const res = await roomApi.findAllExamined();
            setExamined(res);
        };
        getExamined();
    }, []);
    return (
        <Page title='Examined | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>Examined</Typography>
                {examined && (
                    <MaterialTable
                        title='Examined'
                        columns={columns}
                        data={examined}
                        options={options}
                    />
                )}
            </Container>
        </Page>
    );
};

export default Examined;
