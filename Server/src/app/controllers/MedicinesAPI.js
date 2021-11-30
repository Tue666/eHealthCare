// models
// models
const Medicine = require('../models/Medicine');

class MedicineAPI {
    // [GET] /medicines
    async findAll(req, res) {
        try {
            const medicines = await Medicine
                .find({});
            res.json(medicines)
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /medicines
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
module.exports = new MedicineAPI;
