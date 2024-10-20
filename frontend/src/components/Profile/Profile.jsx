import './Profile.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Profile(){

    const token = localStorage.getItem('token')
    const id =  localStorage.getItem('id')

    const [user, setUser] = useState({})
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(()=>{
		async function getUser(){
			try{
				const res= await axios.get(`http://localhost:3000/api/users/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
				setUser(res.data.data.user)
			}
			catch(err){}
		}
		getUser();
	},[]);

    useEffect(()=>{
        if (user){
            setFullName(user.fullName)
            setPhoneNumber(user.phoneNumber)
        }
    },[user])

    async function updateProfile(e){
        e.preventDefault();
        try{
            const res= await axios.patch(`http://localhost:3000/api/users/${id}`,{
                fullName,
                phoneNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200){
                toast.success('Profile Updated Successfully.')
            }
        }
        catch(err){
            toast.error('Failed to Update Profile.')
        }
    }

    
    async function deleteUser(e){
        e.preventDefault();
        try{
            const res= await axios.delete(`http://localhost:3000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200){
                toast.success('Account Deleted Successfully.')
            }
        }
        catch(err){
            console.error(err.message)
            toast.error('Failed to Delete Your Account.')
        }
    }

    return(
        <>
            <div className='profile-container'>
            <form className='profile-form' onSubmit={updateProfile}>
                <h1>Personal Information</h1>
                <label htmlFor='fullName'>Full Name:</label>
                <input type='text' name='fullName' id='fullName' value={fullName || ''}
                onChange={(e)=> setFullName(e.target.value)} required></input>

                
                <label htmlFor='phoneNumber'>Phone Number:</label>
                <input type='text' name='phoneNumber' id='phoneNumber' value={phoneNumber || ''}
                onChange={(e)=> setPhoneNumber(e.target.value)} required></input>

                <label htmlFor='email'>Email Address:</label>
                <p className='static'>{user.email}</p>
                
                <label htmlFor='role'>Role:</label>
                <p className='static'>{user.role}</p>
                <div>
                    <button type='submit' className='profile-submit' >Save Changes</button>
                    <button className='profile-delete' onClick={deleteUser}>Delete Account</button>
                </div>
            </form>
            </div>
        </>
    )
}

export default Profile;