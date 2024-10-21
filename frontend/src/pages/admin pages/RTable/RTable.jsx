import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RTable.css';
import { MdTableBar } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Loader from '../../../components/shared components/Loader/Loader';
import ReservationPopup from '../../../components/shared components/ReservationPopup/ReservationPopup';

function RTable() {
    const [reservations, setReservations] = useState([]); 
    const [filteredReservations, setFilteredReservations] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(''); 
    const [popupVisible, setPopupVisible] = useState(false); 
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [loading, setLoading] = useState(true);
    const restaurantName = 'Italian Bistro'; 

    const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/api/reservation/reservation/resturant`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data && response.data.length > 0) {
                setReservations(response.data);
            } else {
                throw new Error('No reservations found');
            }
        } catch (error) {
            console.error('Error fetching reservations:', error.response ? error.response.data : error.message);
        }finally {
            setLoading(false); 
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        const filtered = reservations.filter(reservation => 
            reservation.reservationDate && reservation.reservationDate.slice(0, 10) === date
        );

        if (date) {
            setFilteredReservations(filtered);
        } else {
            setFilteredReservations([]); 
        }
    };

    const getReservationsForTimeSlot = (time) => {
        return filteredReservations.filter(reservation => 
            reservation.reservationTime === time
        );
    };

    const handleReserveTable = (time) => {
        console.log(`Reserve table clicked for time: ${time} on date: ${selectedDate}`);
        setSelectedTimeSlot(time); 
        setPopupVisible(true); 
     };

    const handleClearReservation = async (reservationToClear) => {
        try {
            await axios.delete(`http://localhost:3000/api/reservation/${reservationToClear._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
            });
    
            setReservations(prevReservations =>
                prevReservations.filter(reservation => reservation._id !== reservationToClear._id)
            );
            setFilteredReservations(prevFiltered =>
                prevFiltered.filter(reservation => reservation._id !== reservationToClear._id)
            );
            toast.success('reservation cleared!');
            console.log(`Reservation with ID ${reservationToClear._id} has been deleted.`);
        } catch (error) {
            console.error('Error deleting reservation:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="r-t-container"> 
            <div className="date-filter">
                <label className='date-select' htmlFor="reservation-date">Select Date: </label>
                <input
                    type="date"
                    className="date-input"
                    id="reservation-date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            {loading ? (
                <Loader /> 
            ) : (
                <div className="rtable-container">
                    <div className="reservation-table">
                        <table className='rtable-t'>
                            <thead>
                                <tr>
                                    {timeSlots.map((timeSlot, index) => (
                                        <th key={index} className="rtable-header">{timeSlot}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {timeSlots.map((timeSlot, index) => (
                                        <td key={index} className="rtable-cell">
                                            {getReservationsForTimeSlot(timeSlot).length > 0 ? (
                                                getReservationsForTimeSlot(timeSlot).map((reservation, idx) => (
                                                    <div key={idx} className="reservation-item">
                                                        <p>{reservation.customerName}</p>
                                                        <div className="reservation-details">
                                                            <p><MdTableBar className="table-icon" />: {reservation.numberOfTables}</p>
                                                            <button 
                                                                className="check-btn"
                                                                onClick={() => handleClearReservation(reservation)}
                                                            >
                                                                <FaCheck className="check-icon" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No Reservations</p>
                                            )}
                                            <button
                                                className="reserve-btn"
                                                onClick={() => handleReserveTable(timeSlot)}
                                            >
                                                Reserve Table
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {popupVisible && (
                <ReservationPopup 
                    showPopup={popupVisible}
                    setPopup={setPopupVisible} 
                    restaurantDetails={{ restaurantName }}
                    selectedTimeSlot={selectedTimeSlot}
                    selectedDate={selectedDate}
                />
            )}
        </div>
    );
}

export default RTable;