import { GraphQLClient } from 'graphql-request';
import OidcService from './OidcService';
import graphqlConfig from '../config/graphqlConfig';

export default class GraphqlService {
  static getClient(): GraphQLClient {
    const client = new GraphQLClient(graphqlConfig.url);
    client.setHeader('Authorization', `Bearer ${OidcService.getAccessToken()}`);
    return client;
  }
}
