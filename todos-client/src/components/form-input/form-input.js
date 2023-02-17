import './form-input.css';

const FormInput = ({
  classes,
  placeholder = '',
  value = '',
  onChange = () => {}
}) => {
  const extraClasses = classes ? ' ' + classes : '';

  return (
    <input 
      className={'form-input' + extraClasses}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;