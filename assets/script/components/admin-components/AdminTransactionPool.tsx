import React from 'react';
import TransactionPool from '../pools/TransactionPool';

export default function AdminTransactionPool() {
  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff' }}>
        <h2>Alle transacties</h2>
        <p>Dit zijn alle transacties los van elkaar.</p>
        <div className="table">
          <TransactionPool />
        </div>
      </div>
      <br />
    </div>
  );
}
