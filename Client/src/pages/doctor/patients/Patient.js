import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

// apis
import medicineApi from '../../../apis/medicineApi';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PatientInfor, Prescription } from '../../../components/doctor/patients';
// path
import { PATH_DOCTOR } from '../../../routes/path';

const Patient = () => {
    const { pathname } = useLocation();
    const [medicines, setMedicines] = useState(null);
    useEffect(() => {
        const getMedicines = async () => {
            const res = await medicineApi.findAll();
            setMedicines(res);
        };
        getMedicines();
    }, []);
    return (
        <Page title='Patient | E-Health Care'>
            <Container>
                <HeaderBreadcrumbs
                    heading='Patient'
                    links={[
                        { name: 'Patients', href: PATH_DOCTOR.patients },
                    ]}
                />
                <Grid
                    container
                    spacing={4}
                >
                    <Grid item md={6} sm={12}>
                        {medicines && <Prescription medicines={medicines} patientId={pathname.split('/').pop()} />}
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <PatientInfor patientId={pathname.split('/').pop()} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default Patient;
