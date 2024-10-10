import './Signup.css';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import flag from '../../../public/Flag_of_Egypt.svg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://online-booking-and-reservation-system-server-side.vercel.app/api";

function Signup({ trigger, closeModal }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return; 
      }
      try {
          const response = await axios.post(`${API_URL}/api/api/auth/register`, {
              fullName,
              email,
              phone,
              password,
          });
          const token = response.data.token;

          localStorage.setItem('token', token);

          console.log('Signup successful, token:', token);
          toast.success('Signup successful!');
          closeModal(); 
      } catch (error) {
          console.error('Error signing up:', error.response?.data || error.message);
          toast.error('Error signing up, please try again.');
      }
  };

   return (trigger) ? (
   <div className="popup-overlay">
     <div className='s-popup'> 
   <div className="signup-container">
      <div className="suTop">
        <span className="close-btn" onClick={closeModal}><FontAwesomeIcon icon={faChevronLeft} /></span>
        <h2 className="su">Let's get you started</h2>

      </div>
        <form className="signup" onSubmit={handleSignup}>
          <label className='su-label'>Full Name</label>
            <input type="text" 
              required
              onChange={ (e) => setFullName(e.target.value) }
              placeholder="Bob Smith"/>
          <label className='su-label'>Email</label>
            <input type="email"
              required
              onChange={ (e) => setEmail(e.target.value) }
              placeholder="bob@gmail.com"/>
          <label className='su-label'>Phone Number</label>
          <div className="phone">
          <img src={flag} alt="iphone" className="flag-img" />
            <input type="tel"
               pattern="^01[0-9]{9}$" 
               onChange={ (e) => setPhone(e.target.value) }
              required
              placeholder="01#########"/>
          </div>
          <label className='su-label'>Password</label>
            <input type="password"
              onChange={ (e) => setPassword(e.target.value) }
              required
              placeholder="******"/>
          <label className='su-label'>Confirm Password</label>
            <input type="password"
              onChange={ (e) => setConfirmPassword(e.target.value) }
              required
              placeholder="******"/>

            <button className="signup-btn2" type="submit">create account</button>
        </form>
         <div className="su-bottom">
          <p className="bottom-q"> already a user?</p>
          <p className="signin-link">Signin</p>
          </div>
    </div>
   </div>
   <ToastContainer/>
   </div>
  
   ):"";
}

export default Signup;