import React from 'react';

const Terms = () => (
  <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem' }}>
    <h1>Terms and Conditions</h1>
    <p>
      Welcome to Hotel Mascotas Nobles. By using our website and services, you agree to the following terms and conditions.
    </p>
    <h2>Reservations</h2>
    <ul>
      <li>All reservations are subject to availability and confirmation.</li>
      <li>Payment must be made in accordance with our policies.</li>
      <li>Changes or cancellations may be subject to fees.</li>
    </ul>
    <h2>Pet Care</h2>
    <ul>
      <li>All pets must have up-to-date vaccinations and health records.</li>
      <li>We reserve the right to refuse service to pets that pose a risk to others.</li>
      <li>Owners are responsible for providing accurate information about their pets.</li>
    </ul>
    <h2>Liability</h2>
    <ul>
      <li>We are not responsible for loss or damage to personal belongings.</li>
      <li>Our liability for any incident is limited to the amount paid for the service.</li>
    </ul>
    <p style={{ marginTop: '2rem', color: '#888' }}>
      Last updated: May 2025
    </p>
  </div>
);

export default Terms;
