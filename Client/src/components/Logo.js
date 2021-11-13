import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Spa } from '@mui/icons-material';

// path
import { PATH_PAGE } from '../routes/path';

const propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object
};

const Logo = ({ children, sx }) => (
    <NavLink to={PATH_PAGE.root}>
        <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={1}
            sx={{ color: 'primary.main', ...sx }}
        >
            <Spa />
            <Title>{children}</Title>
        </Stack>
    </NavLink>
);

const Title = styled('span')({
    fontWeight: 'bold',
    fontSize: 20
});

Logo.propTypes = propTypes;

export default Logo;
