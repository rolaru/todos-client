import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Filters } from './todos-filters/todos-filters';

import {
  CREATE_TODO,
  DELETE_TODO,
  GET_ALL_TODOS_FOR_USER,
  UPDATE_TODO,
} from './todos-page.gql';

// Custom hook for todo operations
export const useTodoOperations = (userId) => {
  const {
    loading: getTodosLoading,
    error: getTodosError,
    data: todosData,
  } = useQuery(GET_ALL_TODOS_FOR_USER, { 
    variables: { userId },
    skip: !userId
  });

  const [gqlAddTodo, { loading: createTodoLoading, error: createTodoError }] = useMutation(CREATE_TODO);
  const [gqlUpdateTodo, { loading: updateTodoLoading, error: updateTodoError }] = useMutation(UPDATE_TODO);
  const [gqlDeleteTodo, { loading: deleteTodoLoading, error: deleteTodoError }] = useMutation(DELETE_TODO);

  const loading = getTodosLoading || createTodoLoading || updateTodoLoading || deleteTodoLoading;
  const error = getTodosError || createTodoError || updateTodoError || deleteTodoError;

  return {
    todos: todosData?.getAllTodosForUser,
    loading,
    error,
    addTodo: gqlAddTodo,
    updateTodo: gqlUpdateTodo,
    deleteTodo: gqlDeleteTodo
  };
};

// Custom hook for todo filtering
export const useTodoFiltering = (todos, activeFilter) => {
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    if (!todos) return;

    if (activeFilter) {
      setFilteredTodos(
        todos.filter((todo) =>
          activeFilter === Filters.Completed ? todo.isDone : !todo.isDone
        )
      );
    } else {
      setFilteredTodos([...todos]);
    }
  }, [todos, activeFilter]);

  return filteredTodos;
};