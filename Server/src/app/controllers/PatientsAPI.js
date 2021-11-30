// models
const Patient = require('../models/Patient');

class PatientsAPI {
    // [GET] /patients/:patientId
    async findById(req, res) {
        try {
            const { patientId } = req.params;
            const patient = await Patient
                .findOne({ _id: patientId });
            res.json(patient);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new PatientsAPI;
