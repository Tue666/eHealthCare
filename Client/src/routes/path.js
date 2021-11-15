const path = (root, sublink) => {
    return `${root}${sublink}`;
};

const ROOT_AUTH = '/auth';
const ROOT_DASHBOARD = '/dashboard';

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
    services: path(ROOT_DASHBOARD, '/services')
}