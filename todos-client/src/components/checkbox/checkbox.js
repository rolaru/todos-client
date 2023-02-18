import { v4 as uuidv4 } from 'uuid'; 

import './checkbox.css';

const Checkbox = ({
  classes,
  id = uuidv4(),
  label = '',
  isChecked = false,
  onChange
}) => {
  const extraClasses = classes ? ' ' + classes : '';

  return (
    <div className={'checkbox' + extraClasses}>
      <input
        id={id}
        className="checkbox__input"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      {label &&
        <label
          className="checkbox__label"
          htmlFor={id}
        >
          {label}
        </label>
      }
    </div>
  );
};

export default Checkbox;