import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReturantDetails.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

 function ResturantDetails(){
    const [restaurantDetails,setRestaurantDetails]=useState(null);
    const { id } = useParams(); 
   
useEffect(()=>{
    async function getRestaurantDetails() {
        try {
            const res = await axios.get(`http://localhost:3000/api/resturants/${id}`);
            setRestaurantDetails(res.data.data.resturants)
        } catch (error) {
            
        }
    }
    getRestaurantDetails();
},[id]);

    return(
        <>
           <div className='container'>
             <div className='.restaurants-window-Details'></div>
             <h2><FontAwesomeIcon icon="fa-solid fa-arrow-left" />Go Back</h2> 
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