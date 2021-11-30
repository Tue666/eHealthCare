import axiosInstance from './axiosInstance';

const accountApi = {
    // [GET] /accounts/profile
    getProfile: () => {
        const url = '/accounts/profile';
        return axiosInstance.get(url);
    },

    // [POST] /accounts/login
    login: (code, password) => {
        const url = '/accounts/login';
        return axiosInstance.post(url, {
            code,
            password
        });
    },

    // [POST] /accounts/register
    register: body => {
        const url = '/accounts/register';
        return axiosInstance.post(url, {
            ...body
        });
    }
};

export default accountApi;
