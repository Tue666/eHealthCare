import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import AuthSocial from '../../components/authentication/AuthSocial';
import { LoginForm } from '../../components/authentication/login';
// path
import { PATH_AUTH } from '../../routes/path';

const Login = () => (
    <Page title='Sign in | E-Health Care'>
        <Stack direction='row' justifyContent='end' alignItems='center'>
            Don’t have an account? &nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
            </Link>
        </Stack>
        <Logo sx={{ my: 5 }}>Sign in to E-Health Care</Logo>
        <Typography variant='body1'>Enter your details below.</Typography>
        <AuthSocial />
        <LoginForm />
    </Page>
);

export default Login;
