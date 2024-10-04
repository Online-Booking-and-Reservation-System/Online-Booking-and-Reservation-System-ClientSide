import "./Navbar.css";
import {Link, Outlet , NavLink, useNavigate} from "react-router-dom";
import { useState } from "react";
import Signup from "../../Signup/Signup";
import Signin from "../../Signin/Signin";


function Navbar() {
    const [suButtonPopup, setSuButtonPopup] = useState(false);
    const [siButtonPopup, setSiButtonPopup] = useState(false);
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
                onClick={ () => {
                    setSiButtonPopup(true);
                    setSuButtonPopup(false);
                    } }>
                    <Link to="/signin">Sign In</Link>
                </button>
               <button className="nav-btn signup-btn"
                onClick={ () => {
                    setSuButtonPopup(true);
                    setSiButtonPopup(false);
                    } } >
                   <Link to="/signup">Sign Up</Link>
               </button>
            </div>

        </nav>
        <Signup trigger={suButtonPopup} closeModal={() => setSuButtonPopup(false)} />
        <Signin trigger={siButtonPopup} closeModal={() => setSiButtonPopup(false)}/>
        <Outlet/>
     </>
}

export default Navbar;