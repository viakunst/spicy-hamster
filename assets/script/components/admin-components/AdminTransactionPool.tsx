import React from 'react';
import TransactionPool from '../pools/TransactionPool';

export default function AdminTransactionPool() {
  return (
    <div className="admin card row">
      <h2>Alle transacties van vk.</h2>
      <div className="table">
        <TransactionPool />
      </div>
      <br />
    </div>
  );
}
