import './RList.css';

function RList() {
    return (
        <div className="rtable-container">
            <h1>Reservations Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Number of Guests</th>
                        <th>Number of Tables</th>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>Restaurant Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alice</td>
                        <td>0123456789</td>
                        <td>2</td>
                        <td>1</td>
                        <td>2024-10-15</td>
                        <td>18:30</td>
                        <td>Pizza Place</td>
                    </tr>
                    <tr>
                        <td>Bob</td>
                        <td>0123456780</td>
                        <td>4</td>
                        <td>2</td>
                        <td>2024-10-16</td>
                        <td>19:00</td>
                        <td>Burger Joint</td>
                    </tr>
                    <tr>
                        <td>Charlie</td>
                        <td>0123456781</td>
                        <td>3</td>
                        <td>1</td>
                        <td>2024-10-17</td>
                        <td>20:00</td>
                        <td>Sushi World</td>
                    </tr>
                </tbody>
            </table>
        </div>);
}

export default RList;