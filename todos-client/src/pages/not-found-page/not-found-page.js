import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>404: Page not found!</h2>

      <Link className="not-found-page__home-link" to="/">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage