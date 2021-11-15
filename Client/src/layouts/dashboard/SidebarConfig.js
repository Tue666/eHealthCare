import { Dashboard } from '@mui/icons-material';

// path
import { PATH_DASHBOARD } from '../../routes/path';

const ICONS = {
    dashboard: <Dashboard />
};

const SIDEBAR_CONFIG = [
    // Genera
    {
        subheader: 'General',
        items: [
            {
                title: 'Services',
                path: PATH_DASHBOARD.services,
                icon: ICONS.dashboard
            },
        ]
    }
];

export default SIDEBAR_CONFIG;