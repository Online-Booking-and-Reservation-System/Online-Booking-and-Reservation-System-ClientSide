import './Admin.css';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTable, faBook, faUser } from '@fortawesome/free-solid-svg-icons';



function Admin() {
    return <>
       <div className="side-bar">
         <p>
            <Link><FontAwesomeIcon icon={faTable} /></Link>
         </p>
         <p>
            <Link><FontAwesomeIcon icon={faBook} /></Link>
         </p>
         <p>
            <Link><FontAwesomeIcon icon={faUser} /></Link>
         </p>
       </div>
       <Outlet/>
    </>
}

export default Admin;