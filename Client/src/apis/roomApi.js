import axiosInstance from './axiosInstance';

const roomApi = {
    // [GET] /rooms/:slugDepartmentId
    listRoom: departmentId => {
        const url = `/rooms/${departmentId}`;
        return axiosInstance.get(url);
    }
};

export default roomApi;
