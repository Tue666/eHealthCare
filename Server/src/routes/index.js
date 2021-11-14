const patientsRouter = require('./patients');

const initialRoutes = (app) => {
    app.use('/api/patients', patientsRouter);
};

module.exports = initialRoutes;
