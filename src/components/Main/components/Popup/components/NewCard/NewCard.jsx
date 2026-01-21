import { useState, useCallback } from "react";
import {
  validateNewCardForm,
  validateCardTitle,
  validateCardImageUrl,
} from "../../../../../../utils/newCardFormValidation.js";
function NewCard({ onAddPlaceSubmit, isLoadingAddCard }) {
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");

  const handleTitleChange = (event) => {
    const value = event.target.value;

    const error = validateCardTitle(value);
    setTitleError(error);
  };

  const handleUrlChange = (event) => {
    const value = event.target.value;

    const error = validateCardImageUrl(value);
    setUrlError(error);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { name, link } = e.target;
      const validation = validateNewCardForm(name.value, link.value);

      if (validation.isValid) {
        onAddPlaceSubmit({
          name: name.value,
          link: link.value,
        });
      } else {
        setTitleError(validation.titleError);
        setUrlError(validation.urlError);
      }
    },
    [onAddPlaceSubmit]
  );

  return (
    <form
      className="popup__form"
      id="insert-card-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className={`popup__input ${
            titleError ? "popup__input_type_error" : ""
          }`}
          id="title-card-input"
          name="name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          onChange={handleTitleChange}
          required
        />
        <span
          className={`popup__input-error ${
            titleError ? "popup__error_visible" : ""
          }`}
        >
          {titleError}
        </span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className={`popup__input ${
            urlError ? "popup__input_type_error" : ""
          }`}
          id="link-card-input"
          name="link"
          placeholder="Link da imagem"
          onChange={handleUrlChange}
          required
        />

        <span
          className={`popup__input-error ${
            urlError ? "popup__error_visible" : ""
          }`}
        >
          {urlError}
        </span>
      </label>
      <button
        type="submit"
        className="popup__button"
        disabled={isLoadingAddCard}
      >
        {isLoadingAddCard ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}

export default NewCard;
