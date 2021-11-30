import axiosInstance from './axiosInstance';

const patientApi = {
    // [GET] /patients/:patientId
    findById: patientId => {
        const url = `/patients/${patientId}`;
        return axiosInstance.get(url);
    },
};

export default patientApi;
