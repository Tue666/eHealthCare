// models
const Doctor = require('../models/Doctor');

const Medicine = require('../models/Medicine');

class DoctorsAPI {
    // [POST] /doctors
    async insertDoctor(req, res) {
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

    // [POST] /a
    async insertMedicine(req, res) {
        try {
            const medicine = new Medicine(req.body);
            await medicine.save();
            res.json({
                status: 'successfully'
            })
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new DoctorsAPI;
