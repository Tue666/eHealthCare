import {
    Dashboard,
    AccessTimeFilled,
    CheckCircle,
    SettingsAccessibility,
    Medication
} from '@mui/icons-material';

// path
import {
    PATH_DASHBOARD,
    PATH_DOCTOR,
    PATH_MEDICINE
} from '../../routes/path';

const ICONS = {
    services: <Dashboard />,
    processing: <AccessTimeFilled />,
    examined: <CheckCircle />,
    patients: <SettingsAccessibility />,
    medicines: <Medication />
};

const SIDEBAR_DOCTOR_CONFIG = [
    // Genera
    {
        subheader: 'General',
        menus: [
            {
                roles: ['Patient'],
                items: [
                    {
                        title: 'Services',
                        path: PATH_DASHBOARD.services,
                        icon: ICONS.services
                    },
                    {
                        title: 'Processing',
                        path: PATH_DASHBOARD.processing,
                        icon: ICONS.processing
                    },
                    {
                        title: 'Examined',
                        path: PATH_DASHBOARD.examined,
                        icon: ICONS.examined
                    }
                ]
            },
            {
                roles: ['Doctor'],
                items: [
                    {
                        title: 'Patients',
                        path: PATH_DOCTOR.patients,
                        icon: ICONS.patients
                    }
                ]
            }
        ]
    },
    // Management
    {
        subheader: 'Management',
        menus: [
            {
                roles: ['Admin', 'Medicine'],
                items: [
                    {
                        title: 'Medicines',
                        path: PATH_MEDICINE.medicines,
                        icon: ICONS.medicines
                    }
                ]
            }
        ]
    }
];

export default SIDEBAR_DOCTOR_CONFIG;