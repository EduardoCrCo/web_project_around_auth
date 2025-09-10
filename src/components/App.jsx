import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popupType, setPopupType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        setInfoTooltipMessage("Registration successful! Please log in.");
        setIsInfoTooltipOpen(true);
        console.log("Registration successful:", res);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleTooltipClose = () => {
    setIsInfoTooltipOpen(false);
    navigate("/login"); // Redirige cuando el usuario cierra el modal
  };

  const handlePopupClose = () => {
    setPopupType(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetch("https://se-register-api.en.tripleten-services.com/v1/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
        )
        .then((data) => {
          setCurrentUser(data); // Guarda el email en el estado para mostrarlo en el header
        })
        .catch((err) => {
          console.error("Token validation error:", err);
        });
    }
  }, []);

  // useEffect(() => {
  //   api.getUserInfo().then((user) => {
  //     setCurrentUser(user);
  //   });
  // }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.updateUser(data.name, data.about).then((newData) => {
        setCurrentUser(newData);
        handlePopupClose();
      });
    })();
  };

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar).then((user) => {
      setCurrentUser(user);
      handlePopupClose();
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleTooltipClose}
          message="¡Correcto! Ya estás registrado."
        />
        <Header />
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/register"
            element={<Register handleRegistration={handleRegistration} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  setPopupType={setPopupType}
                  popupType={popupType}
                  handlePopupClose={handlePopupClose}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
