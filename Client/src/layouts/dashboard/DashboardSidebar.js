import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Drawer, Typography } from '@mui/material';

// components
import Logo from '../../components/Logo';
import Hidden from '../../components/Hidden';
import NavSection from '../../components/dashboard/NavSection';
// 
import SIDEBAR_PATIENT_CONFIG from './SidebarPatientConfig';
import SIDEBAR_DOCTOR_CONFIG from './SidebarDoctorConfig';

const DRAWER_WIDTH = 280;

const propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
    role: PropTypes.string
};

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar, role }) => {
    const renderContent = (
        <>
            <Box sx={{ px: 2.5, py: 5 }}>
                <Logo>E-Health Care</Logo>
            </Box>

            {role === 'Patient' && <NavSection navConfig={SIDEBAR_PATIENT_CONFIG} />}
            {role === 'Doctor' && <NavSection navConfig={SIDEBAR_DOCTOR_CONFIG} />}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
                <Typography gutterBottom variant="subtitle1" sx={{ color: 'grey.800' }}>
                    Hi, Pihe
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'grey.600' }}>
                    Need help?
                    <br /> Please check our docs
                </Typography>
                <Button fullWidth to='/' variant="contained" component={RouterLink}>
                    Documentation
                </Button>
            </Box>
        </>
    );
    return (
        <RootStyle>
            <Hidden width='lgUp'>
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
            <Hidden width='lgDown'>
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

DashboardSidebar.propTypes = propTypes;

export default DashboardSidebar;
