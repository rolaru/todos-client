import { memo } from 'react';

import Checkbox from '../../../components/checkbox/checkbox';

import './todo-item.css';

import closeIcon from './../../../common/assets/images/close.svg';

const TodoItem = ({
  id,
  classes,
  content,
  isDone,
  onChange,
  onDelete
}) => {
  const extraClasses = classes ? ' ' + classes : '';

  const onChangeTodo = (event) => onChange(id, event.target.checked);

  const onDeleteTodo = () => onDelete(id);

  return (
    <li className={'todo-item' + extraClasses}>
      <Checkbox
        id={id}
        classes="todo-item__checkbox"
        isChecked={isDone}
        label={content}
        onChange={onChangeTodo}
      />
      <button
        className="todo-item__close-button"
        type="button"
        onClick={onDeleteTodo}
      >
        <img alt="Remove todo" src={closeIcon} />
      </button>
    </li>
  );
};

// there can be a lot of items in a list so we can wrap this component with memo
// so that TodoItems don't get rerendered each time the parent triggers a rerender
export default memo(TodoItem);