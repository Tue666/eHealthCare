import { useLocation, Navigate } from 'react-router-dom';

// hooks
import useAuth from "../hooks/useAuth";
// path
import { PATH_AUTH } from '../routes/path';

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    return isAuthenticated
        ? <>{children}</>
        : <Navigate to={{
            pathname: PATH_AUTH.login,
            state: { from: pathname }
        }} />
};

export default AuthGuard;
