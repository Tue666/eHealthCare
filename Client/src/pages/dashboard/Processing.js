import { useState, useEffect } from 'react';
import { Container, Stack, Grid, Typography } from '@mui/material';
import { StarRateTwoTone } from '@mui/icons-material';

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
                {room && Object.keys(room).length === 0 && (
                    <Stack
                        alignItems='center'
                        spacing={1}
                        sx={{ width: '100%', py: 3 }}
                    >
                        <StarRateTwoTone color='warning' sx={{ fontSize: 'xxx-large' }} />
                        <Typography variant='subtitle1'>No examination found. Please come back later</Typography>
                    </Stack>
                )}
            </Container>
        </Page>
    );
};

export default Processing;
