import { useState, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {
  validateName,
  validateAbout,
  validateProfileForm,
} from "../../../../../../utils/profileFormValidation.js";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";

function EditProfilePopup({ isLoadingUserInfo, isOpen, onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  // Usa os valores de currentUser como valor inicial
  const [name, setName] = useState(currentUser.name || "");
  const [about, setAbout] = useState(currentUser.about || "");

  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");

  const handleClose = () => {
    // Reseta os campos para os valores originais ao fechar
    setName(currentUser.name || "");
    setAbout(currentUser.about || "");
    setNameError("");
    setAboutError("");
    onClose();
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    const error = validateName(value);
    setNameError(error);
  };

  const handleAboutChange = (event) => {
    const value = event.target.value;
    setAbout(value);
    const error = validateAbout(value);
    setAboutError(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateProfileForm(name, about);

    if (validation.isValid) {
      handleUpdateUser({
        name,
        about,
      });
    } else {
      setNameError(validation.nameError);
      setAboutError(validation.aboutError);
    }
  };

  // Verifica se o formulário é válido
  const isFormValid = name.trim() && about.trim() && !nameError && !aboutError;

  if (!isOpen) return null;

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit-profile"
      buttonText="Salvar"
      onSubmit={handleSubmit}
      onClose={handleClose}
      isLoading={isLoadingUserInfo}
      isValid={isFormValid}
    >
      <label className="popup__field">
        <input
          type="text"
          className={`popup__input ${
            nameError ? "popup__input_type_error" : ""
          }`}
          id="profile-name-input"
          name="name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span
          className={`popup__input-error ${
            nameError ? "popup__error_visible" : ""
          }`}
        >
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          className={`popup__input ${
            aboutError ? "popup__input_type_error" : ""
          }`}
          id="profile-about-input"
          name="about"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
          value={about}
          onChange={handleAboutChange}
        />
        <span
          className={`popup__input-error ${
            aboutError ? "popup__error_visible" : ""
          }`}
        >
          {aboutError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
