import axiosInstance from './axiosInstance';

const departmentApi = {
    // [GET] /departments
    listDepartment: () => {
        const url = '/departments';
        return axiosInstance.get(url);
    }
};

export default departmentApi;
