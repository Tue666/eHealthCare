import { useLocation, Navigate } from 'react-router-dom';

// hooks
import useAuth from "../hooks/useAuth";
// path
import { PATH_AUTH } from '../routes/path';

const allowed = ['Doctor'];

const DoctorGuard = ({ children }) => {
    const { role } = useAuth();
    const { pathname } = useLocation();
    return allowed.includes(role)
        ? <>{children}</>
        : <Navigate
            to={PATH_AUTH.login}
            state={{
                from: pathname
            }}
        />
};

export default DoctorGuard;
