import { useState, useCallback } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import {
  validateAddPlaceForm,
  validateCardTitle,
  validateCardImageUrl,
} from "@utils/addPlaceFormValidation.js";

const INITIAL_STATE = {
  title: "",
  url: "",
  titleError: "",
  urlError: "",
};

function AddPlacePopup({
  onAddPlaceSubmit,
  isLoadingAddCard,
  isOpen,
  onClose,
}) {
  const [title, setTitle] = useState(INITIAL_STATE.title);
  const [url, setUrl] = useState(INITIAL_STATE.url);
  const [titleError, setTitleError] = useState(INITIAL_STATE.titleError);
  const [urlError, setUrlError] = useState(INITIAL_STATE.urlError);

  const handleClose = () => {
    // Reseta os campos ao fechar
    setTitle(INITIAL_STATE.title);
    setUrl(INITIAL_STATE.url);
    setTitleError(INITIAL_STATE.titleError);
    setUrlError(INITIAL_STATE.urlError);
    onClose();
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    const error = validateCardTitle(value);
    setTitleError(error);
  };

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setUrl(value);
    const error = validateCardImageUrl(value);
    setUrlError(error);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { name, link } = e.target;
      const validation = validateAddPlaceForm(name.value, link.value);

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
    [onAddPlaceSubmit],
  );

  // Verifica se o formulário é válido
  const isFormValid = title.trim() && url.trim() && !titleError && !urlError;

  if (!isOpen) return null;

  return (
    <PopupWithForm
      title="Novo local"
      name="add-place"
      buttonText="Criar"
      onSubmit={handleSubmit}
      onClose={handleClose}
      isLoading={isLoadingAddCard}
      isValid={isFormValid}
    >
      <label className="popup__field">
        <input
          type="text"
          className={`popup__input ${
            titleError ? "popup__input_type_error" : ""
          }`}
          id="title-card-input"
          name="name"
          value={title}
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
          value={url}
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
    </PopupWithForm>
  );
}

export default AddPlacePopup;
