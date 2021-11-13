import { Outlet } from 'react-router-dom';

// 
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

const MainLayout = () => {
    return (
        <>
            <MainNavbar />
            <Outlet />
            <MainFooter />
        </>
    );
};

export default MainLayout;
