import './SuperAdmin.css';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';

function SuperAdmin() {
    return (
        <>
        <div className='super-admin'>
            <Menu />
            <div className='open-page'>
                <Outlet/>
            </div>
        </div>
        </>
    );
}

export default SuperAdmin;