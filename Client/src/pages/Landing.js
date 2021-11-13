import { Stack } from '@mui/material';

// components
import Page from '../components/Page';
import {
    LandingBanner,
    LandingHelps,
    LandingWhyChoose,
    LandingServices,
    LandingTeam
} from '../components/_external/landing';

const Landing = () => {
    return (
        <Page title='E-Health Care'>
            <LandingBanner />
            <Stack>
                <LandingHelps />
                <LandingWhyChoose />
                <LandingServices />
                <LandingTeam />
            </Stack>
        </Page>
    );
};

export default Landing;
