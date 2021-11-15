import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Stack, Breadcrumbs } from '@mui/material';

const propTypes = {
    links: PropTypes.array,
    heading: PropTypes.string.isRequired,
    sx: PropTypes.object
};

const HeaderBreadcrumbs = ({ links, heading, sx }) => {
    const renderBreadcrumbs = (
        <Breadcrumbs separator='>'>
            {links && links.map(link => (
                <Link
                    key={link.name}
                    component={RouterLink}
                    underline='none'
                    color='inherit'
                    to={link.href}
                >
                    {link.name}
                </Link>
            ))}
            <Typography color='primary'>
                {heading}
            </Typography>
        </Breadcrumbs>
    );
    return (
        <Stack mb={3} spacing={2} sx={sx}>
            <Stack direction='row' alignItems='center'>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h6' gutterBottom>
                        {heading}
                    </Typography>
                    {renderBreadcrumbs}
                </Box>
            </Stack>
        </Stack>
    );
};

HeaderBreadcrumbs.propTypes = propTypes;

export default HeaderBreadcrumbs;
