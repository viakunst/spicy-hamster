import { GraphQLClient } from 'graphql-request';
import OidcService from './OidcService';

const ID_TOKEN = 'id_token';

const ACCESS_TOKEN = 'id_token';

export default class GraphqlService {
  static getIdToken(): string | null {
    return JSON.parse(localStorage.getItem(ID_TOKEN) ?? 'null');
  }

  static getClient(): GraphQLClient {
    const client = new GraphQLClient('https://localhost:8000/api/graphql/');
    client.setHeader('Authorization', `Bearer ${OidcService.getAccessToken()}`);
    return client;
  }
}
