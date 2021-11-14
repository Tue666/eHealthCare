const bcrypt = require('bcrypt');

// models
const Patient = require('../models/Patient');
// utils
const { generateToken } = require('../../utils/jwt');

class PatientsAPI {
    // [GET] /patients/profile
    async getProfile(req, res) {
        const patient = await Patient
            .findOne({ _id: req.user._id });
        const { password, ...user } = patient.toObject();
        res.json(user);
    };

    // [POST] /patients/login
    async login(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.statusMessage = 'Fill all the fields, please!';
            res.status(400).end();
            return;
        }
        try {
            const { code, password } = req.body;
            const patient = await Patient.findOne({ code: code });
            if (!patient) {
                res.statusMessage = 'Wrong insurance card number or password!';
                res.status(400).end();
                return;
            }
            const isRightPassword = await bcrypt.compare(password, patient.password);
            if (!isRightPassword) {
                res.statusMessage = 'Wrong insurance card number or password!';
                res.status(400).end();
                return;
            }
            const { _id } = patient;
            const tokens = generateToken({ _id });
            patient.refreshToken = tokens.refreshToken;
            await patient.save();
            res.json({
                tokens,
                user: {
                    name: patient.name
                }
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /patients/register
    async register(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.statusMessage = 'Fill all the fields, please!';
            res.status(400).end();
            return;
        }
        try {
            const { code, password, passwordConfirm } = req.body;
            const patientsExisted = await Patient.findOne({ code: code });
            if (patientsExisted) {
                res.statusMessage = 'This insurance card number already exists!';
                res.status(400).end();
                return;
            }
            if (password !== passwordConfirm) {
                res.statusMessage = 'Passwords are not synchronous!';
                res.status(400).end();
                return;
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const patient = new Patient({
                ...req.body,
                password: hashedPassword
            });
            await patient.save();
            res.json({
                message: 'Register successfully!'
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /patients/refreshToken
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.sendStatus(401);
            const patient = await Patient
                .findOne({
                    refreshToken
                });
            if (!patient) return res.sendStatus(403);
            const { _id } = patient;
            const tokens = generateToken({ _id });
            patient.refreshToken = tokens.refreshToken;
            await patient.save();
            res.json(tokens);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new PatientsAPI;
