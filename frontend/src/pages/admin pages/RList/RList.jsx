import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RList.css'; // Add corresponding CSS for styling

function RList() {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const restaurantName = localStorage.getItem('restaurantName'); // Replace with the actual restaurant name or get it from user context

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust token retrieval if needed
            const response = await axios.get(`http://localhost:3000/api/reservation/reservation/resturant`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setReservations(response.data);
                setFilteredReservations(response.data);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error.response ? error.response.data : error.message);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter reservations by customer name
        const filtered = reservations.filter((reservation) =>
            reservation.customerName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredReservations(filtered);
    };

    return (
        <>
         <div className="search-filter">
                    <label className='search-r' htmlFor="customer-search">Search reservations: </label>
                    <input
                        type="text"
                        id="customer-search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Enter customer name"
                    />
                </div>
            <div className="rlist-container">
            <div className="rlist-inner-container">
                <table className="rlist-table">
                    <thead className="rlist-thead">
                        <tr className="rlist-header-row">
                            <th className="rlist-header">Number&nbsp;of&nbsp;Guests</th>
                            <th className="rlist-header">Number&nbsp;of&nbsp;Tables</th>
                            <th className="rlist-header">Reservation&nbsp;Date</th>
                            <th className="rlist-header">Reservation&nbsp;Time</th>
                            <th className="rlist-header">Restaurant&nbsp;Name</th>
                            <th className="rlist-header">Phone&nbsp;Number</th>
                            <th className="rlist-header">Customer&nbsp;Name</th>
                        </tr>
                    </thead>
                    <tbody className="rlist-tbody">
                        {filteredReservations.length > 0 ? (
                            filteredReservations.map((reservation, index) => (
                                <tr key={index} className="rlist-row">
                                    <td className="rlist-data">{reservation.numberOfGusts}</td>
                                    <td className="rlist-data">{reservation.numberOfTables}</td>
                                    <td className="rlist-data">{reservation.reservationDate}</td>
                                    <td className="rlist-data">{reservation.reservationTime}</td>
                                    <td className="rlist-data">{reservation.resturantName}</td>
                                    <td className="rlist-data">{reservation.phoneNumber}</td>
                                    <td className="rlist-data">{reservation.customerName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="rlist-no-data">No reservations found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>


        
        </>
    );
};

export default RList;
