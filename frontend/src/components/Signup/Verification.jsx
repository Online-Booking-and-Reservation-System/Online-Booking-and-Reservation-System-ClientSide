import React, { useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import './Verification.css';

function Verification({ token, closeVerification }) {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [verificationMessage, setVerificationMessage] = useState('');

    // Check token expiration
    // const isTokenExpired = (token) => {
    //     try {
    //         const decodedToken = JSON.parse(atob(token.split('.')[1])); 
    //         const now = Math.floor(Date.now() / 1000); 
    //         console.log("Decoded Token:", decodedToken); 
    //         console.log("Current Time:", now, "Token Expiry Time:", decodedToken.exp); 
    //         return decodedToken.exp < now;
    //     } catch (error) {
    //         console.error("Error decoding token:", error); 
    //         return true; 
    //     }
    // };

    const handleVerification = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve token
        
        // if (isTokenExpired(token)) {
        //     console.log("Token has expired.");
        //     alert("Your verification token has expired. Please request a new one.");
        //     return;
        // }
        if (!token) {
            setVerificationMessage('No token found. Please sign up again.');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/verify',
                { verificationCode },
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            console.log('Verification response:', response); 
            setVerificationMessage('Verification successful!'); 
            closeVerification();
        } catch (error) {
            setVerificationMessage(error.response.data.message || 'Verification failed!');
            console.error('Verification error:', error.response?.data || error.message);
            if (error.response?.data?.message === 'Verification code has expired') {
                    setError('Verification code has expired. Please request a new one.');
            } else {
                setError('Invalid verification code or other issue. Please try again.');
            }
        }
    };

    return (
        <div className="popup-overlay">
            <div className='s-popup'>
                <div className="verification-container">
                    <div className="v-top">
                    <h2>Verify Your Account</h2>
                    <button className="v-close" onClick={closeVerification}>
                        <IoClose />
                    </button>
                    </div>
                    <form>
                        <label>Verification Code</label>
                        <input 
                            type="text" 
                            required 
                            value={verificationCode} 
                            onChange={(e) => setVerificationCode(e.target.value)} 
                            placeholder="Enter your verification code" 
                        />
                        <button className='verify-btn' onClick={handleVerification}>Verify</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Verification;
