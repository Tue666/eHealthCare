// models
const Doctor = require('../models/Doctor');

class DoctorsAPI {
    // [POST] /departments
    async addDoctor(req, res) {
        try {
            const doctor = new Doctor(req.body);
            await doctor.save();
            res.json({
                message: 'Create doctor successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new DoctorsAPI;
