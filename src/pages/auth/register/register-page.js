import { Link } from 'react-router-dom'

import AuthForm from '../../../components/auth-form/auth-form';
import PageHeader from '../../../components/page-header/page-header';

import './register-page.css';

const RegisterPage = () => {

  const onFormChange = (value) => {};

  const onFormSubmit = (value) => {};

  return (
    <div className="page page--centered register-page">
      <PageHeader title="Welcome!" subtitle="Sign up to start using Simpledo today." />
      <AuthForm
        classes="register-page__form"
        isRegisterForm={true}
        submitButtonText="Sign Up"
        onChange={onFormChange}
        onSubmit={onFormSubmit}
      >
        <Link
          className="link register-page__login-link"
          to="/auth/login"
        >
          Do have an account? Sign in.
        </Link>
      </AuthForm>
    </div>
  );
};

export default RegisterPage;