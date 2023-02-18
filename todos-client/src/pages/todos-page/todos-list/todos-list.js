import { useContext, useCallback } from 'react';

import { ActionsContext } from './../../../common/store/store';

import TodoItem from '../todo-item/todo-item';

import './todos-list.css';

const TodosList = ({ classes, filteredTodos }) => {
  const {
    updateTodo,
    deleteTodo
  } = useContext(ActionsContext);

  const extraClasses = classes ? ' ' + classes : '';

  // wrap these methods with useCallback so that we benefit of the full power
  // of memo on the TodoItems and they don't not get rerendered uselessly
  const onChangeTodo = useCallback((id, isDone) => updateTodo(id, isDone), [updateTodo]);
  const onDeleteTodo = useCallback((id) => deleteTodo(id), [deleteTodo]);

  return (
    <ul className={'todos-list' + extraClasses}>
      {filteredTodos.map(todoItem => (
        <TodoItem
          key={todoItem.id}
          id={todoItem.id}
          classes="todos-list__item"
          content={todoItem.content}
          isDone={todoItem.isDone}
          onChange={onChangeTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodosList;