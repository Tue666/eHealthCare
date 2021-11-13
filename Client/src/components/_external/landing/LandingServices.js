import { styled } from '@mui/material/styles';
import { Container, Stack, Typography } from '@mui/material';

// reveal
import { Slide } from 'react-reveal';

const SERVICES = [
    {
        icon: <i className="bi bi-clock"></i>,
        title: 'Therapiya',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-emoji-sunglasses"></i>,
        title: 'Pharmocology',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-shield-check"></i>,
        title: 'Dentistry',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-shield-check"></i>,
        title: 'Cardiology',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-shield-check"></i>,
        title: 'Virusology',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-shield-check"></i>,
        title: 'Eye Surgery',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    }
];

const LandingServices = () => {
    return (
        <Container maxWidth='lg'>
            <Stack
                spacing={2}
                alignItems='center'
                sx={{ p: 5 }}
            >
                <Typography variant='overline'>Extraordinary Services</Typography>
                <Typography variant='h5'>Our Services.</Typography>
                <Slide bottom cascade>
                    <Stack direction='row' sx={{ flexWrap: 'wrap' }}>
                        {SERVICES.map(service => (
                            <ServiceItem
                                key={service.title}
                                direction='row'
                                alignItems='center'
                            >
                                <IconText>
                                    {service.icon}
                                </IconText>
                                <Stack spacing={1}>
                                    <Typography variant='subtitle2'>{service.title}</Typography>
                                    <Typography variant='cation'>{service.description}</Typography>
                                </Stack>
                            </ServiceItem>
                        ))}
                    </Stack>
                </Slide>
            </Stack>
        </Container >
    );
};

const ServiceItem = styled(Stack)(({ theme }) => ({
    width: '50%',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}));

const IconText = styled('div')(({ theme }) => ({
    width: '90px',
    height: '60px',
    textAlign: 'center',
    lineHeight: '60px',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.default,
    margin: '20px',
    boxShadow: 'rgb(125 133 141 / 20%) -15px 10px 40px 0px'
}));

export default LandingServices;
