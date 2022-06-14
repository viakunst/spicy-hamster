import React from 'react';
import BankAccountPool from '../pools/BankAccountPool';

export default function AdminBankAccountPool() {
  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff' }}>
        <h2>Alle bankrekeningen</h2>
        <p>Dit zijn de in het financieel systeem gezette bankrekeningen.</p>
        <div className="table">
          <BankAccountPool />
        </div>
      </div>
      <br />
    </div>
  );
}
