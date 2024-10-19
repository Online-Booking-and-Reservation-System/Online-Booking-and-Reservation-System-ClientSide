import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './ReturantDetails.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

 function ResturantDetails(){
    const [restaurantDetails,setRestaurantDetails]=useState(null);
    const { id } = useParams(); 
    const navigate = useNavigate(); 
   
useEffect(()=>{
    async function getRestaurantDetails() {
        try {
            const token = localStorage.getItem('token'); 
            const res = await axios.get(`http://localhost:3000/api/resturants/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setRestaurantDetails(res.data.data.resturant);
            // console.log(res);
        } catch (error) {
            console.error('Error fetching restaurant details:', error.response.data);
        }
    }
    getRestaurantDetails();
}, [id]);
    
if (!restaurantDetails) {
    return <p>Loading...</p>; 
}

    return(
        <>
           <div className='container'>
             <div className='.restaurants-window-Details'></div>
             <h2><FontAwesomeIcon icon={faArrowLeft}/>Go Back</h2> 
              <img src={restaurantDetails.imgUrl} alt={restaurantDetails.restaurantName}></img>

               <h2>{restaurantDetails.restaurantName}</h2>
              <p>{restaurantDetails.fullAddress}</p>
              <p>Open Hours: {restaurantDetails.openTime}:00 - {restaurantDetails.closeTime}:00</p>
              <p>{restaurantDetails.description}</p>
            </div>
        </>

    );
}

export default ResturantDetails;