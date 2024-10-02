import "./Navbar.css";
import {Link, Outlet , useNavigate} from "react-router-dom";


function Navbar() {
    return <>
        <nav className="navbar">
            <ul className="nav-links">
                <li className="nav-link"><Link to="/signup">Signup</Link></li>
                <li className="nav-link"><Link to="/login">Login</Link></li>
            </ul>
        </nav>
        <Outlet/>
     </>
}

export default Navbar;