import React from 'react';
import TransactionPool from '../pools/TransactionPool';

export default function UserTransactionPool() {
  return (
    <div className="admin card row">
      <h2>Transacties van persoon.</h2>
      <div className="table">
        <TransactionPool />
      </div>
      <br />
    </div>
  );
}
