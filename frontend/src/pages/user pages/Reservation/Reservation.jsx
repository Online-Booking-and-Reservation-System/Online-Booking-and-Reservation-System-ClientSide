// import './Reservation.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function Reservation() {
//     const [reservations, setReservations] = useState([]);
//     const [error, setError] = useState('');
//     const fetchUserReservations = async () => {
//         const token = localStorage.getItem('token'); // Get the token from local storage
//         const userId = localStorage.getItem('id'); // Assuming you stored the user ID in local storage

//         try {
//             const response = await axios.get(`http://localhost:3000/api/users/${userId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Add your token handling here
//                 },
//             });
//              console.log(response);
             
//             // Assuming the user object has a reservations property
//             setReservations(response.data.data.user.reservations || []);
//             console.log(reservations);
            
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setError('Error fetching reservations');
//         }
//     };

//     useEffect(() => {
//         fetchUserReservations();
//     }, []);

//     return (
//         <div className="reservation-container">
//             {error && <p className="error">{error}</p>}
//             <table className="reservation-table">
//                 <thead>
//                     <tr>
//                         <th>Restaurant Name</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Payment Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {reservations.length > 0 ? (
//                         reservations.map((reservation) => (
//                             <tr key={reservation._id}>
//                                 <td>{reservation.resturantName}</td>
//                                 <td>{reservation.reservationDate}</td>
//                                 <td>{reservation.reservationTime}</td>
//                                 <td>{reservation.paymentStatus}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No reservations found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Reservation;

import './Reservation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const customerName = localStorage.getItem('name'); 

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust token retrieval if needed
            const response = await axios.get(`http://localhost:3000/api/reservation/customer`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setReservations(response.data);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error.response ? error.response.data : error.message);
            setError('Error fetching reservations. Please try again later.');
        }
    };

    return (
        <div className="reservation-container">
            <div className="r-inner-container">
            {error && <p className="error">{error}</p>}
            <table className="reservation-table">
                <thead>
                    <tr className='r-header-row'>
                        <th>Restaurant Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td>{reservation.resturantName}</td>
                                <td>{reservation.reservationDate}</td>
                                <td>{reservation.reservationTime}</td>
                                <td>{reservation.paymentStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No reservations found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
           
        </div>
    );
}

export default Reservation;

