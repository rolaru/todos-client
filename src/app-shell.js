import { useReducer, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';

import { apollo } from './helpers/apollo-helper';

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
