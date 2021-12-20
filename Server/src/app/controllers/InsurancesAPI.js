// models
const Insurance = require('../models/Insurance');

class InsurancesAPI {
    // [POST] /insurances
    async insertInsurance(req, res) {
        try {
            const insurance = new Insurance(req.body);
            await insurance.save();
            res.json({
                message: 'Create insurance successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new InsurancesAPI;
