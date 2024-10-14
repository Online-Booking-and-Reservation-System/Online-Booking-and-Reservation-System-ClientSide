import React, { useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";

import './Verification.css';

function Verification({ token, closeVerification }) {
    const [verificationCode, setVerificationCode] = useState("");

    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            console.log('Verification Code:', verificationCode);
            const response = await axios.post('http://localhost:3000/api/auth/verify', {
                verificationCode: verificationCode 
            },{
                headers: {
                    Authorization: `Bearer ${token}` // Send token in Authorization header
                }
        });
        console.log('Verification response:', response.data);  
        closeVerification();
        } catch (error) {
            console.error('Verification error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="popup-overlay">
            <div className='s-popup'>
                <div className="verification-container">
                    <div className="v-top">
                    <h2>Verify Your Account</h2>

                       <button className="v-close" 
                          onClick={closeVerification}>
                             <IoClose />
                        </button>
                    </div>
                    <form onSubmit={handleVerification}>
                        <label>Verification Code</label>
                        <input 
                            type="text" 
                            required 
                            value={verificationCode} 
                            onChange={(e) => setVerificationCode(e.target.value)} 
                            placeholder="Enter your verification code" 
                        />
                        <button className='verify-btn' type="submit">Verify</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Verification;
