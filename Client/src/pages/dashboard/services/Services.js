import { useState, useEffect } from 'react';
import { Grid, Stack, Container, Typography, Skeleton } from '@mui/material';
import { StarRateTwoTone } from '@mui/icons-material';

// components
import Page from '../../../components/Page';
import { ServiceList } from '../../../components/dashboard/services';
// apis
import departmentApi from '../../../apis/departmentApi';

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

const Services = () => {
    const [services, setServices] = useState(null);
    useEffect(() => {
        const getServices = async () => {
            const res = await departmentApi.listDepartment();
            setServices(res);
        };
        getServices();
    }, []);
    return (
        <Page title='Services | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>Our services</Typography>
                {services && services.length !== 0 && <ServiceList services={services} />}
                {services && services.length === 0 && (
                    <Stack
                        alignItems='center'
                        spacing={1}
                        sx={{ width: '100%', py: 3 }}
                    >
                        <StarRateTwoTone color='warning' sx={{ fontSize: 'xxx-large' }} />
                        <Typography variant='subtitle1'>No services found. Please come back later</Typography>
                    </Stack>
                )}
                {!services && SkeletonLoad}
            </Container>
        </Page>
    );
};

export default Services;
