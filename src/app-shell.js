import { useReducer, useMemo, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import { apollo } from './helpers/apollo-helper';
import { decodeJwtToken } from './helpers/auth-helper';
import { getFromStorage } from './helpers/local-storage-helper';

import {
  ActionsContext,
  defaultGlobalState,
  generateActions,
  globalReducer,
  GlobalStateContext,
} from './common/store/store';

import TodosRoutes from './routes';

const AppShell = () => {
  const [globalState, dispatch] = useReducer(globalReducer, defaultGlobalState);

  const Actions = useMemo(() => generateActions(dispatch), []);

  useEffect(() => {
    // Load the user data in case the app refreshes
    const token = getFromStorage('token');

    if (token) {
      const { id, email, fullName } = decodeJwtToken(token);
      Actions.login({ id, email, fullName });
    }
  }, []);
  
  return (
    <ApolloProvider client={apollo}>
      <ActionsContext.Provider value={Actions}>
        <GlobalStateContext.Provider value={globalState}>
          <TodosRoutes />
        </GlobalStateContext.Provider>
      </ActionsContext.Provider>
    </ApolloProvider>
  );
};

export default AppShell;
