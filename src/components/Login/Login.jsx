import { useState } from "react";
import Header from "../Header/Header.jsx";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../utils/auth.js";

// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(data.email, data.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="login-container">
      {/* <Header>
        <p className="header__link">
          <Link to="/register"> Regístrate</Link>
        </p>
      </Header> */}
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__form-title">Inicia sesión</h2>
        <fieldset className="auth__form-fieldset">
          <input
            id="email"
            name="email"
            type="email"
            className="form__input form__input-email"
            placeholder="Correo electrónico"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            className="form__input form__input-password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleChange}
            required
          />
        </fieldset>
        <button className="auth__form-submit_button" type="submit">
          Inicia sesión
        </button>
        {/* {error && <div className="login__error">{error}</div>} */}
      </form>
      <p className="auth__form-footer auth__form-footer-link">
        ¿Aún no eres miembro?<Link to="/register"> Regístrate Aquí</Link>
      </p>
    </div>
  );
};

export default Login;
