const bcrypt = require('bcrypt');

// models
const Account = require('../models/Account');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Role = require('../models/Role');
// utils
const { generateToken } = require('../../utils/jwt');

class AccountsAPI {
    // [GET] /accounts/verify
    async verify(req, res) {
        const role = await Role
            .findOne({ _roleId: req.account.roleId });
        res.json({
            role: role.roleText
        });
    };

    // [GET] /accounts/profile
    async getProfile(req, res) {
        const { _id, roleId } = req.account;
        try {
            let profile = {};
            switch (roleId) {
                case 1:
                    {
                        profile = await Patient
                            .findOne({ accountId: _id });
                    }
                    break;
                case 2:
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
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.statusMessage = 'Fill all the fields, please!';
            res.status(400).end();
            return;
        }
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
            const { _id, roleId } = account;
            const tokens = generateToken({ _id, roleId });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            let name = '';
            switch (roleId) {
                case 1:
                    {
                        const patient = await Patient
                            .findOne({ accountId: _id });
                        name = patient.name
                    }
                    break;
                case 2:
                    {
                        const doctor = await Doctor
                            .findOne({ accountId: _id });
                        name = doctor.name
                    }
                    break;
                default:
                    break;
            }
            const role = await Role
                .findOne({ _roleId: roleId });
            res.json({
                tokens,
                user: {
                    name,
                    role: role.roleText
                }
            });
        } catch (error) {
            console.log(error);
        };
    };

    // [POST] /accounts/register
    async register(req, res) {
        const areFilled = Object.values(req.body).every(field => field !== '');
        if (!areFilled) {
            res.statusMessage = 'Fill all the fields, please!';
            res.status(400).end();
            return;
        }
        try {
            const { code, password, passwordConfirm, roleId, ...accountInfor } = req.body;
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
                roleId
            });
            await account.save();
            switch (roleId) {
                case 1:
                    {
                        const patient = new Patient({
                            accountId: account._id.toString(),
                            ...accountInfor
                        });
                        await patient.save();
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
            const { _id, roleId } = account;
            const tokens = generateToken({ _id, roleId });
            account.refreshToken = tokens.refreshToken;
            await account.save();
            res.json(tokens);
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new AccountsAPI;
