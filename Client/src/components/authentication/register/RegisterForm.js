import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Alert, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { Formik, Form, FastField } from 'formik';

// components
import { InputField } from '../../custom-field';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { patientRegisterSchema } from '../../../utils/yupSchema';
import { fDate } from '../../../utils/formatTime';
// path
import { PATH_AUTH } from '../../../routes/path';

const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [insuranceMethod, setInsuranceMethod] = useState(null);
    const initialValues = {
        code: '',
        name: '',
        address: '',
        phone: '',
        familyPhone: '',
        password: '',
        passwordConfirm: ''
    };
    const handleSubmit = async (values, { setErrors, resetForm }) => {
        try {
            const body = {
                ...values,
                role: "Patient",
                dateOfBirth: fDate(dateOfBirth),
                insuranceID: insuranceMethod,
                insuranceTime: insuranceMethod ? 30 : null
            };
            const res = await register(body);
            navigate(PATH_AUTH.login, {
                replace: true,
                state: res
            });
        } catch (error) {
            resetForm();
            setErrors({ afterSubmit: error.response.statusText });
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={patientRegisterSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Stack spacing={3}>
                        <FastField
                            name='code'
                            component={InputField}
                            type='text'
                            label='Serial number. Example: HS0000000000000 (*)'
                        />
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <FastField
                                name='name'
                                component={InputField}
                                type='text'
                                label='Your name (*)'
                            />
                            <MobileDateTimePicker
                                label='Date of birth'
                                inputFormat='MM/dd/yyyy'
                                value={dateOfBirth}
                                onChange={newValue => {
                                    setDateOfBirth(newValue);
                                }}
                                renderInput={params => <TextField {...params} />}
                            />
                        </Stack>
                        <FastField
                            name='address'
                            component={InputField}
                            type='text'
                            label='Home address (*)'
                        />
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <FastField
                                name='phone'
                                component={InputField}
                                type='text'
                                label='Your phone (*)'
                            />
                            <FastField
                                name='familyPhone'
                                component={InputField}
                                type='text'
                                label='Family phone number (*)'
                            />
                        </Stack>
                        <FastField
                            name='password'
                            component={InputField}
                            type='password'
                            label='Pasword (*)'
                        />
                        <FastField
                            name='passwordConfirm'
                            component={InputField}
                            type='password'
                            label='Password confirmation (*)'
                        />
                        <FormLabel>Insurance method (E-Health Care support)</FormLabel>
                        <RadioGroup
                            value={insuranceMethod}
                            onChange={e => setInsuranceMethod(e.target.value)}
                        >
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label='Method 1: 100.000 đ/month. When an illness arises, the hospital will pay 50% but not more than 500.000 đ'
                                sx={{ m: 1 }}
                            />
                            <FormControlLabel
                                value={2}
                                control={<Radio />}
                                label='Method 2: 300.000 đ/month. When an illness arises, the hospital will pay 80% but not more than 1.000.000 đ'
                                sx={{ m: 1 }}
                            />
                        </RadioGroup>
                        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                        <LoadingButton
                            loading={isSubmitting}
                            type='submit'
                            variant='contained'
                            sx={{ p: 1 }}
                        >
                            REGISTER
                        </LoadingButton>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
