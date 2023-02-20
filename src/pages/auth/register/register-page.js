import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ActionsContext } from './../../../common/store/store';

import LoadingSpinner from './../../../components/loading-spinner/loading-spinner';
import AuthForm from './../../../components/auth-form/auth-form';
import PageHeader from './../../../components/page-header/page-header';

import { getFromStorage, saveToStorage } from './../../../helpers/local-storage-helper';
import { decodeJwtToken } from './../../../helpers/auth-helper';
import { REGISTER } from './../auth.gql';

import './register-page.css';

const RegisterPage = () => {
  const { login } = useContext(ActionsContext);

  const navigate = useNavigate();

  const [
    gqlRegister,
    {
      loading
    }
  ] = useMutation(REGISTER);

  useEffect(() => {
    // Redirect the user in case he is already logged in 
    if (getFromStorage('token')) {
      navigate('/', { replace: true });
    }
  }, []);

  const onFormChange = (value) => {};

  const onFormSubmit = async (formValue) => {
    try {
      const response = await gqlRegister({
        variables: formValue
      });

      const token = response?.data?.register;

      if (token) {
        const { id, email, fullName } = decodeJwtToken(token);
        login({ id, email, fullName });
        saveToStorage('token', token);
        navigate('/', { replace: true });
      }
    } catch(error) {
      // TODO: Treat errors here
    }
  };

  return (
    <div className="page page--centered register-page">
      <LoadingSpinner isVisible={loading} />
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