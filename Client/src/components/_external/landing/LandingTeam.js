import { Container, Stack, Typography } from '@mui/material';

const LandingTeam = () => {
    return (
        <Container maxWidth='lg'>
            <Stack
                spacing={2}
                alignItems='center'
                sx={{ p: 5 }}
            >
                <Typography variant='overline'>Members</Typography>
                <Typography variant='h5'>Our Team.</Typography>

            </Stack>
        </Container>
    );
};

export default LandingTeam;
