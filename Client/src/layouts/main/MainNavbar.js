import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Container } from '@mui/material';

// Path
import { PATH_PAGE } from '../../routes/path';
// hooks
import useOffSetTop from '../../hooks/useOffsetTop';
//
import MenuDesktop from './MenuDesktop';
import Logo from '../../components/Logo';

const MENU_CONFIG = [
    { label: 'Home', path: PATH_PAGE.root },
    { label: 'About us', path: PATH_PAGE.about },
    { label: 'Documentation', path: PATH_PAGE.document }
];

const APP_BAR_DESKTOP_HEIGHT = '88px';
const APP_BAR_MOBILE_HEIGHT = '64px';

const MainNavbar = () => {
    const { pathname } = useLocation();
    const isLanding = pathname === '/';
    const isOffset = useOffSetTop(100);
    return (
        <AppBar color='transparent' sx={{ boxShadow: 'none' }}>
            <ToolbarStyle
                sx={{
                    ...(isOffset && {
                        bgcolor: 'background.default',
                        boxShadow: '0 8px 16px 0 rgb(145 158 171 / 24%)'
                    })
                }}
            >
                <Container
                    maxWidth='lg'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Logo>e-Health Care</Logo>
                    <MenuDesktop isLanding={isLanding} isOffset={isOffset} menuItem={MENU_CONFIG} />
                </Container>
            </ToolbarStyle>
        </AppBar>
    );
};

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    height: APP_BAR_DESKTOP_HEIGHT,
    transition: '0.5s',
    [theme.breakpoints.up('md')]: {
        height: APP_BAR_MOBILE_HEIGHT
    }
}));

export default MainNavbar;
