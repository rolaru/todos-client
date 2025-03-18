import { memo } from 'react';
import TodoItem from '../todo-item/todo-item';

import './todos-list.css';

const TodosList = memo(({ classes, filteredTodos, onChangeTodo, onDeleteTodo }) => {
  const extraClasses = classes ? ' ' + classes : '';

  return (
    <ul className={'todos-list' + extraClasses}>
      {filteredTodos.map((todoItem) => (
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
});

export default TodosList;
