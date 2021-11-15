import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import { Grid, Box, Typography, Link } from '@mui/material';

// components
import ECard from '../../ECard';
import Image from '../../Image';

const propTypes = {
    services: PropTypes.array
};

const ServiceList = ({ services }) => {
    return (
        <Grid
            container
            spacing={3}
        >
            {services.map(service => {
                const { _departmentId, title, image, description, slug } = service;
                return (
                    <Grid item xs={12} md={4} key={_departmentId}>
                        <Link underline='none' component={RouterLink} to={`/dashboard/services/${slug}/dpid-${_departmentId}`}>
                            <ECard
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box sx={{ width: '70%' }}>
                                    <ServiceName>{title}</ServiceName>
                                    <ServiceDescription>{description}</ServiceDescription>
                                </Box>
                                <Image
                                    src={image}
                                    alt={title}
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%'
                                    }}
                                />
                            </ECard>
                        </Link>
                    </Grid>
                )
            })}
        </Grid>
    );
};

const ServiceName = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
    ...theme.typography.caption,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
}));

ServiceList.propTypes = propTypes;

export default ServiceList;
