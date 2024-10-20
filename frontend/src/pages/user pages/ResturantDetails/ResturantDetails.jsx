import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faClose, faInfoCircle, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReturantDetails.css';
import ReservationPopup from '../../../components/shared components/ReservationPopup/ReservationPopup';

 function ResturantDetails(){
    const [restaurantDetails,setRestaurantDetails]=useState(null);
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
            // console.log(res);
        } catch (error) {
            console.error('Error fetching restaurant details:', error.response.data);
        }
    }
    getRestaurantDetails();
}, [id]);
    
if (!restaurantDetails) {

    return <p >Loading......</p>; 
}
    return(
        <>
           <div className='container'>
             <div className='restaurants-window-Details'>
             <h2 onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}  className='backHeader'>
                
                <FontAwesomeIcon icon={faArrowLeft}  className='backIcon'/> Go Back
                </h2 > 
                <button onClick={()=>setPopup(true)} >Book Now</button>
                <p className='line'></p>
                <div className='resturantImg'>
                <img src={restaurantDetails.imgUrl}></img>

                </div>
   
                  <h2 className='resturantName'>{restaurantDetails.restaurantName}</h2>
                  <p className='line'></p>


                 <div className='details'>
                    <p> <FontAwesomeIcon icon={faLocationPin} className='icon'/> {restaurantDetails.fullAddress}</p>

                    <p> <FontAwesomeIcon icon={faClock} className='icon'/>Open Hours:<span> {restaurantDetails.openTime}:00</span> AM - <span>{restaurantDetails.closeTime}:00</span> PM</p>

                 <div className='resturantDescription'>
                   <p> <FontAwesomeIcon icon={faInfoCircle} className='icon'/>{restaurantDetails.description}</p>

                   </div>

                   </div>
                  <h5>Available Time Slots</h5>                   

                   <div className="time-slots">
                      <div className="slot">10:30 AM</div>
                      <div className="slot active">10:45 PM</div>
                      <div className="slot">11:30 AM</div>
                      <div className="slot">11:45 AM</div>
                      <div className="slot active">12:00 PM</div>
                      <div className="slot active">01:30 PM</div>
                      <div className="slot">02:30 PM</div>
                      <div className="slot active">02:45 PM</div>
                   </div>

             </div>
            
            </div>


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