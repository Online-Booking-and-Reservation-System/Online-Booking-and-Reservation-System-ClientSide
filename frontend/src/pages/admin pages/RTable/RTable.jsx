import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RTable.css';
import { MdTableBar } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function RTable() {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const restaurantName = 'Italian Bistro'; // Update this with the actual restaurant name

    const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    useEffect(() => {
        // Fetch reservations from the API when component mounts
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust based on where you store the token
            const response = await axios.get(`http://localhost:3000/api/reservation/resturant/${encodeURIComponent(restaurantName)}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            if (response.data && response.data.length > 0) {
                setReservations(response.data);
                setFilteredReservations(response.data);
            } else {
                throw new Error('No reservations found');
            }
        } catch (error) {
            console.error('Error fetching reservations:', error.response ? error.response.data : error.message);
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        // Filter reservations based on selected date
        const filtered = reservations.filter(reservation => 
            reservation.reservationDate && reservation.reservationDate.slice(0, 10) === date
        );
        setFilteredReservations(filtered);
        // console.log(filtered);

        
    };

    const getReservationsForTimeSlot = (time) => {
        return filteredReservations.filter(reservation => 
            reservation.reservationTime === time
        );
    };

    const handleReserveTable = (time) => {
        console.log(`Reserve table clicked for time: ${time} on date: ${selectedDate}`);
        // Handle table reservation logic
    };

    const handleClearReservation = (reservationToClear) => {
        // Simulate marking a reservation as done by removing it from the list
        setReservations(prevReservations =>
            prevReservations.filter(reservation => reservation._id !== reservationToClear._id)
        );
        setFilteredReservations(prevFiltered =>
            prevFiltered.filter(reservation => reservation._id !== reservationToClear._id)
        );
    };

    return (
        <div className="rtable-container">
            <div className="date-filter">
                <label htmlFor="reservation-date">Select Date: </label>
                <input
                    type="date"
                    className="date-input"
                    id="reservation-date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className="reservation-table">
                <table>
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
    );
}

export default RTable;
