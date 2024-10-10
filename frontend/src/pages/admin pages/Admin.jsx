import './Admin.css';
import { Outlet , useLocation} from 'react-router-dom';
import Sidebar from '../../components/admin components/SideBar';
import RTable from './RTable/RTable';  // Import RTable
import RList from './RList/RList';      // Import RList
import Profile from './Profile/Profile';  // Import Profile

function Admin() {
   
    return (
        <div className="admin-layout">
            <div className="side">
            <Sidebar />
            </div>
           

            {/* Main content area */}
            <div className="admin-content">
            <Outlet />
            </div>
        </div>
    );
}

export default Admin;
