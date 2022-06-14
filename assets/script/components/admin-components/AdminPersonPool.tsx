import React from 'react';
import PersonPool from '../pools/PersonPool';

export default function AdminPersonPool() {
  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff' }}>
        <h2>Alle personen</h2>
        <p>Dit zijn de in het financieel systeem gezette personen. Klik op importeer om de huidige persoonsdata van profile op te halen.</p>
        <div className="table">
          <PersonPool />
        </div>
      </div>
      <br />
    </div>
  );
}
