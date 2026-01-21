import { useState, useContext } from "react";
import {
  validateName,
  validateAbout,
  validateProfileForm,
} from "../../../../../../utils/profileFormValidation.js";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";
function EditProfile({ isLoadingUserInfo }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");

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
  return (
    <form className="popup__form" id="profile-form" onSubmit={handleSubmit}>
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
      <button
        type="submit"
        className="popup__button"
        disabled={isLoadingUserInfo}
      >
        {isLoadingUserInfo ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
export default EditProfile;
