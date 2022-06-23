import React from 'react';

import {
  Button,
} from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';

import AdminMenu from '../components/general-components/AdminMenuButton';
import SignOutButton from '../components/general-components/SignOutButton';

const queryClient = new QueryClient();

export default function UserPage() {
  return (
    <div className="profile card row">
      <QueryClientProvider client={queryClient}>
        <h2>Dit word de entry for gebruikers</h2>
        <div />
        <br />
        <AdminMenu />
        <Button type="primary" onClick={() => console.log('click')}>
          Gegevens bewerken
        </Button>
        <SignOutButton />
      </QueryClientProvider>
    </div>
  );
}
