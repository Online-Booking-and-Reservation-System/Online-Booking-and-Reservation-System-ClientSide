import './Signin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signin({ trigger, closeModal }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSignin = async (e) => {
       e.preventDefault();
       try {
           const response = await axios.post('http://localhost:3000/api/auth/login', {
               email,
               password,
           });
            const token = response.data.data.token; 
            const decodedToken = JSON.parse(atob(token.split('.')[1])); 
            const role = decodedToken.role; 
           closeModal();
          //  console.log(decodedToken);
          //  console.log(role);
           localStorage.setItem('token', token);
           localStorage.setItem('role', role); 
           toast.success('sign in successful!')
          //  console.log('Signed in successfully:', response);
       } catch (error) {
           console.error('Error signing in:', error.response?.data || error.message);
           toast.error('Error signing in, please try again.');
       }
   };

   return (trigger) ? (
       <div className='popup-overlay'> 
          <div className="s-popup">
            <div className="signin-container">
               <div className="siTop">
                  <button className="si-close-btn" onClick={closeModal}><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <h2 className="si">Welcome back</h2>
               </div>
               <form className="signin" onSubmit={handleSignin}>
                  <label className="si-label">Email</label>
                  <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="bob@gmail.com"/>   
                  <label className="si-label">Password</label>
                  <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="******"/>
            <button className="signin-btn2" type="submit">Sign In</button>
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