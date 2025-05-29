import React from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const roomType = params.get('roomType');
  const dates = params.get('dates');
  const guests = params.get('guests');

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12 }}>
      <h1>Booking Details</h1>
      <p><strong>Room Type:</strong> {roomType || 'Not selected'}</p>
      <p><strong>Dates:</strong> {dates || 'Not selected'}</p>
      <p><strong>Number of Pets:</strong> {guests || 'Not specified'}</p>
      {/* You can add a booking form or confirmation button here */}
    </div>
  );
};

export default Booking;