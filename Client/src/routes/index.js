import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// guards
import PatientGuard from '../guards/PatientGuard';
import DoctorGuard from '../guards/DoctorGuard';
// 
import MainLayout from '../layouts/main';
import AuthLayout from '../layouts/authentication';
import DashboardLayout from '../layouts/dashboard';
import Loading from '../pages/Loading';

const Loadable = Component => props => {
    return (
        <Suspense
            fallback={<Loading />}
        >
            <Component {...props} />
        </Suspense>
    );
};

const Router = () => {
    return useRoutes([
        // Auth routes
        {
            path: 'auth',
            element: <AuthLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> }
            ]
        },
        // Dashboard routes
        {
            path: 'dashboard',
            element: (
                <PatientGuard>
                    <DashboardLayout />
                </PatientGuard>
            ),
            children: [
                { path: '', element: <Navigate to='/dashboard/services' replace /> },
                {
                    path: 'services',
                    children: [
                        { path: '', element: <Services /> },
                        { path: ':slugDepartment/dpid-:slugDepartmentId', element: <Rooms /> }
                    ]
                },
                { path: 'processing', element: <Processing /> },
                {
                    path: 'examined',
                    children: [
                        { path: '', element: <Examined /> },
                        { path: ':examinedId', element: <ExaminedDetail /> }
                    ]
                },
            ]
        },
        // Doctor routes
        {
            path: 'doctor',
            element: (
                <DoctorGuard>
                    <DashboardLayout />
                </DoctorGuard>
            ),
            children: [
                { path: '', element: <Navigate to='/doctor/patients' replace /> },
                {
                    path: 'patients',
                    children: [
                        { path: '', element: <Patients /> },
                        { path: ':patientId', element: <Patient /> }
                    ]
                },
            ]
        },
        // Medicine routes
        {
            path: 'manage-medicine',
            element: <DashboardLayout />,
            children: [
                { path: '', element: <Navigate to='/manage-medicine/medicines' replace /> },
                {
                    path: 'medicines',
                    children: [
                        { path: '', element: <Medicines /> }
                    ]
                },
            ]
        },
        // Main routes
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { path: '/', element: <Landing /> },
                { path: '/about-us', element: <AboutUs /> },
                { path: '/docs', element: <Documentation /> }
            ]
        }
    ]);
};

export default Router;

// Main
const Landing = Loadable(lazy(() => import('../pages/Landing')));
const AboutUs = Loadable(lazy(() => import('../pages/AboutUs')));
const Documentation = Loadable(lazy(() => import('../pages/Documentation')));

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));

// Dashboard
const Services = Loadable(lazy(() => import('../pages/dashboard/services/Services')));
const Rooms = Loadable(lazy(() => import('../pages/dashboard/services/Rooms')));
const Processing = Loadable(lazy(() => import('../pages/dashboard/Processing')));
const Examined = Loadable(lazy(() => import('../pages/dashboard/examined/Examined')));
const ExaminedDetail = Loadable(lazy(() => import('../pages/dashboard/examined/ExaminedDetail')));

// Doctor
const Patients = Loadable(lazy(() => import('../pages/doctor/patients/Patients')));
const Patient = Loadable(lazy(() => import('../pages/doctor/patients/Patient')));

// Medicine
const Medicines = Loadable(lazy(() => import('../pages/medicine/Medicines')));
