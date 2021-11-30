const patientsRouter = require('./patients');
const departmentsRouter = require('./departments');
const roomsRouter = require('./rooms');
const doctorsRouter = require('./doctors');
const rolesRouter = require('./roles');
const accountsRouter = require('./accounts');
const medicinesRouter = require('./medicine');

const initialRoutes = (app) => {
    app.use('/api/patients', patientsRouter);
    app.use('/api/departments', departmentsRouter);
    app.use('/api/rooms', roomsRouter);
    app.use('/api/doctors', doctorsRouter);
    app.use('/api/roles', rolesRouter);
    app.use('/api/accounts', accountsRouter);
    app.use('/api/medicines', medicinesRouter);
};

module.exports = initialRoutes;
