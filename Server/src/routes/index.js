const patientsRouter = require('./patients');
const departmentsRouter = require('./departments');
const roomsRouter = require('./rooms');
const doctorsRouter = require('./doctors');

const initialRoutes = (app) => {
    app.use('/api/patients', patientsRouter);
    app.use('/api/departments', departmentsRouter);
    app.use('/api/rooms', roomsRouter);
    app.use('/api/doctors', doctorsRouter);
};

module.exports = initialRoutes;
