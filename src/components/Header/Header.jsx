import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/Around_logo.svg";

function Header({ isLoggedIn, userEmail, onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsMenuOpen(false); // Fecha o menu antes de fazer logout
    onSignOut();
  };

  return (
    <header className={`header ${isMenuOpen ? "header_menu-open" : ""}`}>
      <div className="header__top">
        <img src={logo} alt="logo Around US " className="header__logo" />
        {isLoggedIn && (
          <button
            className={`header__burger ${isMenuOpen ? "header__burger_active" : ""}`}
            onClick={toggleMenu}
            type="button"
          >
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </button>
        )}
        <nav className="header__nav header__nav_desktop">
          {isLoggedIn ? (
            <div className="header__user-info">
              {userEmail && <p className="header__email">{userEmail}</p>}
              <button className="header__link" onClick={handleSignOut}>
                Sair
              </button>
            </div>
          ) : location.pathname === "/signup" ? (
            <Link to="/signin" className="header__link">
              Faça o login
            </Link>
          ) : location.pathname === "/signin" ? (
            <Link to="/signup" className="header__link">
              Cadastrar
            </Link>
          ) : null}
        </nav>
      </div>

      {isLoggedIn && (
        <nav
          className={`header__nav header__nav_mobile ${isMenuOpen ? "header__nav_mobile-open" : ""}`}
        >
          <div className="header__user-info header__user-info_mobile">
            {userEmail && <p className="header__email">{userEmail}</p>}
            <button className="header__link" onClick={handleSignOut}>
              Sair
            </button>
          </div>
        </nav>
      )}

      <div className="header__border"></div>
    </header>
  );
}

export default Header;
