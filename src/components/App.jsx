import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register/Register";
import Login from "./Login/Login";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Loader from "./Loader/Loader";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingAddCard, setIsLoadingAddCard] = useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState({
    isSuccess: false,
    message: "",
  });

  const handleRegister = useCallback(async (email, password) => {
    try {
      await auth.register(email, password);
      setInfoTooltipStatus({
        isSuccess: true,
        message: "Vitória! Você se registrou com sucesso.",
      });
      setIsInfoTooltipOpen(true);
    } catch (err) {
      console.error(err + " - Erro ao registrar usuário");
      setInfoTooltipStatus({
        isSuccess: false,
        message: "Ops, algo deu errado!\nPor favor, tente novamente.",
      });
      setIsInfoTooltipOpen(true);
    }
  }, []);

  const handleCloseInfoTooltip = useCallback(() => {
    setIsInfoTooltipOpen(false);
    if (infoTooltipStatus.isSuccess) {
      navigate("/signin");
    }
  }, [infoTooltipStatus.isSuccess, navigate]);

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        const data = await auth.login(email, password);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", email);
          setIsLoggedIn(true);

          // Carregar dados do usuário após login
          const [userData, cardsData] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
          ]);
          setCurrentUser({ ...userData, email });
          setCards(cardsData);

          navigate("/");
        }
      } catch (err) {
        console.error(err + " - Erro ao fazer login");
        setInfoTooltipStatus({
          isSuccess: false,
          message: "Ops, algo deu errado!\nPor favor, tente novamente.",
        });
        setIsInfoTooltipOpen(true);
      }
    },
    [navigate],
  );

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const email = localStorage.getItem("email");
        const [userData, cardsData] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser({ ...userData, email });
        setCards(cardsData);
      } catch (err) {
        console.error(err + " - Erro ao carregar dados iniciais");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    // Verifica se tem token no localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      loadInitialData();
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  const handleOpenPopup = useCallback((popupData) => {
    setPopup(popupData);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup(null);
  }, []);

  const handleCardDelete = useCallback(
    async (card) => {
      setIsLoadingDeleteCard(true);
      try {
        await api.deleteCard(card._id);
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
        handleClosePopup();
      } catch (err) {
        console.error(err + " - Erro ao deletar card");
      } finally {
        setIsLoadingDeleteCard(false);
      }
    },
    [handleClosePopup],
  );

  const handleCardLike = useCallback(async (card) => {
    try {
      const newCard = await api.changeLikeCardStatus(card._id, card.isLiked);

      setCards((prevCards) =>
        prevCards.map((c) => (c._id === card._id ? newCard : c)),
      );
    } catch (err) {
      console.error(err + " - Erro ao alterar status de like");
    }
  }, []);

  const handleUpdateUser = useCallback(
    async (data) => {
      setIsLoadingUserInfo(true);
      try {
        const newData = await api.setUserInfo(data);
        setCurrentUser(newData);
        handleClosePopup();
      } catch (err) {
        console.log(err + " - Erro ao atualizar informações do usuário");
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [handleClosePopup],
  );

  const handleAddPlaceSubmit = useCallback(
    async (data) => {
      setIsLoadingAddCard(true);
      try {
        const newCard = await api.createCard(data);
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      } catch (err) {
        console.log(err + " - Erro ao adicionar novo card");
      } finally {
        setIsLoadingAddCard(false);
      }
    },
    [handleClosePopup],
  );

  const handleUpdateAvatar = useCallback(
    async (data) => {
      setIsLoadingAvatar(true);
      try {
        const newData = await api.updateAvatar(data);
        setCurrentUser(newData);
      } catch (err) {
        console.log(err + " - Erro ao atualizar avatar do usuário");
      } finally {
        setIsLoadingAvatar(false);
        handleClosePopup();
      }
    },
    [handleClosePopup],
  );

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      {isCheckingToken ? (
        <div className="page">
          <Loader />
        </div>
      ) : (
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            userEmail={currentUser.email}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    setPopup={setPopup}
                    isLoadingUserInfo={isLoadingUserInfo}
                    isLoadingAvatar={isLoadingAvatar}
                    isLoadingAddCard={isLoadingAddCard}
                    isLoadingDeleteCard={isLoadingDeleteCard}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={handleCloseInfoTooltip}
            isSuccess={infoTooltipStatus.isSuccess}
            message={infoTooltipStatus.message}
          />
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
