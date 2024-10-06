import './Signup.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import flag from '../../../public/Flag_of_Egypt.svg.png';

function Signup({ trigger, closeModal }) {
   return (trigger) ? (
   <div className="popup-overlay">
     <div className='s-popup'> 
   <div className="signup-container">
      <div className="suTop">
        <span className="close-btn" onClick={closeModal}><FontAwesomeIcon icon={faChevronLeft} /></span>
        <h2 className="su">Let's get you started</h2>

      </div>
        <form className="signup">
          <label className='su-label'>Full Name</label>
            <input type="text" 
              required
              placeholder="Bob Smith"/>
          <label className='su-label'>Email</label>
            <input type="email"
              required
              placeholder="bob@gmail.com"/>
          <label className='su-label'>Phone Number</label>
          <div className="phone">
          <img src={flag} alt="iphone" className="flag-img" />
            <input type="tel"
               pattern="^01[0-9]{9}$" 
              required
              placeholder="01#########"/>
          </div>
          <label className='su-label'>Password</label>
            <input type="password"
              required
              placeholder="******"/>
          <label className='su-label'>Confirm Password</label>
            <input type="password"
              required
              placeholder="******"/>

            <button className="signup-btn2">create account</button>
        </form>
         <div className="su-bottom">
          <p className="bottom-q"> already a user?</p>
          <p className="signin-link">Signin</p>
          </div>
    </div>
   </div>
   </div>
  
   ):"";
}

export default Signup;