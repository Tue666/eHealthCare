import axiosInstance from './axiosInstance';

const medicineApi = {
    // [GET] /medicines
    findAll: () => {
        const url = '/medicines';
        return axiosInstance.get(url);
    },
};

export default medicineApi;
