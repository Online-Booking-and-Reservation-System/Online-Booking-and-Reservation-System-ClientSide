// AuthProvider.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (fullName, email, phoneNumber, password) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/auth/register', { fullName, email, phoneNumber, password });
            const { token } = response.data.data; 
            localStorage.setItem("token", token);
            setIsAuthenticated(true);
            setRole('user'); 
            localStorage.setItem('role', 'user');
        } catch (err) {
            console.error('Signup error:', error);
            setError(err.response.data.message); 
        } finally {
            setLoading(false);
        }
    };

    const verifyUser = async (verificationCode) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/auth/verify', { verificationCode });
            const { token } = response.data;
            localStorage.setItem("token", token);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.response.data.message); 
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setRole('user');
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signup, verifyUser, logout, role, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}
