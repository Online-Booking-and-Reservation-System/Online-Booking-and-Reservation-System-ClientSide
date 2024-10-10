import './Reservation.css';

function Reservation() {
    return (
        <div className="reservation-container">
            <table className="reservation-table">
                <thead>
                    <tr>
                        <th>Restaurant Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Restaurant A</td>
                        <td>2024-10-10</td>
                        <td>7:00 PM</td>
                        <td>unpayed</td>
                    </tr>
                    <tr>
                        <td>Restaurant B</td>
                        <td>2024-10-12</td>
                        <td>6:30 PM</td>
                        <td>payed</td>
                    </tr>
                 
                </tbody>
            </table>
        </div>
    );
}

export default Reservation;
