import React from 'react';

import AdminTransactionPool from '../components/admin-components/AdminTransactionPool';

export default function AdminPage() {
  // Render all attributes

  return (
    <div className="admin card row">
      <h2>Dit word de entry for admins</h2>
      <div className="table">
        <AdminTransactionPool />
      </div>
      <br />
    </div>
  );
}
