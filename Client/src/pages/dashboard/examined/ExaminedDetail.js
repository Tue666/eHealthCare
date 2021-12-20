import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';

// apis
import roomApi from '../../../apis/roomApi';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
    RoomInfor,
    DoctorInfor,
    Prescription
} from '../../../components/dashboard/processing';
// path
import { PATH_DASHBOARD } from '../../..//routes/path';

const ExaminedDetail = () => {
    const { pathname } = useLocation();
    const [room, setRoom] = useState(null);
    useEffect(() => {
        const getRoom = async () => {
            const res = await roomApi.findExamined(pathname.split('/').pop());
            setRoom(res);
        };
        getRoom();
    }, [pathname]);
    return (
        <Page title='Processing | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>Your processing examination</Typography>
                <HeaderBreadcrumbs
                    heading='Examine'
                    links={[
                        { name: 'Examined', href: PATH_DASHBOARD.examined },
                    ]}
                />
                {room && Object.keys(room).length !== 0 && (
                    <Grid
                        container
                        spacing={4}
                    >
                        <Grid item md={6} sm={12}>
                            <RoomInfor room={room.room} />
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <DoctorInfor doctor={room.doctor} />
                        </Grid>
                        <Grid item md={12}>
                            <Prescription prescription={room.prescription} insurance={room.insurance} />
                        </Grid>
                    </Grid>
                )}
                {room && Object.keys(room).length === 0 && 'Nothing here...'}
            </Container>
        </Page>
    );
};

export default ExaminedDetail;
