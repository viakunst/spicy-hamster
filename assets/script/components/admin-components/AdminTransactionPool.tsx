import React from 'react';
import TransactionPool from '../pools/TransactionPool';
import TransactionPoolByGroup from '../pools/TransactionPoolByGroup';
import TransactionPoolByPerson from '../pools/TransactionPoolByPerson';

interface AdminTransactionPoolProps {
  mode: 'total' | 'group' | 'person';
}

export default function AdminTransactionPool(props:AdminTransactionPoolProps) {
  const { mode } = props;
  let content = <>...</>;
  console.log(mode);
  switch (mode) {
    case 'total':
      content = (
        <>
          <h2>Alle transacties</h2>
          <p>Dit zijn alle transacties los van elkaar.</p>
          <div className="table">
            <TransactionPool />
          </div>
        </>
      );
      break;
    case 'group':
      content = (
        <>
          <h2>Alle transacties per Activiteit </h2>
          <p>Dit zijn alle transacties per activiteit.</p>
          <div className="table">
            <TransactionPoolByGroup />
          </div>
        </>
      );
      break;
    case 'person':
      content = (
        <>
          <h2>Alle transacties per Persoon </h2>
          <p>Dit zijn alle transacties per persoon.</p>
          <div className="table">
            <TransactionPoolByPerson />
          </div>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff' }}>
        {content}
      </div>
    </div>
  );
}
