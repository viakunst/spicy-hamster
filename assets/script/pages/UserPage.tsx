import React, { useContext, useState, useEffect } from 'react';
import { UserData } from 'react-oidc';
import {
  Button, Modal, Table,
} from 'antd';

import ProfileEdit from '../components/user-statement/UserStatementCreate';
import AdminMenu from '../components/general-components/AdminMenuButton';
import SignOutButton from '../components/general-components/SignOutButton';
import OidcService from '../helpers/OidcService';

export default function UserPage() {
  const userData = useContext(UserData);
  const [visible, setVisible] = useState(false);

  return (
    <div className="profile card row">
      <h2>Dit word de entry for gebruikers</h2>
      <div />
      <br />
      <AdminMenu />
      <Button type="primary" onClick={() => setVisible(true)}>
        Gegevens bewerken
      </Button>
      <SignOutButton />
    </div>
  );
}
