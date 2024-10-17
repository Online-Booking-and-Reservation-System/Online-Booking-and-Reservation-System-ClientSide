import './Signup.css';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import flag from '../../../public/Flag_of_Egypt.svg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verification from './Verification';

function Signup({ trigger, closeModal, openSigninPopup }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showVerification, setShowVerification] = useState(false);
    const [token, setToken] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                fullName,
                email,
                phoneNumber,
                password,
            });
            console.log('Signup response:', response.data);
            const token = response.data.data; 
            console.log('Token:', token);
            setToken(token); 
            // const role = decodedToken.role; // Extract the role from the token
            // console.log('Role:', role);
            localStorage.setItem('token', token);
            // localStorage.setItem('role', role); 
            setShowVerification(true);
            closeModal(); 
            toast.success('Check your email for the verification code.');
        } catch (error) {
            console.error('Error signing up:', error.response?.data || error.message);
            toast.error('Error signing up, please try again.');
        }
    };
    
    

    return (
        <>
            {trigger ? (
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
                                    value={fullName}  
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Bob Smith" />
                                <label className='su-label'>Email</label>
                                <input type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="bob@gmail.com" />
                                <label className='su-label'>Phone Number</label>
                                <div className="phone">
                                    <img src={flag} alt="iphone" className="flag-img" />
                                    <input type="tel"
                                        value={phoneNumber}
                                        pattern="^01[0-9]{9}$"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                        placeholder="01#########" />
                                </div>
                                <label className='su-label'>Password</label>
                                <input type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="******" />
                                <label className='su-label'>Confirm Password</label>
                                <input type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="******" />
                                <button className="signup-btn2" type="submit">Create Account</button>
                            </form>
                            <div className="su-bottom">
                                <p className="bottom-q">Already a user?</p>
                                <p className="signin-link" 
                                   onClick={() => {
                                    closeModal();        // Close Signup popup
                                    openSigninPopup();   // Open Signin popup
                                }}>
                                    Signin
                                </p>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            ) : null}

            {showVerification && <Verification token={token} closeVerification={() => setShowVerification(false)} />}
        </>
    );
}

export default Signup;
