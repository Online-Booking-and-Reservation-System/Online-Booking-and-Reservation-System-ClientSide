import './Signin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function Signin({ trigger, closeModal }) {
   return (trigger) ? (
       <div className='popup-overlay'> 
          <div className="s-popup">
            <div className="signin-container">
               <div className="siTop">
                  <span className="close-btn" onClick={closeModal}><FontAwesomeIcon icon={faChevronLeft} /></span>
                  <h2 className="si">Welcome back</h2>
               </div>
               <form className="signin">
                  <label className="si-label">Email</label>
                  <input type="email"
                    required
                    placeholder="bob@gmail.com"/>   
                  <label className="si-label">Password</label>
                  <input type="password"
                    required
                    placeholder="******"/>
            <button className="signin-btn2">Sign In</button>
            </form>
               <div className="si-bottom">
                 <p className="bottom-q"> don't have an account?</p>
                 <p className="signup-link">Signup</p>
               </div>
            </div>
          </div>
       </div>
   ) : "";
}

export default Signin;