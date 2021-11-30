// models
const Role = require('../models/Role');

class RolesAPI {
    // [POST] /roles
    async insertRole(req, res) {
        try {
            const role = new Role(req.body);
            await role.save();
            res.json({
                message: 'Create Role successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new RolesAPI;
