import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getFromStorage } from './local-storage-helper';

export const apiEndpoint = 'http://localhost:80/';

const httpLink = createHttpLink({
  uri: apiEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = getFromStorage('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

export const apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false })
});