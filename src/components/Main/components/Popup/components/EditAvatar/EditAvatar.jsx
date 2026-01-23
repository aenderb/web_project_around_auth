import { useState, useRef, useContext, useCallback } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {
  validateAvatarUrl,
  validateAvatarForm,
} from "@utils/avatarFormValidation.js";
import { CurrentUserContext } from "@contexts/CurrentUserContext.js";

const INITIAL_STATE = {
  avatarUrl: "",
  avatarError: "",
};

function EditAvatarPopup({ isLoadingAvatar, isOpen, onClose }) {
  const avatarInputRef = useRef();
  const [avatarUrl, setAvatarUrl] = useState(INITIAL_STATE.avatarUrl);
  const [avatarError, setAvatarError] = useState(INITIAL_STATE.avatarError);

  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleClose = () => {
    // Reseta os campos ao fechar
    setAvatarUrl(INITIAL_STATE.avatarUrl);
    setAvatarError(INITIAL_STATE.avatarError);
    if (avatarInputRef.current) {
      avatarInputRef.current.value = INITIAL_STATE.avatarUrl;
    }
    onClose();
  };

  const handleAvatarChange = () => {
    const value = avatarInputRef.current.value;
    setAvatarUrl(value);
    const error = validateAvatarUrl(value);
    setAvatarError(error);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const value = avatarInputRef.current.value;
      const validation = validateAvatarForm(value);

      if (validation.isValid) {
        handleUpdateAvatar({
          avatar: value,
        });
      } else {
        setAvatarError(validation.urlError);
      }
    },
    [handleUpdateAvatar],
  );

  // Verifica se o formulário é válido
  const isFormValid = avatarUrl.trim() && !avatarError;

  if (!isOpen) return null;

  return (
    <PopupWithForm
      title="Alterar a foto do perfil"
      name="edit-avatar"
      buttonText="Salvar"
      onSubmit={handleSubmit}
      onClose={handleClose}
      isLoading={isLoadingAvatar}
      isValid={isFormValid}
    >
      <label className="popup__field popup__field-avatar">
        <input
          type="url"
          className={`popup__input ${
            avatarError ? "popup__input_type_error" : ""
          }`}
          id="link-avatar-input"
          name="avatar"
          placeholder="Link do avatar"
          ref={avatarInputRef}
          onChange={handleAvatarChange}
          required
        />
        <span
          className={`popup__input-error ${
            avatarError ? "popup__error_visible" : ""
          }`}
        >
          {avatarError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
