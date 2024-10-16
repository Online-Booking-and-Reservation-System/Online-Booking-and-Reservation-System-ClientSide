import "./Navbar.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import { useState } from "react";
import Signup from "../../Signup/Signup";
import Signin from "../../Signin/Signin";
import Contact from "../Contact Us/Contact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";

function Navbar() {
    const [suButtonPopup, setSuButtonPopup] = useState(false);
    const [siButtonPopup, setSiButtonPopup] = useState(false);
    const [contactPopup, setContactPopup] = useState(false);
    const isPopupOpen = suButtonPopup || siButtonPopup || contactPopup;

    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        localStorage.removeItem('role');
        navigate('/'); // Redirect to home
        toast.success('successfully signed out!');
    };

    return <>
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                  <p className="welcome">Welcome&nbsp;to</p>
                  <p className="tbooky"> Table<strong>Booky</strong></p>

                </Link>
            </div>
            <ul className="nav-links">
            { role ==='user' && (
                    <>
                       <li className="nav-link">
                            <Link to="/">Home</Link>
                       </li>
                       <li className="nav-link"><Link to="/reservation">reservations</Link></li>
                       <li className="nav-link"
                         onClick={ () => {
                         setContactPopup(true);
                         setSiButtonPopup(false);
                         setSuButtonPopup(false);
                         }}>
                             <Link to="/">Contact&nbsp;Us</Link>
                       </li>
                       <li className="nav-link" onClick={handleLogout}>signout</li>
                       <div className="vertical-line"></div>
                       <div className="user-info">
                          <p className="user-role">
                            <FaUser /> {role}
                          </p>
                       </div>

                    </>
                ) }
                { role === 'manager' && (
                    <>
                      <li className="nav-link"><Link to="/admin/reservationsTable">manager</Link></li>
                      <li className="nav-link"
                         onClick={ () => {
                         setContactPopup(true);
                         setSiButtonPopup(false);
                          setSuButtonPopup(false);
                        }}>
                            <Link to="/">Contact&nbsp;Us</Link>
                      </li>
                      <li className="signout nav-link" onClick={handleLogout}>signout</li>
                      <div className="vertical-line"></div>
                      <div className="user-info">
                          <p className="user-role">
                            <FaUser /> {role}
                          </p>
                       </div>

                    </>
              
            ) }
              
                { role === 'admin' && ( //superadmin
                    <>
                       <li className="nav-link"><Link to="/superAdmin">Admin</Link></li>
                       <li className="nav-link"
                         onClick={ () => {
                         setContactPopup(true);
                         setSiButtonPopup(false);
                          setSuButtonPopup(false);
                        }}>
                            <Link to="/">Contact&nbsp;Us</Link>
                      </li>
                       <li className="signout nav-link" onClick={handleLogout}>signout</li>
                       <div className="vertical-line"></div>
                       <div className="user-info">
                          <p className="user-role">
                            <FaUser /> {role}
                          </p>
                       </div>

                    </>
                ) }

            </ul>
            { role === null && (
                <>
                   <div className="nav-btns">
               <button className="nav-btn signin-btn"
                onClick={ () => {
                    setSiButtonPopup(true);
                    setContactPopup(false);
                    setSuButtonPopup(false);
                    } }>
                    <Link to="/">Sign In</Link>
                </button>
               <button className="nav-btn signup-btn"
                onClick={ () => {
                    setSuButtonPopup(true);
                    setContactPopup(false);
                    setSiButtonPopup(false);
                    } } >
                   <Link to="/">Sign Up</Link>
               </button>
            </div>
                </>
            )}
            

        </nav>
        <Contact trigger={contactPopup} closeModal={() => setContactPopup(false)}/>
        <Signup trigger={suButtonPopup} closeModal={() => setSuButtonPopup(false)} />
        <Signin trigger={siButtonPopup} closeModal={() => setSiButtonPopup(false)}/>
        <div className={`main-content ${isPopupOpen ? "blurred" : ""}`}>
        <Outlet />
        </div>
     </>
}

export default Navbar;