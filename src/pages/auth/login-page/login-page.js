import { Link } from 'react-router-dom';

import PageHeader from './../../../components/page-header/page-header';
import AuthForm from './../../../components/auth-form/auth-form';

import './login-page.css';

const LoginPage = () => {

  const onFormChange = (value) => {};

  const onFormSubmit = (value) => {};

  return (
    <div className="page page--centered login-page">
      <PageHeader title="Welcome back!" subtitle="Login to continue." />
      <AuthForm
        classes="login-page__form"
        submitButtonText="Log In"
        onChange={onFormChange}
        onSubmit={onFormSubmit}
      >
        <Link
          className="link login-page__register-link"
          to="/auth/register"
        >
          Don’t have an account? Sign up.
        </Link>
      </AuthForm>
    </div>
  );
};

export default LoginPage;