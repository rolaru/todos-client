import { createContext } from 'react';

import { getFromStorage } from './../../helpers/local-storage-helper';

import { UserActionNames } from './actions/user-actions';
import { TodosActionNames } from './actions/todos-actions';
import { generateUserActions } from './actions/user-actions';
import { generateTodosActions } from './actions/todos-actions';

import { userReducers } from './reducers/user-reducers';
import { todosReducers } from './reducers/todos-reducers';

import todosMockEntries from './../../pages/todos-page/todos-mock-entries';

const ActionNames = {
  ...UserActionNames,
  ...TodosActionNames
};

export const defaultGlobalState = {
  user: getFromStorage('user'),
  todos: todosMockEntries
};

export const GlobalStateContext = createContext();
export const ActionsContext = createContext();

export const globalReducer = (state, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionNames.Login:
      return userReducers.login(state, payload);
    
    case ActionNames.SetTodos:
      return todosReducers.set(state, payload);
    case ActionNames.CreateTodo:
      return todosReducers.create(state, payload);
    case ActionNames.UpdateTodo:
      return todosReducers.update(state, payload);
    case ActionNames.DeleteTodo:
      return todosReducers.delete(state, payload);
    
    default:
      return state;
  }
}

export const generateActions = dispatch => {
  return {
    ...generateUserActions(dispatch),
    ...generateTodosActions(dispatch)
  };
};