// models
const Account = require('../models/Account');
const Patient = require('../models/Patient');

class PatientsAPI {
    // [GET] /patients/:patientId
    async findById(req, res) {
        try {
            const { patientId } = req.params;
            const patient = await Patient
                .findOne({ _id: patientId });
            const { _id, accountId, ...patientInfor } = patient.toObject();
            const account = await Account
                .findOne({ _id: accountId });
            res.json({
                ...patientInfor,
                name: account.name,
                phone: account.phone,
                address: account.address
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new PatientsAPI;
