import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingAddCard, setIsLoadingAddCard] = useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [userData, cardsData] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(userData);
        setCards(cardsData);
      } catch (err) {
        console.error(err + " - Erro ao carregar dados iniciais");
      }
    };

    loadInitialData();
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
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/signin" element={<div>Login Page</div>} />
          <Route path="/signup" element={<div>Register Page</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
