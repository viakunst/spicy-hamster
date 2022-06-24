import { Space } from 'antd';
import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import AdminMenu from '../components/general-components/AdminMenuButton';
import SignOutButton from '../components/general-components/SignOutButton';
import UserTransactionPool from '../components/user-components/UserTransactionPool';

const queryClient = new QueryClient();

export default function UserPage() {
  return (
    <div className="profile card row">
      <QueryClientProvider client={queryClient}>
        <h2>Dit zijn jouw openstaande transacties.</h2>
        <p> Het kan gebeuren dat de penningmeester de status van jouw transacties nog
          niet heeft gecheckt en daardoor de status blijft hangen.
          (Het checken van de status moet helaas nog met de hand.)
          App de penningmeester als je denkt dat het mis gaat!
        </p>
        <UserTransactionPool />
        <br />

        <Space>
          <AdminMenu />
          <SignOutButton />
        </Space>

      </QueryClientProvider>
    </div>
  );
}
