import { useNavigate } from 'react-router-dom';

import Button from './../../components/button/button';

import './not-found-page.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onNavigateBackHome = () => navigate('/');

  return (
    <div className="page page--centered not-found-page">
      <h2>404: Page not found!</h2>

      <Button classes="not-found-page__home-button" onClick={onNavigateBackHome}>
        Go to Home Page
      </Button>
    </div>
  );
};

export default NotFoundPage