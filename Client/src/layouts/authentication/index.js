import { Link } from 'react-scroll';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

const AuthLayout = () => (
    <Stack
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent='space-around'
        alignItems='center'
        sx={{ p: 6, bgcolor: 'background.default' }}
    >
        <ImageWrapper>
            <Image src='https://www.gigadocs.com/blog/wp-content/uploads/2020/05/videocalling-with-therapist_23-2148512091.jpg' alt='' />
            <MoveImage>
                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEAvNx8pm2xEFwfC4BDyh7vAn6290l4Laz3kaDjPbEgA8Ih2wHnIPIytBsYTQK0asqmxc&usqp=CAU' alt='' />
            </MoveImage>
            <MoveImage>
                <Image src='https://leadscatalyst.com/wp-content/uploads/2019/01/blog7.png' alt='' />
            </MoveImage>
            <MoveImage>
                <Image src='https://webstockreview.net/images/healthcare-clipart-healthcare-professional-19.png' alt='' />
            </MoveImage>
            <Link to='form-wrapper' duration={500}>
                <Start size='large' variant='contained' endIcon={<ArrowDownward />}>Let's start</Start>
            </Link>
        </ImageWrapper>
        <Box sx={{ width: { xs: '100%', lg: '500px' } }} id='form-wrapper'>
            <Outlet />
        </Box>
    </Stack>
);

const ImageWrapper = styled('div')(({ theme }) => ({
    width: '450px',
    height: '500px',
    position: 'relative',
    '& div:nth-of-type(1)': {
        top: 0,
        left: '80%',
        animation: 'move-horizontal 1.5s infinite ease-in-out'
    },
    '& div:nth-of-type(2)': {
        top: '50%',
        left: '95%',
        animation: 'move-vertical 2s infinite ease-in-out'
    },
    '& div:nth-of-type(3)': {
        top: 'calc(100% - 80px)',
        left: 'calc(50% - 55px)',
        animation: 'shake 2s infinite ease-in-out'
    },
    [theme.breakpoints.down('lg')]: {
        marginBottom: '120px',
        '& div:nth-of-type(1)': {
            top: '15%',
            left: '-6%'
        },
        '& div:nth-of-type(2)': {
            top: '-9%',
            left: '64%'
        },
    }
}));

const MoveImage = styled('div')({
    width: '130px',
    height: '110px',
    position: 'absolute',
    '@keyframes move-horizontal': {
        '0%': {
            marginTop: 0
        },
        '50%': {
            marginTop: '-15px'
        },
        '100%': {
            marginTop: 0
        }
    },
    '@keyframes move-vertical': {
        '0%': {
            marginLeft: 0
        },
        '50%': {
            marginLeft: '-15px'
        },
        '100%': {
            marginLeft: 0
        }
    },
    '@keyframes shake': {
        '0%': {
            transform: 'rotate(-7deg)'
        },
        '50%': {
            transform: 'rotate(7deg)'
        },
        '100%': {
            transform: 'rotate(-7deg)'
        }
    }
});

const Image = styled('img')({
    width: '100%',
    height: '100%',
    backgroundSize: '100% auto'
});

const Start = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '105%',
    left: '50%',
    borderRadius: '20px',
    [theme.breakpoints.up('lg')]: {
        display: 'none'
    }
}));

export default AuthLayout;
