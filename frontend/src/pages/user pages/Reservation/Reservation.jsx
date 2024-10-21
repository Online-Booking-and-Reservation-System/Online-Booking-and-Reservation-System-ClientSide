import './Reservation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../components/shared components/Loader/Loader';

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const customerName = localStorage.getItem('name'); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token'); 
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
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="reservation-container">
            <div className="r-inner-container">
                {loading ? (
                    <Loader /> 
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
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
                )}
            </div>
        </div>
    );
}

export default Reservation;

