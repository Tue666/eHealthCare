import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography, Card } from '@mui/material';

// reveal
import { Slide } from 'react-reveal';

const CARDS = [
    {
        icon: '/static/icons/ic_design.svg',
        title: 'UI & UX Design',
        description:
            'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.'
    },
    {
        icon: '/static/icons/ic_code.svg',
        title: 'Development',
        description: 'Easy to customize and extend each component, saving you time and money.'
    },
    {
        icon: '/static/brand/logo_single.svg',
        title: 'Branding',
        description: 'Consistent design in colors, fonts ... makes brand recognition easy.'
    }
];

const LandingHelps = () => {
    return (
        <Container maxWidth='lg' sx={{ pt: 5 }}>
            <Stack
                spacing={2}
                alignItems='center'
            >
                <Typography variant='overline'>e-Health Care</Typography>
                <Typography variant='h3'>What e-Health Care helps you?</Typography>
                <Grid container spacing={2}>
                    {CARDS.map((card, index) => (
                        <Grid key={card.title} item xs={12} md={4}>
                            <Slide bottom>
                                <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter')}>
                                    <Typography variant="h5" paragraph>
                                        {card.title}
                                    </Typography>
                                    <Typography>
                                        {card.description}
                                    </Typography>
                                </CardStyle>
                            </Slide>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
};

const CardStyle = styled(Card)(({ theme }) => ({
    width: '330px',
    minHeight: '440px',
    margin: `${theme.spacing(10)} auto`,
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: 'rgb(145 158 171 / 21%) -40px 40px 80px 0px',
    borderRadius: '30px',
    backgroundColor: theme.palette.background.default,
    '&.cardLeft': {
        [theme.breakpoints.up('md')]: { marginTop: 45 }
    },
    '&.cardCenter': {
        [theme.breakpoints.up('md')]: { marginTop: 0 }
    }
}));

export default LandingHelps;
