import { NavLink, Link } from 'react-router-dom';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import instagram from '../../assets/Instagram_icon.png';
import './Footer.scss';

function Footer() {
  return (
    <nav className="footer">
      <NavLink className="footer-terms" to="/terms">
        Mentions Légales
      </NavLink>
      <a
        className="footer-network"
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={facebook} alt="Logo Facebook" />
      </a>
      <a
        className="footer-network"
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={instagram} alt="Logo Instagram" />
      </a>
      <a
        className="footer-network"
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={twitter} alt="Logo Twitter" />
      </a>
    </nav>
  );
}

export default Footer;
