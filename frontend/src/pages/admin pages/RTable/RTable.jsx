import React, { useState, useEffect } from 'react';
import './RTable.css';
import { MdTableBar } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function RTable() {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

    useEffect(() => {
        // Fetch reservations (from API or static data)
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const data = [
            { name: 'James Wong', date: '2024-10-15', time: '12:00 PM', tables: 3 },
            { name: 'Bob Smith', date: '2024-10-11', time: '11:00 AM', tables: 2 },
            { name: 'Alice', date: '2024-10-20', time: '10:00 PM', tables: 1 },
        ];
        setReservations(data);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        const filtered = reservations.filter(reservation => reservation.date === date);
        setFilteredReservations(filtered);
    };

    // get reservations for a specific time slot
    const getReservationsForTimeSlot = (time) => {
        return filteredReservations.filter(reservation => reservation.time === time);
    };

    const handleReserveTable = (time) => {
        console.log(`Reserve table clicked for time: ${time} on date: ${selectedDate}`);
        // next reservation popup
    };

    // clear reservation
    const handleClearReservation = (reservationToClear) => {
        setReservations((prevReservations) =>
            prevReservations.filter(reservation => reservation !== reservationToClear)
        );

        // update filtered reservations if the selected date matches
        if (selectedDate) {
            setFilteredReservations((prevFiltered) =>
                prevFiltered.filter(reservation => reservation !== reservationToClear)
            );
        }
    };

    return (
        <div className="rtable-container">
            <div className="date-filter">
                <label htmlFor="reservation-date">Select Date: </label>
                <input
                    type="date"
                    className='date-input'
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
                                                <p>{reservation.name}</p>
                                                <div className="reservation-details">
                                                    <p><MdTableBar className='table-icon' />: {reservation.tables}</p>
                                                    <button 
                                                       className="check-btn"
                                                       onClick={() => handleClearReservation(reservation)}>
                                                          <FaCheck className='check-icon'/>
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
