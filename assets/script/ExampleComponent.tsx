/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request';
import { usePersonsQuery } from './Api/Backend';

const ExampleComponent = () => {
  const endpoint = 'http://localhost:8000/api/graphql/';
  const client = new GraphQLClient(endpoint, { headers: {} });
  const {
    status,
    data,
    error,
    isFetching,
  } = usePersonsQuery(client, {});

  // ...
};

export default ExampleComponent;
