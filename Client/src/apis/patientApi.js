import axiosInstance from './axiosInstance';

const patientApi = {
    // [GET] /patients/profile
    getProfile: () => {
        const url = '/patients/profile';
        return axiosInstance.get(url);
    },

    // [POST] /patients/login
    login: (code, password) => {
        const url = '/patients/login';
        return axiosInstance.post(url, {
            code,
            password
        });
    },

    // [POST] /patients/register
    register: body => {
        const url = '/patients/register';
        return axiosInstance.post(url, {
            ...body
        });
    }
};

export default patientApi;
