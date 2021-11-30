import { Dashboard, AccessTimeFilled, CheckCircle } from '@mui/icons-material';

// path
import { PATH_DASHBOARD } from '../../routes/path';

const ICONS = {
    services: <Dashboard />,
    processing: <AccessTimeFilled />,
    examined: <CheckCircle />
};

const SIDEBAR_PATIENT_CONFIG = [
    // Genera
    {
        subheader: 'General',
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
    }
];

export default SIDEBAR_PATIENT_CONFIG;