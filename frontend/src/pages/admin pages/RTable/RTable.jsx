import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RTable.css';
import { MdTableBar } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Loader from '../../../components/shared components/Loader/Loader';
import ReservationPopup from '../../../components/shared components/ReservationPopup/ReservationPopup';

function RTable() {
    const [reservations, setReservations] = useState([]); // All reservations
    const [filteredReservations, setFilteredReservations] = useState([]); // Reservations to display
    const [selectedDate, setSelectedDate] = useState(''); // Selected date
    const [popupVisible, setPopupVisible] = useState(false); // Popup visibility state
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [loading, setLoading] = useState(true);
    const restaurantName = 'Italian Bistro'; // Update this with the actual restaurant name

    const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    useEffect(() => {
        // Fetch reservations from the API when component mounts
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust based on where you store the token
            const response = await axios.get(`http://localhost:3000/api/reservation/reservation/resturant`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send the token in the Authorization header
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
            setLoading(false); // Set loading to false when data is fetched or an error occurs
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        // Filter reservations based on selected date
        const filtered = reservations.filter(reservation => 
            reservation.reservationDate && reservation.reservationDate.slice(0, 10) === date
        );

        // Update filtered reservations only if a date is selected
        if (date) {
            setFilteredReservations(filtered);
        } else {
            setFilteredReservations([]); // Clear the filtered reservations if no date is selected
        }
    };

    const getReservationsForTimeSlot = (time) => {
        return filteredReservations.filter(reservation => 
            reservation.reservationTime === time
        );
    };

    const handleReserveTable = (time) => {
        console.log(`Reserve table clicked for time: ${time} on date: ${selectedDate}`);
        setSelectedTimeSlot(time); // Set the selected time slot
        setPopupVisible(true); // Show the popup
     };

    const handleClearReservation = async (reservationToClear) => {
        try {
            // Send a DELETE request to the server to delete the reservation
            await axios.delete(`http://localhost:3000/api/reservation/${reservationToClear._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the request headers
                }
            });
    
            // Update the state to remove the deleted reservation from the lists
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
                <Loader /> // Show the loader while data is being fetched
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