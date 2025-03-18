import './form-input.css';

const FormInput = ({
  classes,
  placeholder = '',
  type = 'text',
  value = '',
  onChange = () => {},
  ...otherInputProps
}) => {
  const extraClasses = classes ? ' ' + classes : '';

  return (
    <input 
      className={'form-input' + extraClasses}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...otherInputProps}
    />
  );
};

export default FormInput;