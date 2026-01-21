import { useState, useRef, useContext, useCallback } from "react";
import {
  validateAvatarUrl,
  validateAvatarForm,
} from "../../../../../../utils/avatarFormValidation.js";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";

function EditAvatar({ isLoadingAvatar }) {
  const avatarInputRef = useRef();
  const [avatarError, setAvatarError] = useState("");

  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleAvatarChange = () => {
    const value = avatarInputRef.current.value;

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
    [handleUpdateAvatar]
  );

  return (
    <form
      className="popup__form"
      id="update-avatar-form"
      onSubmit={handleSubmit}
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
      <button
        type="submit"
        className="popup__button popup__button-avatar"
        disabled={isLoadingAvatar}
      >
        {isLoadingAvatar ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}

export default EditAvatar;
