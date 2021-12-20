import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack, Typography, Box, Divider } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
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
        <Stack
            direction='row'
            alignItems='center'
            m={1}
        >
            <Box
                component='img'
                src='https://printgo.vn/uploads/media/790919/tao-ma-qr-code-san-pham-1_1620927223.jpg'
                alt='qr-code'
                sx={{
                    width: '60px',
                    height: '60px'
                }}
            />
        </Stack>
        <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'gray' }}>
                OR
            </Typography>
        </Divider>
        <LoginForm />
    </Page>
);

export default Login;
