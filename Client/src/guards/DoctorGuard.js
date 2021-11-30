import { useLocation, Navigate } from 'react-router-dom';

// hooks
import useAuth from "../hooks/useAuth";
// path
import { PATH_AUTH } from '../routes/path';

const DoctorGuard = ({ children }) => {
    const roles = ['Doctor'];
    const { role } = useAuth();
    const { pathname } = useLocation();
    return roles.includes(role)
        ? <>{children}</>
        : <Navigate
            to={PATH_AUTH.login}
            state={{
                from: pathname
            }}
        />
};

export default DoctorGuard;
