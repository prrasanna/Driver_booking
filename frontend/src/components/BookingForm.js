import React, { useState, useContext } from 'react';
import { createBooking, getBookings } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function BookingForm({ refresh }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [datetime, setDatetime] = useState('');
  const { token } = useContext(AuthContext);

  const submit = async e => {
    e.preventDefault();
    await createBooking(token, { pickupLocation: pickup, dropLocation: drop, datetime });
    refresh();
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Pickup" value={pickup} onChange={e=>setPickup(e.target.value)} />
      <input placeholder="Drop" value={drop} onChange={e=>setDrop(e.target.value)} />
      <input type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} />
      <button type="submit">Book Driver</button>
    </form>
  );
}
