import { styled } from '@mui/material/styles';
import { Container, Stack, Typography } from '@mui/material';

// reveal
import { Slide } from 'react-reveal';

const REASONS = [
    {
        icon: <i className="bi bi-clock"></i>,
        title: '10 Years Of Experience',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-emoji-sunglasses"></i>,
        title: 'Free Consultation',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    },
    {
        icon: <i className="bi bi-shield-check"></i>,
        title: '100% Guranteed',
        description: 'Lorem ipsum dolor sit amet consectetur ipsum elit. Lorem ipsum dolor sit amet elit.'
    }
];

const LandingWhyChoose = () => {
    return (
        <Container maxWidth='lg'>
            <Stack
                direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
                alignItems='center'
                sx={{ p: 5 }}
            >
                <TextContent>
                    <Typography variant='h5' sx={{ mb: 3 }}>Why You Should Choose e-Health Care?.</Typography>
                    {REASONS.map(item => (
                        <Slide slide left key={item.title}>
                            <Stack
                                direction='row'
                                alignItems='center'
                            >
                                <IconText>
                                    {item.icon}
                                </IconText>
                                <Stack spacing={1}>
                                    <Typography variant='subtitle2'>{item.title}</Typography>
                                    <Typography variant='cation'>{item.description}</Typography>
                                </Stack>
                            </Stack>
                        </Slide>
                    ))}
                </TextContent>
                <Image
                    src='https://demo.w3layouts.com/demos_new/template_demo/01-02-2021/medick-liberty-demo_Free/1392520289/web/assets/images/ab.jpg'
                    alt=''
                />
            </Stack>
        </Container>
    );
};

const TextContent = styled('div')(({ theme }) => ({
    width: '50%',
    padding: theme.spacing(2),
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

const Image = styled('img')(({ theme }) => ({
    width: '50%',
    padding: '20px 0',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}));

export default LandingWhyChoose;
