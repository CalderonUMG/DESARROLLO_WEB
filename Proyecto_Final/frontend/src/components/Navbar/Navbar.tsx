import './Navbar.scss';
import logo from '../../assets/logo.png';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo Colegio de Ingenieros" />
        <span>Colegio de Ingenieros</span>
      </div>

      <ul className="navbar__links">
        <li>Quiénes Somos</li>
        <li>Subsede</li>
        <li>Nuevos Colegiados</li>
        <li>Timbre y Auxilio</li>
        <li>Ceduca</li>
        <li>Comisiones</li>
        <li>Social</li>
        <li>Directorio</li>
      </ul>

      <button className="navbar__login" onClick={() => navigate('/login')}>
        Login
      </button>
    </nav>
  );
};

export default Navbar;
