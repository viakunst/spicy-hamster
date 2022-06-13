import React from 'react';
import StatementPool from '../pools/StatementPool';

export default function AdminStatementPool() {
  return (
    <div className="admin card row">
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h2>Alle declaraties.</h2>
        <p>Dit zijn alle declaraties die gedaan zijn.</p>
        <div className="table">
          <StatementPool />
        </div>
      </div>
      <br />
    </div>
  );
}
