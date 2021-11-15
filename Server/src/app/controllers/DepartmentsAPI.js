// models
const Department = require('../models/Department');

class PatientsAPI {
    // [GET] /departments
    async listDepartment(req, res) {
        try {
            const departments = await Department
                .find({
                    status: 'active'
                });
            res.json(departments);
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /departments
    async addDepartment(req, res) {
        try {
            const department = new Department(req.body);
            await department.save();
            res.json({
                message: 'Create department successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new PatientsAPI;
