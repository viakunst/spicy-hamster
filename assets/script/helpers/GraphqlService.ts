import { GraphQLClient } from 'graphql-request';
import OidcService from './OidcService';

export default class GraphqlService {
  static getClient(): GraphQLClient {
    const client = new GraphQLClient('https://localhost:8000/api/graphql/');
    client.setHeader('Authorization', `Bearer ${OidcService.getAccessToken()}`);
    return client;
  }
}
