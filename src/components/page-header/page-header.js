import { useNavigate } from 'react-router-dom';
import { deleteFromStorage } from './../../helpers/local-storage-helper';
import Logo from './../logo/logo';
import Button from './../button/button';

import './page-header.css';

const PageHeader = ({ title, subtitle, showLogoutButton = false }) => {
  const navigate = useNavigate();

  const onLogout = (e) => {
    deleteFromStorage('token');
    navigate('/', { replace: true });
  };

  return (
    <header className="page-header">
      <div className="page-header__logo-container">
        <Logo />
        {showLogoutButton && (
          <Button variant="link" onClick={onLogout}>
            Logout
          </Button>
        )}
      </div>
      {title && <h1 className="page-header__title">{title}</h1>}
      {subtitle && <h2 className="page-header__subtitle">{subtitle}</h2>}
    </header>
  );
};

export default PageHeader;
