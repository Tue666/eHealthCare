import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Stack, Typography, Skeleton } from '@mui/material';
import { StarRateTwoTone } from '@mui/icons-material';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import RoomList from '../../../components/dashboard/services/RoomList';
// path
import { PATH_DASHBOARD } from '../../../routes/path';
// apis
import roomApi from '../../../apis/roomApi';

const SkeletonLoad = (
    <Grid
        container
        spacing={3}
    >
        {[...Array(12)].map((_, index) => (
            <Grid item xs={12} md={4} key={index}>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Stack sx={{ width: '70%' }}>
                        <Skeleton variant='text' />
                        <Skeleton variant='text' />
                        <Skeleton variant='text' />
                    </Stack>
                    <Skeleton variant="circular" width={60} height={60} />
                </Stack>
            </Grid>
        ))}
    </Grid>
);

const Rooms = () => {
    const { pathname } = useLocation();
    const [rooms, setRooms] = useState(null);
    useEffect(() => {
        const getRooms = async () => {
            const departmentId = (pathname.split('/').pop()).split('-').pop();
            const res = await roomApi.findAll(departmentId);
            setRooms(res);
        };
        getRooms();
    }, [pathname]);
    return (
        <Page title='Teeth Health Care | E-Health Care'>
            <Container>
                <HeaderBreadcrumbs
                    heading='Teeth Health Care'
                    links={[
                        { name: 'Services', href: PATH_DASHBOARD.services },
                    ]}
                />
                {rooms && rooms.length !== 0 && <RoomList rooms={rooms} />}
                {rooms && rooms.length === 0 && (
                    <Stack
                        alignItems='center'
                        spacing={1}
                        sx={{ width: '100%', py: 3 }}
                    >
                        <StarRateTwoTone color='warning' sx={{ fontSize: 'xxx-large' }} />
                        <Typography variant='subtitle1'>No doctors found. Please come back later</Typography>
                    </Stack>
                )}
                {!rooms && SkeletonLoad}
            </Container>
        </Page>
    );
};

export default Rooms;
