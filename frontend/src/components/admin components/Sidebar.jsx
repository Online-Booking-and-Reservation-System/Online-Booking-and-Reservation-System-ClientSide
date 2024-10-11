import './Sidebar.css';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faBook, faUser } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return <> 
      <div className="side-bar">
         <p>
            <Link to='/admin/reservationsTable'>
               <FontAwesomeIcon icon={faTable} />
            </Link>
         </p>
         <p>
            <Link to='/admin/reservationsList'>
                    <FontAwesomeIcon icon={faBook} />
            </Link>
         </p>
         <p>
            <Link to='/admin/profile'>
                <FontAwesomeIcon icon={faUser} />
            </Link>
         </p>
       </div>
     </>
}

export default Sidebar;