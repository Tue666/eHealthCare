import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import AuthSocial from '../../components/authentication/AuthSocial';
// import { RegisterForm } from '../../components/authentication/register';

// path
import { PATH_AUTH } from '../../routes/path';

const Register = () => (
    <Page title='Sign up | E-Health Care'>
        <Stack direction='row' justifyContent='end' alignItems='center'>
            Already have an account? &nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                Login
            </Link>
        </Stack>
        <Logo sx={{ my: 5 }}>Get started absolutely free.</Logo>
        <Typography variant='body1'>Free forever. No credit card needed.</Typography>
        <AuthSocial />
        {/* <RegisterForm PATH_AUTH={PATH_AUTH} /> */}
    </Page>
);

export default Register;
