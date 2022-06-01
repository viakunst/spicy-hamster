import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  Button,
} from 'antd';

export default function AdminMenuButton() {
  const [state, setState] = useState({
    admin: 'user',
  });

  // componentDidMount
  useEffect(() => {
    // TO-DO: check if Mighty-Eagly has determined if admin.
    // For now always assume this.
    setState({ admin: 'admin' });
  }, []);

  const {
    admin,
  } = state;

  if (admin === 'admin') {
    return (
      <>
        <Link to="/admin">
          <Button>
            Beheer
          </Button>
        </Link> | {' '}
      </>
    );
  }

  return null;
}
