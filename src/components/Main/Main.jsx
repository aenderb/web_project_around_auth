import { useCallback, useContext, useMemo } from "react";
import pencil from "../../images/Pencil.svg";
import plus from "../../images/Plus.svg";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import AddPlacePopup from "./components/Popup/components/AddPlacePopup/AddPlacePopup.jsx";
import EditProfilePopup from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatarPopup from "./components/Popup/components/EditAvatar/EditAvatar";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import ConfirmDeletePopup from "./components/Popup/components/RemoveCard/removeCard.jsx";
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

      {/* Popups específicos */}
      <EditProfilePopup
        isOpen={popup?.type === "editProfile"}
        onClose={onClosePopup}
        isLoadingUserInfo={isLoadingUserInfo}
      />

      <EditAvatarPopup
        isOpen={popup?.type === "editAvatar"}
        onClose={onClosePopup}
        isLoadingAvatar={isLoadingAvatar}
      />

      <AddPlacePopup
        isOpen={popup?.type === "newCard"}
        onClose={onClosePopup}
        onAddPlaceSubmit={onAddPlaceSubmit}
        isLoadingAddCard={isLoadingAddCard}
      />

      <ConfirmDeletePopup
        card={popup?.type === "delete" ? popup.card : null}
        onRemoveCardSubmit={onCardDelete}
        isLoadingDeleteCard={isLoadingDeleteCard}
        onClose={onClosePopup}
      />

      {popup && !popup.type && (
        <ImagePopup image={popup} onClose={onClosePopup} />
      )}
    </main>
  );
}

export default Main;
