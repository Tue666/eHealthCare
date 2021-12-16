import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link, Stack, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form, FastField } from 'formik';

// components
import { InputField } from '../../custom-field';
// hooks
import useAuth from '../../../hooks/useAuth';
import useSnackbar from '../../../hooks/useSnackbar';
// utils
import { patientLoginSchema } from '../../../utils/yupSchema';
// path
import {
    PATH_DASHBOARD,
    PATH_DOCTOR,
    PATH_MEDICINE
} from '../../../routes/path';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();
    const { setSnackbar } = useSnackbar();
    const initalValues = {
        code: '',
        password: ''
    };
    const handleSubmit = async (values, { setErrors, resetForm }) => {
        try {
            const res = await login(values.code, values.password);
            const { name, role } = res;
            let middlePath = '';
            switch (role) {
                case 'Patient':
                    middlePath = PATH_DASHBOARD.services
                    break;
                case 'Doctor':
                    middlePath = PATH_DOCTOR.patients
                    break;
                case 'Medicine':
                    middlePath = PATH_MEDICINE.medicines
                    break;
                default:
                    break;
            }
            const path = state?.from ? state.from : middlePath;
            navigate(path, {
                replace: true
            });
            setSnackbar({
                isOpen: true,
                type: 'success',
                message: `Welcome back, ${name}`,
                anchor: 'top-center'
            });
        } catch (error) {
            resetForm();
            console.log(error);
            setErrors({ afterSubmit: error.response.statusText });
        }
    };
    return (
        <Formik
            initialValues={initalValues}
            validationSchema={patientLoginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Stack spacing={3}>
                        <FastField
                            name='code'
                            component={InputField}
                            type='text'
                            label='Serial number. Example: HS0000000000000'
                            color='success'
                        />
                        <FastField
                            name='password'
                            component={InputField}
                            type='password'
                            label='Password'
                            color='success'
                        />
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <FormControlLabel
                                control={<Checkbox />}
                                label='Remember me'
                            />
                            <Link component={RouterLink} variant='subtitle2' to='#'>
                                Forgot password?
                            </Link>
                        </Stack>
                        {state && state.message && <Alert severity="success">{state.message}</Alert>}
                        {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                        <LoadingButton
                            loading={isSubmitting}
                            type='submit'
                            variant='contained'
                            sx={{ p: 1 }}
                        >
                            LOGIN
                        </LoadingButton>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
