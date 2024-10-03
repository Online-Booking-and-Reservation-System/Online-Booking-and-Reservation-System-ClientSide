import "./Navbar.css";
import {Link, Outlet , NavLink, useNavigate} from "react-router-dom";
import { useState } from "react";
import Signup from "../../Signup/Signup";


function Navbar() {
    const [suButtonPopup, setSuButtonPopup] = useState(false);
    return <>
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                  <p className="welcome">Welcome to</p>
                  <p className="tbooky"> Table<strong>Booky</strong></p>

                </Link>
            </div>
            <ul className="nav-links">
                <li className="nav-link">
                    <Link to="/">Home</Link>
                    </li>
                <li className="nav-link"><Link to="/">Contact Us</Link></li>
                <button className="signout">signout</button>
            </ul>
            <div className="vertical-line"></div>
            <div className="nav-btns">
               <button className="nav-btn signin-btn"
                 >
                    <Link to="/signin">Sign In</Link>
                </button>
               <button className="nav-btn signup-btn"
                onClick={ () => setSuButtonPopup(true) } >
                   <Link to="/signup">Sign Up</Link>
               </button>
            </div>

        </nav>
        <Signup trigger={suButtonPopup} closeModal={() => setSuButtonPopup(false)} />
        <Outlet/>
     </>
}

export default Navbar;