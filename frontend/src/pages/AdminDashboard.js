import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const bookingRes = await axios.get('http://localhost:5000/api/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const driverRes = await axios.get('http://localhost:5000/api/drivers', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(bookingRes.data);
    setDrivers(driverRes.data.filter(d => d.status === 'available'));
  };

  const assignDriver = async (bookingId, driverId) => {
    await axios.put(`http://localhost:5000/api/bookings/${bookingId}/assign`, { driverId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData(); // refresh after assignment
  };

  return (
    <div>
      <h2>Admin Dashboard – Assign Drivers</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            {booking.pickupLocation} → {booking.dropLocation} @ {new Date(booking.datetime).toLocaleString()} — Status: {booking.status}
            {booking.status === 'pending' && (
              <select onChange={e => assignDriver(booking._id, e.target.value)}>
                <option>Assign Driver</option>
                {drivers.map(driver => (
                  <option key={driver._id} value={driver._id}>
                    {driver.name} ({driver.phone})
                  </option>
                ))}
              </select>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
