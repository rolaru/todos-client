import Logo from '../logo/logo';

import './page-header.css';

const PageHeader = ({ title, subtitle }) => {
  return (
    <header className="page-header">
      <Logo />
      {title && <h1 className="page-header__title">{title}</h1>}
      {subtitle && <h2 className="page-header__subtitle">{subtitle}</h2>}
    </header>
  );
};

export default PageHeader;