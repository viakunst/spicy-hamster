import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import AdminTransactionPool from '../components/admin-components/AdminTransactionPool';
import AdminPersonPool from '../components/admin-components/AdminPersonPool';
import AdminStatementPool from '../components/admin-components/AdminStatementPool';

const queryClient = new QueryClient();

export default function AdminPage() {
  // Render all attributes

  return (
    <div className="admin card row">
      <h2>Dit word de entry for admins</h2>
      <div className="table">
        <QueryClientProvider client={queryClient}>
          <AdminPersonPool />
          <AdminStatementPool />
        </QueryClientProvider>
      </div>
      <br />
    </div>
  );
}
