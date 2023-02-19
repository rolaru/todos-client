import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apiEndpoint = 'http://localhost:80/';

export const apollo = new ApolloClient({
  uri: apiEndpoint,
  cache: new InMemoryCache({ addTypename: false }),
});