import React from 'react';
import MailPool from '../pools/MailPool';

export default function AdminMailPool() {
  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff' }}>
        <h2>Verzonden emails</h2>
        <p>Dit zijn door financieel systeem verstuurde emails.</p>
        <div className="table">
          <MailPool />
        </div>
        <br />
      </div>
    </div>
  );
}
