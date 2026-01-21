import logo from "../../images/Around_logo.svg";
function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo Around US " className="header__logo" />
      <div className="header__border"></div>
    </header>
  );
}

export default Header;
