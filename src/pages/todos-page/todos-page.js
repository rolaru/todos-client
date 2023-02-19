import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ActionsContext, GlobalStateContext } from '../../common/store/store';

import PageHeader from './../../components/page-header/page-header';
import FormInput from './../../components/form-input/form-input';
import TodosList from './todos-list/todos-list';

import TodosFilters, { Filters } from './todos-filters/todos-filters';

import './todos-page.css';

const TodosPage = () => {
  const { todos } = useContext(GlobalStateContext);
  const {
    createTodo,
  } = useContext(ActionsContext);

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [activeFilter, setActiveFilter] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    if (activeFilter) {
      setFilteredTodos(
        todos.filter(
          todo => activeFilter === Filters.Completed ? todo.isDone : !todo.isDone
        )
      );
    } else {
      setFilteredTodos([ ...todos ]);
    }
  }, [todos, activeFilter]);

  const onChangeNewTodoText = (event) => setNewTodoText(event.target.value);

  const onAddTodo = (event) => {
    if(event.key === 'Enter') {
      createTodo({
        id: uuidv4(),
        content: newTodoText,
        isDone: false
      });

      setNewTodoText('');
    }
  };

  return (
    <div className="page page--centered todos-page">
      <PageHeader title="Todo List" />
      <FormInput
        classes="todos-page__add-todo-input"
        placeholder="Add a new todo"
        value={newTodoText}
        onChange={onChangeNewTodoText}
        onKeyPress={onAddTodo}
      />
      
      <TodosList filteredTodos={filteredTodos} />

      <TodosFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
    </div>
  );
};

export default TodosPage;