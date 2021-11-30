import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';

// apis
import roomApi from '../../apis/roomApi';
// components
import Page from '../../components/Page';
import {
    RoomInfor,
    DoctorInfor
} from '../../components/dashboard/processing';

const Processing = () => {
    const [room, setRoom] = useState(null);
    useEffect(() => {
        const getRoom = async () => {
            const res = await roomApi.findByPatient();
            setRoom(res);
        };
        getRoom();
    }, []);
    return (
        <Page title='Processing | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>Your processing examination</Typography>
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
                    </Grid>
                )}
                {room && Object.keys(room).length === 0 && 'Nothing here...'}
            </Container>
        </Page>
    );
};

export default Processing;
