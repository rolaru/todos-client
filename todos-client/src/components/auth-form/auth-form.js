import { useState } from 'react';
import Button from '../button/button';

import FormInput from '../form-input/form-input';

import './auth-form.css';

const AuthForm = ({
  children,
  classes,
  isRegisterForm,
  onChange,
  submitButtonText = 'Submit',
  onSubmit
}) => {
  const [formValue, setFormValue] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const extraClasses = classes ? ' ' + classes : '';

  const changeFormField = (fieldName, value) => {
    const newFormValue = {
      ...formValue,
      [fieldName]: value
    };

    setFormValue(newFormValue);

    if (onChange) {
      onChange(newFormValue);
    }
  };

  const onChangeFullName = event => changeFormField('fullName', event.target.value);
  const onChangeEmail = event => changeFormField('email', event.target.value);
  const onChangePassword = event => changeFormField('password', event.target.value);

  const onFormSubmit = () => onSubmit ? onSubmit(formValue) : null;

  return (
    <form className={'auth-form' + extraClasses}>
      {isRegisterForm &&
        <FormInput
          classes="auth-form__input"
          placeholder="Full Name"
          value={formValue.fullName}
          onChange={onChangeFullName}
        />
      }
      <FormInput
        classes="auth-form__input"
        placeholder="E-mail"
        value={formValue.email}
        onChange={onChangeEmail}
      />
      <FormInput
        classes="auth-form__input"
        placeholder="Password"
        value={formValue.password}
        onChange={onChangePassword}
      />

      <div className="auth-form__additional-content">
        {children}
      </div>

      <Button
        classes="auth-form__action-button"
        onClick={onFormSubmit}
      >
          {submitButtonText}
      </Button>
    </form>
  );
};

export default AuthForm;