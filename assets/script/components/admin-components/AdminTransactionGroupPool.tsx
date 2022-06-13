import React from 'react';
import TransactionGroupPool from '../pools/TransactionGroupPool';

export default function AdminTransactionGroupPool() {
  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h2>Alle transacties</h2>
        <p>Deze transactie zijn per post (activiteit) verzamelt.</p>
        <div className="table">
          <TransactionGroupPool />
        </div>
      </div>
      <br />
    </div>
  );
}
