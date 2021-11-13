import { styled } from '@mui/material/styles';
import { Container, Stack, Typography } from '@mui/material';

const LandingBanner = () => {
    return (
        <RootStyle>
            <BannerShadow />
            <Banner
                src='https://wp.w3layouts.com/medick/wp-content/themes/paid-files/medick/assets/images/banner1.jpg'
                alt=''
            />
            <Container maxWidth='lg'>
                <Content>
                    <Typography variant="h6" sx={{ color: 'common.white' }}>
                        Write something here
                    </Typography>
                </Content>
            </Container>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        width: '100%',
        height: '100vh'
    }
}));

const BannerShadow = styled('div')({
    zIndex: 2,
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'linear-gradient(to right, rgb(6 13 27 / 69%), rgb(0 0 0 / 73%))'
});

const Banner = styled('img')({
    zIndex: 1,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

const Content = styled(Stack)(({ theme }) => ({
    zIndex: 3,
    paddingTop: theme.spacing(19),
    position: 'relative'
}));

export default LandingBanner;
