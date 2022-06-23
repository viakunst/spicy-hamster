import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  Button,
} from 'antd';
import { useGetOwnRolesQuery } from '../../Api/Backend';
import GraphqlService from '../../helpers/GraphqlService';

export default function AdminMenuButton() {
  const [state, setState] = useState({
    admin: 'user',
  });

  console.log('start');
  const {
    data, isLoading, isError, refetch,
  } = useGetOwnRolesQuery(GraphqlService.getClient());

  console.log(isLoading);
  if (isLoading || isError || data === undefined) {
    return null;
  }

  console.log(data);
  const roles = data.getOwnRoles as string[];
  console.log(roles);

  let admin = false;
  roles.forEach((role) => {
    if (role === 'ROLE_ADMIN') {
      admin = true;
    }
  });

  if (admin) {
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
