import { SettingsAccessibility } from '@mui/icons-material';

// path
import { PATH_DOCTOR } from '../../routes/path';

const ICONS = {
    patients: <SettingsAccessibility />
};

const SIDEBAR_DOCTOR_CONFIG = [
    // Genera
    {
        subheader: 'General',
        items: [
            {
                title: 'Patients',
                path: PATH_DOCTOR.patients,
                icon: ICONS.patients
            }
        ]
    }
];

export default SIDEBAR_DOCTOR_CONFIG;