import { useCallback, useContext, useMemo } from "react";
import pencil from "../../images/Pencil.svg";
import plus from "../../images/Plus.svg";

import Popup from "./components/Popup/Popup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import RemoveCard from "./components/Popup/components/RemoveCard/removeCard.jsx";
import Card from "./components/Card/Card";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  isLoadingUserInfo,
  isLoadingAvatar,
  isLoadingAddCard,
  isLoadingDeleteCard,
  onOpenPopup,
  onClosePopup,
  popup,
  setPopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Abrir imagem no popup
  const handleImageClick = useCallback(
    (imageComponent) => {
      setPopup(imageComponent);
    },
    [setPopup],
  );

  const editProfilePopup = useMemo(
    () => ({
      type: "editProfile",
      title: "Editar perfil",
    }),
    [],
  );

  const editAvatarPopup = useMemo(
    () => ({
      type: "editAvatar",
      title: "Alterar a foto do perfil",
    }),
    [],
  );

  const newCardPopup = useMemo(
    () => ({
      type: "newCard",
      title: "Novo Local",
    }),
    [],
  );

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-update"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__avatar-update-img"
              src={pencil}
              alt="Lápis para atualizar avatar"
            />
          </button>
        </div>
        <div className="profile__container">
          <div className="profile__description">
            <p className="profile__name">{currentUser.name}</p>

            <button
              className="profile__button-edit"
              type="button"
              onClick={() => onOpenPopup(editProfilePopup)}
            >
              <img
                className="profile__button-edit-img"
                src={pencil}
                alt="Lapis para edição"
              />
            </button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>

        <button
          className="profile__button-add"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            className="profile__button-add-img"
            src={plus}
            alt="Adicionar novo local"
          />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onTrashClick={onOpenPopup}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.type === "editProfile" && (
            <EditProfile
              isLoadingUserInfo={isLoadingUserInfo}
              key={currentUser?._id || currentUser?.name || "edit-profile"}
            />
          )}
          {popup.type === "editAvatar" && (
            <EditAvatar isLoadingAvatar={isLoadingAvatar} />
          )}
          {popup.type === "newCard" && (
            <NewCard
              isLoadingAddCard={isLoadingAddCard}
              onClose={onClosePopup}
              onAddPlaceSubmit={onAddPlaceSubmit}
            />
          )}
          {popup.type === "delete" && (
            <RemoveCard
              onRemoveCardSubmit={onCardDelete}
              card={popup.card}
              isLoadingDeleteCard={isLoadingDeleteCard}
            />
          )}
          {!popup.type && popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
