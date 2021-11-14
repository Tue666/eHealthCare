const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e_health_care', () => {
            console.log('DB connection successful');
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connect };