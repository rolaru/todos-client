import logoSvg from './../../common/assets/images/logo.svg'; 

const Logo = ({ width = '40px', height = '32px' }) => {
  return (
    <img
      className='logo'
      style={{ width, height }}
      alt="Todos"
      src={logoSvg}
    />
  );
};

export default Logo;