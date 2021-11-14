import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// guards
import AuthGuard from '../guards/PrivateRoute';
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
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: '', element: <Navigate to="/dashboard/app" replace /> },
                { path: 'app', element: <GeneralApp /> }
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
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));