import React from 'react';
import TransactionGroupPool from '../pools/TransactionGroupPool';

export default function AdminTransactionGroupPool() {
  return (
    <div className="admin card row">
      <h2>Alle transactiesgroepen van vk.</h2>
      <div className="table">
        <TransactionGroupPool />
      </div>
      <br />
    </div>
  );
}
