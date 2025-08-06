import React, { useContext, useEffect, useState } from 'react';
import { getBookings } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function BookingList() {
  const { token } = useContext(AuthContext);
  const [list, setList] = useState([]);

  const fetch = async () => {
    const res = await getBookings(token);
    setList(res.data);
  };

  useEffect(() => { fetch(); }, []);
  return (
    <ul>
      {list.map(b => (
        <li key={b._id}>
          {b.pickupLocation} → {b.dropLocation} at {new Date(b.datetime).toLocaleString()} — {b.status}
          {b.driver && ` | Driver: ${b.driver.name}`}
        </li>
      ))}
    </ul>
  );
}
