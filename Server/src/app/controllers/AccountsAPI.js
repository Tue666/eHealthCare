const bcrypt = require('bcrypt');

// models
const Account = require('../models/Account');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
// utils
const { generateToken } = require('../../utils/jwt');

class AccountsAPI {
    // [GET] /accounts/profile
    async getProfile(req, res) {
        const { _id, role } = req.account;
        try {
            let profile = {};
            switch (role) {
                case 'Patient':
                    {
                        profile = await Patient
                            .findOne({ accountId: _id });
                    }
                    break;
                case 'Doctor':
                    {
                        profile = await Doctor
                            .findOne({ accountId: _id });
                    }
                    break;
                default:
                    break;
            }
            res.json(profile);
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /accounts/login
    async login(req, res) {
        try {
            const { code, password } = req.body;
            const account = await Account
                .findOne({ code: code });
            if (!account) {
                res.statusMessage = 'Wrong serial card number or password!';
                res.status(400).end();
                return;
            }
            const isRightPassword = await bcrypt.compare(password, account.password);
            if (!isRightPassword) {
                res.statusMessage = 'Wrong serial card number or password!';
                res.status(400).end();
                return;
            }
            const { _id, name, role } = account;
            const tokens = generateToken({ _id, role });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json({
                tokens,
                account: {
                    name,
                    role
                }
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/register
    async register(req, res) {
        try {
            const { code, password, passwordConfirm, name, address, phone, role, ...accountInfor } = req.body;
            const accountExisted = await Account
                .findOne({ code: code });
            if (accountExisted) {
                res.statusMessage = 'This account already exists!';
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
            const account = new Account({
                code,
                password: hashedPassword,
                name,
                address,
                phone,
                role
            });
            await account.save();
            switch (role) {
                case 'Patient':
                    {
                        const patient = new Patient({
                            accountId: account._id.toString(),
                            ...accountInfor
                        });
                        await patient.save();
                    }
                    break;
                case 'Doctor':
                    {
                        const doctor = new Doctor({
                            accountId: account._id.toString(),
                            ...accountInfor
                        });
                        await doctor.save();
                    }
                    break;
                default:
                    break;
            }
            res.json({
                message: 'Register successfully!'
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/refreshToken
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.sendStatus(401);
            const account = await Account
                .findOne({
                    refreshToken
                });
            if (!account) return res.sendStatus(403);
            const { _id, role } = account;
            const tokens = generateToken({ _id, role });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json(tokens);
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new AccountsAPI;
