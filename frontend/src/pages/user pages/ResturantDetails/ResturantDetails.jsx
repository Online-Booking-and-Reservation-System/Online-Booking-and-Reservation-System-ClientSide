import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faClose, faInfoCircle, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReturantDetails.css';
import ReservationPopup from '../../../components/shared components/ReservationPopup/ReservationPopup';
import Loader from '../../../components/shared components/Loader/Loader';

 function ResturantDetails(){
    const [restaurantDetails,setRestaurantDetails]=useState([]);
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const[showPopup, setPopup]=useState(false);
   
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
        } catch (error) {
            console.error('Error fetching restaurant details:', error.response.data);
        }
    }
    getRestaurantDetails();
}, [id]);
    
    return(
     
        <>
           {!restaurantDetails || restaurantDetails.length === 0 ? (
            <Loader/>
        ):( 
        <div className='container'>
            <div className='restaurants-window-Details'>
            <h2 onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}  className='backHeader'>
               
               <FontAwesomeIcon icon={faArrowLeft}  className='backIcon'/> Go Back
               </h2 > 
               
               <p className='line'></p>
            
               <div className='resturantImg'>
                   {restaurantDetails && restaurantDetails.imgUrl ? (
                      <img src={`http://localhost:3000/${restaurantDetails.imgUrl}`} alt={restaurantDetails.restaurantName} />
                 ) : (
                     <p>No image available</p>
                    )}
</div>

  
                 <h2 className='resturantName'>{restaurantDetails.restaurantName}</h2>
                 <p className='line'></p>


                <div className='details'>
                   <p> <FontAwesomeIcon icon={faLocationPin} className='icon'/> {restaurantDetails.fullAddress}</p>

                   <p> <FontAwesomeIcon icon={faClock} className='icon'/>Open Hours:<span> {restaurantDetails.openTime}:00</span> AM - <span>{restaurantDetails.closeTime}:00</span> PM</p>

                <div className='resturantDescription'>
                  <p> <FontAwesomeIcon icon={faInfoCircle} className='icon'/>{restaurantDetails.description}</p>

                  </div>
                  <button onClick={()=>setPopup(true)} >Book Now</button>
                  </div>
               

            </div>
           
           </div>
)}


{showPopup&&(
    <ReservationPopup  
    showPopup={showPopup}
    setPopup={setPopup}
    restaurantDetails={restaurantDetails}/>
)

}
            
        </>

    );
}

export default ResturantDetails;