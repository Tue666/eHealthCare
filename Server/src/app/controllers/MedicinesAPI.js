const mongoose = require('mongoose');

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
                status: 'success',
                message: 'Insert medicine successfully!',
                medicine
            })
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /medicines/:medicineId
    async editMedicine(req, res) {
        try {
            const { medicineId } = req.params;
            const medicine = await Medicine
                .findByIdAndUpdate(medicineId, {
                    ...req.body
                }, {
                    new: true
                });
            res.json({
                status: 'success',
                message: 'Edit medicine successfully!',
                medicine
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [DELETE] /api/medicines/:medicineId
    async deleteById(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId(req.account._id);
            const { medicineId } = req.params;
            const result = await Medicine
                .delete({ _id: medicineId }, deletor);
            res.json({
                status: 'success',
                message: 'Delete medicine successfully!',
                ...result,
                medicineId
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /api/medicines
    async deleteAll(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId(req.account._id);
            const { medicineIds } = req.body;
            const result = await Medicine
                .delete({ _id: { $in: medicineIds } }, deletor);
            res.json({
                status: 'success',
                message: 'Delete medicines successfully!',
                ...result,
                medicineIds
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new MedicineAPI;
