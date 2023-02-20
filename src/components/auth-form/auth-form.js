import { useState } from 'react';
import Button from '../button/button';

import FormInput from '../form-input/form-input';

import './auth-form.css';

const defaultLoginState = {
  email: '',
  password: ''
};

const defaultRegisterState = {
  fullName: '',
  email: '',
  password: ''
};

const AuthForm = ({
  children,
  classes,
  isRegisterForm,
  errors,
  onChange,
  submitButtonText = 'Submit',
  onSubmit
}) => {
  const [formValue, setFormValue] = useState(
    isRegisterForm ? defaultRegisterState : defaultLoginState
  );

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
      {isRegisterForm && errors.fullName &&
        <div className="error">{ errors.fullName }</div>
      }

      <FormInput
        classes="auth-form__input"
        placeholder="E-mail"
        value={formValue.email}
        onChange={onChangeEmail}
      />
      {errors.email &&
        <div className="error">{ errors.email }</div>
      }

      <FormInput
        classes="auth-form__input"
        placeholder="Password"
        value={formValue.password}
        onChange={onChangePassword}
      />
      {errors.password &&
        <div className="error">{ errors.password }</div>
      }

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