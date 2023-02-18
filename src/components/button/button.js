import './button.css';

const Button = ({
  children,
  classes,
  variant,
  type = "button",
  onClick
}) => {
  const variantClass = variant === 'link' ? ' button--link' : ' button--primary';
  const extraClasses = classes ? ' ' + classes : '';

  return (
    <button
      className={'button' + variantClass + extraClasses}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;