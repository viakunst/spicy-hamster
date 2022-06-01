import React from 'react';
import StatementPool from '../pools/StatementPool';

export default function AdminStatementPool() {
  return (
    <div className="admin card row">
      <h2>Alle declaraties van vk.</h2>
      <div className="table">
        <StatementPool />
      </div>
      <br />
    </div>
  );
}
