import * as yup from 'yup';

export const patientRegisterSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^[A-Z][A-Z]\d+$/, 'Area code does not match')
        .length(15, 'Must be exactly 15 characters')
        .required('This field is required!'),
    name: yup
        .string()
        .required('This field is required!'),
    address: yup
        .string()
        .required('This field is required!'),
    phone: yup
        .string()
        .length(10, 'Must be exactly 10 characters')
        .required('This field is required!'),
    familyPhone: yup
        .string()
        .length(10, 'Must be exactly 10 characters')
        .required('This field is required!'),
    password: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
            'Minimum three characters. At least one letter, one number and one special character')
        .required('This field is required!'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must match')
        .required('This field is required!')
});

export const patientLoginSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^[A-Z][A-Z]\d+$/, 'Area code does not match')
        .length(15, 'Must be exactly 15 characters')
        .required('This field is required!'),
    password: yup
        .string()
        .required('This field is required!')
});