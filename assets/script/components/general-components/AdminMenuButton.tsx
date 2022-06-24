import React from 'react';

import { Link } from 'react-router-dom';
import {
  Button,
} from 'antd';

import { useGetOwnRolesQuery, useImportPersonMutation } from '../../Api/Backend';
import GraphqlService from '../../helpers/GraphqlService';
import OidcService from '../../helpers/OidcService';

export default function AdminMenuButton() {
  const {
    data, isLoading, isError, refetch,
  } = useGetOwnRolesQuery(GraphqlService.getClient());

  const importMutation = useImportPersonMutation(GraphqlService.getClient());

  if (isLoading || isError || data === undefined) {
    return null;
  }

  const roles = data.getOwnRoles as string[];

  let admin = false;

  roles.forEach((role) => {
    if (role === 'ROLE_ADMIN') {
      admin = true;
    }
    if (role === 'noAdmin') {
      const tok = OidcService.getIdToken();
      if (tok !== null && importMutation.isLoading === false && importMutation.isSuccess === false) {
        importMutation.mutate({ token: tok });
      }
    }
  });

  if (importMutation.isSuccess && admin === false) {
    if (importMutation.data.importPerson === 'success') {
      refetch();
    }
  }

  if (admin) {
    return (
      <Link to="/admin">
        <Button>
          Beheer
        </Button>
      </Link>
    );
  }

  return null;
}
