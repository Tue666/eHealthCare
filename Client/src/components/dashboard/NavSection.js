import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const NavItem = ({ item, active }) => {
    const theme = useTheme();
    const { title, path, icon } = item;
    const isActive = active(path);
    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:before': { display: 'block' }
    };
    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActive && activeRootStyle)
            }}
        >
            <ListItemIconStyle
                sx={{ color: isActive ? 'primary.main' : '' }}
            >
                {icon && icon}
            </ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
        </ListItemStyle>
    );
};

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
        top: 0,
        right: 0,
        width: 3,
        bottom: 0,
        content: "''",
        position: 'absolute',
        display: 'none',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: theme.palette.primary.main
    }
}));

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func
};

// -----------------------------------------------------------------------

const NavSection = ({ navConfig }) => {
    const { pathname } = useLocation();
    const match = path => {
        return path
            ? !!matchPath({ path, end: false }, pathname)
            : false
    };
    return (
        <Box>
            {navConfig.map(list => (
                <List key={list.subheader} disablePadding>
                    <ListSubheaderStyle>{list.subheader}</ListSubheaderStyle>
                    {list.items.map(item => (
                        <NavItem key={item.title} item={item} active={match} />
                    ))}
                </List>
            ))}
        </Box>
    );
};

const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
    ...theme.typography.overline,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    color: theme.palette.text.primary,
    backgroundColor: 'transparent'
}));

NavSection.propTypes = {
    navConfig: PropTypes.array
};

export default NavSection;
