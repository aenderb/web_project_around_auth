import React from "react";

import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
function Card({ card, onCardLike, onImageClick, onTrashClick }) {
  const imageComponent = {
    title: null,
    children: <ImagePopup card={card} />,
  };

  const removeCardPopup = {
    type: "delete",
    title: "Tem certeza?",
    card,
  };

  const cardLikeButtonClassName = `card__like-button ${
    card.isLiked ? "card__like-button_active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="card">
      <button
        className="card__remove-button"
        onClick={() => onTrashClick(removeCardPopup)}
      ></button>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onImageClick(imageComponent)}
      />
      <div className="card__description">
        <h3 className="card__title">{card.name}</h3>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          type="button"
        ></button>
      </div>
    </li>
  );
}
export default React.memo(Card);
