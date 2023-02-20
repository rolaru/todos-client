import { useContext, useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ActionsContext, GlobalStateContext } from '../../common/store/store';

import PageHeader from './../../components/page-header/page-header';
import FormInput from './../../components/form-input/form-input';
import TodosList from './todos-list/todos-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import TodosFilters, { Filters } from './todos-filters/todos-filters';

import {
  CREATE_TODO,
  DELETE_TODO,
  GET_ALL_TODOS_FOR_USER,
  UPDATE_TODO,
} from './todos-page.gql';

import './todos-page.css';

const TodosPage = () => {
  const { todos, user } = useContext(GlobalStateContext);
  const {
    setTodos,
    createTodo,
    updateTodo,
    deleteTodo
  } = useContext(ActionsContext);

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [activeFilter, setActiveFilter] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');

  const {
    loading: getTodosLoading,
    error: getTodosError,
    data: todosData,
  } = useQuery(GET_ALL_TODOS_FOR_USER, { variables: { userId: user?.id } });

  const [
    gqlAddTodo,
    {
      loading: createTodoLoading,
      error: createTodoError
    }
  ] = useMutation(CREATE_TODO);

  const [
    gqlUpdateTodo,
    {
      loading: updateTodoLoading,
      error: updateTodoError
    }
  ] = useMutation(UPDATE_TODO);

  const [
    gqlDeleteTodo,
    { 
      loading: deleteTodoLoading, 
      error: deleteTodoError
    }
  ] = useMutation(DELETE_TODO);

  const loading =
    getTodosLoading ||
    createTodoLoading ||
    updateTodoLoading ||
    deleteTodoLoading;

  useEffect(() => {
    const todos = todosData?.getAllTodosForUser;

    if (!getTodosError && todos) {
      setTodos(todos);
    }
  }, [todosData]);

  useEffect(() => {
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

  const onChangeNewTodoText = (event) => setNewTodoText(event.target.value);

  const onAddTodo = async (event) => {
    if (event.key === 'Enter') {
      const response = await gqlAddTodo({
        variables: { userId: user?.id, content: newTodoText }
      });
      const newlyAddedTodo = response?.data?.createTodo;

      if (!createTodoError && newlyAddedTodo) {
        createTodo(newlyAddedTodo);

        setNewTodoText('');
      }
    }
  };

  // wrap these methods with useCallback so that we benefit of the full power
  // of memo() on the TodoItems and they don't not get rerendered uselessly
  const onChangeTodo = useCallback(async (id, isDone) => {
    const response = await gqlUpdateTodo({ variables: { id, isDone } });

    if (!updateTodoError) {
      updateTodo(id, response?.data?.updateTodo);
    }
  }, []);

  const onDeleteTodo = useCallback(async (id) => {
    await gqlDeleteTodo({ variables: { id } });

    if (!deleteTodoError) {
      deleteTodo(id);
    }
  }, []);

  return (
    <div className="page page--centered todos-page">
      <LoadingSpinner isVisible={loading} />

      <PageHeader title="Todo List" />

      <FormInput
        classes="todos-page__add-todo-input"
        placeholder="Add a new todo"
        value={newTodoText}
        onChange={onChangeNewTodoText}
        onKeyPress={onAddTodo}
      />

      <TodosList
        filteredTodos={filteredTodos}
        onChangeTodo={onChangeTodo}
        onDeleteTodo={onDeleteTodo}
      />

      <TodosFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};

export default TodosPage;
