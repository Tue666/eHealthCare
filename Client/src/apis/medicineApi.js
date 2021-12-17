import axiosInstance from './axiosInstance';

const medicineApi = {
    // [GET] /medicines
    findAll: () => {
        const url = '/medicines';
        return axiosInstance.get(url);
    },

    // [POST] /medicines
    insertMedicine: body => {
        const url = '/medicines';
        return axiosInstance.post(url, body);
    },

    // [PUT] /medicines/:medicineId
    editMedicine: (medicineId, body) => {
        const url = `/medicines/${medicineId}`;
        return axiosInstance.put(url, body);
    },

    // [DELETE] /medicines/:medicineId
    deleteById: medicineId => {
        const url = `/medicines/${medicineId}`;
        return axiosInstance.delete(url);
    },

    // [PATCH] /medicines
    deleteMultiple: medicineIds => {
        const url = '/medicines';
        return axiosInstance.patch(url, { medicineIds });
    }
};

export default medicineApi;
