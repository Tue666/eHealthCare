import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Stack, Typography, IconButton, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// apis
import roomApi from '../../../apis/roomApi';
// components
import Page from '../../../components/Page';

const columns = [
    {
        field: 'diagnosis',
        headerName: 'Diagnosis',
        flex: 1
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: params => (
            <Chip color='primary' label={params.row.status} />
        )
    },
    {
        field: 'updatedBy',
        headerName: 'Updated By',
        flex: 1
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
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
                <Link to={`/dashboard/examined/${params.row._id}`}>
                    <IconButton>
                        <Visibility />
                    </IconButton>
                </Link>
            </Stack>
        )
    }
];

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
                    <DataGrid
                        autoHeight
                        autoPageSize
                        rows={examined}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        getRowId={row => row._id}
                    />
                )}
            </Container>
        </Page>
    );
};

export default Examined;
