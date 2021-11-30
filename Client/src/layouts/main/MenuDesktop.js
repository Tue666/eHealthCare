import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Link, Button } from '@mui/material';

const MenuDesktopItem = ({ pathname, isLanding, isOffset, item }) => {
    const { label, path } = item;
    const isActive = pathname === path;
    return (
        <Linking
            component={RouterLink}
            to={path}
            sx={{
                ...(isLanding && { color: 'common.white' }),
                ...(isOffset && { color: 'text.primary' }),
                ...(isActive && { color: 'primary.main' })
            }}
        >
            {label}
        </Linking>
    );
};

const Linking = styled(Link)(({ theme }) => ({
    ...theme.typography.subtitle2,
    marginRight: theme.spacing(5),
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
        opacity: 0.7
    }
}));

MenuDesktopItem.propTypes = {
    pathname: PropTypes.string,
    isLanding: PropTypes.bool,
    isOffset: PropTypes.bool,
    item: PropTypes.object
};

// -------------------------------------------------------------------------------

const MenuDesktop = ({ isLanding, isOffset, menuItem }) => {
    const { pathname } = useLocation();
    return (
        <Stack
            direction='row'
            alignItems='center'
        >
            {menuItem.map(item => (
                <MenuDesktopItem
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    isLanding={isLanding}
                    isOffset={isOffset}
                />
            ))}
            <Button
                variant='contained'
                target='_blank'
                href='/auth/login'
            >
                Get started
            </Button>
        </Stack>
    );
};

MenuDesktop.propTypes = {
    isLanding: PropTypes.bool,
    isOffset: PropTypes.bool,
    menuItem: PropTypes.array
};

export default MenuDesktop;
