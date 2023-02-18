import { useReducer, useMemo } from 'react';

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
    <ActionsContext.Provider value={Actions}>
      <GlobalStateContext.Provider value={globalState}>
        <TodosRoutes />
      </GlobalStateContext.Provider>
    </ActionsContext.Provider>
  );
};

export default AppShell;
