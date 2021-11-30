import axiosInstance from './axiosInstance';

const roomApi = {
    // [GET] /rooms/:slugDepartmentId
    findAll: departmentId => {
        const url = `/rooms/${departmentId}`;
        return axiosInstance.get(url);
    },

    // [GET] /rooms
    findAllPatient: () => {
        const url = '/rooms';
        return axiosInstance.get(url);
    },

    // [GET] /rooms/examined
    findAllExamined: () => {
        const url = '/rooms/examined';
        return axiosInstance.get(url);
    },

    // [GET] /rooms/examined/:examinedId
    findExamined: examinedId => {
        const url = `/rooms/examined/${examinedId}`;
        return axiosInstance.get(url);
    },

    // [GET] /rooms/p
    findByPatient: () => {
        const url = '/rooms/p';
        return axiosInstance.get(url);
    },

    // [POST] /rooms/diagnosis
    diagnosis: body => {
        const url = '/rooms/diagnosis';
        return axiosInstance.post(url, body);
    },

    // [POST] /rooms/join
    joinRoom: body => {
        const url = '/rooms/join';
        return axiosInstance.post(url, body);
    }
};

export default roomApi;
