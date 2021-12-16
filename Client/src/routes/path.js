const path = (root, sublink) => {
    return `${root}${sublink}`;
};

const ROOT_AUTH = '/auth';
const ROOT_DASHBOARD = '/dashboard';
const ROOT_DOCTOR = '/doctor';
const ROOT_MEDICINE = '/manage-medicine';

export const PATH_PAGE = {
    root: '/',
    about: '/about-us',
    document: '/docs'
};

export const PATH_AUTH = {
    login: path(ROOT_AUTH, '/login'),
    register: path(ROOT_AUTH, '/register')
};

export const PATH_DASHBOARD = {
    services: path(ROOT_DASHBOARD, '/services'),
    processing: path(ROOT_DASHBOARD, '/processing'),
    examined: path(ROOT_DASHBOARD, '/examined')
};

export const PATH_DOCTOR = {
    patients: path(ROOT_DOCTOR, '/patients')
};

export const PATH_MEDICINE = {
    medicines: path(ROOT_MEDICINE, '/medicines')
};
