import './Admin.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin components/SideBar';

function Admin() {
    return (
        <div className="admin-layout">
            
            <Sidebar />

            {/* Main content area */}
            <div className="admin-content">
                <h1>Admin Panel</h1>
                <Outlet />  
            </div>
        </div>
    );
}

export default Admin;
