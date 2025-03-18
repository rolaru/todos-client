import { useContext, useEffect, useState, useCallback } from 'react';
import { useTodoOperations, useTodoFiltering } from './todos-page.hooks';

import { ActionsContext, GlobalStateContext } from '../../common/store/store';

import PageHeader from './../../components/page-header/page-header';
import FormInput from './../../components/form-input/form-input';
import TodosList from './todos-list/todos-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import TodosFilters from './todos-filters/todos-filters';

import './todos-page.css';

const TodosPage = () => {
  const { todos: contextTodos, user } = useContext(GlobalStateContext);
  const {
    setTodos,
    createTodo,
    updateTodo,
    deleteTodo
  } = useContext(ActionsContext);

  const [activeFilter, setActiveFilter] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');

  const {
    todos: fetchedTodos,
    loading,
    error,
    addTodo,
    updateTodo: gqlUpdateTodo,
    deleteTodo: gqlDeleteTodo
  } = useTodoOperations(user?.id);

  const filteredTodos = useTodoFiltering(contextTodos, activeFilter);

  useEffect(() => {
    if (!error && fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos, error, setTodos]);

  const handleAddTodo = async (event) => {
    if (event.key === 'Enter' && newTodoText.trim()) {
      try {
        const response = await addTodo({
          variables: { userId: user?.id, content: newTodoText.trim() }
        });
        const newlyAddedTodo = response?.data?.createTodo;

        if (newlyAddedTodo) {
          createTodo(newlyAddedTodo);
          setNewTodoText('');
        }
      } catch (err) {
        console.error('Failed to add todo:', err);
      }
    }
  };

  const handleUpdateTodo = async (id, isDone) => {
    try {
      const response = await gqlUpdateTodo({ variables: { id, isDone } });
      if (typeof response?.data?.updateTodo === 'boolean') {
        updateTodo(id, response.data.updateTodo);
      }
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDeleteTodo = useCallback(async (id) => {
    try {
      await gqlDeleteTodo({ variables: { id } });
      deleteTodo(id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  }, [gqlDeleteTodo, deleteTodo]);

  if (error) {
    return <div className="error-message">Error loading todos. Please try again later.</div>;
  }

  return (
    <div className="page page--centered todos-page">
      <LoadingSpinner isVisible={loading} />

      <PageHeader title="Todo List" />

      <FormInput
        classes="todos-page__add-todo-input"
        placeholder="Add a new todo"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyPress={handleAddTodo}
      />

      <TodosList
        filteredTodos={filteredTodos}
        onChangeTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      />

      <TodosFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};

export default TodosPage;
