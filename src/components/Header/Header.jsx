import Logo from "../../images/logo.svg";
import Line from "../../images/Line.svg";

export default function Header({ children }) {
  return (
    <header className="header">
      <div className="header__spacer">
        <img
          src={Logo}
          alt="imagen vectorial de encabezado"
          className="header__image"
        />
        {children}
      </div>
      <img src={Line} alt="Line" className="header__image-line" />
    </header>
  );
}
