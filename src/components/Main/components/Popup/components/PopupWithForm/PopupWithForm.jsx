import Popup from "../../Popup";

function PopupWithForm({
  title,
  name,
  children,
  buttonText = "Salvar",
  onSubmit,
  onClose,
  isLoading = false,
  isValid = true,
}) {
  return (
    <Popup title={title} onClose={onClose}>
      <form
        className={`popup__form popup__form_type_${name}`}
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button
          type="submit"
          className={`popup__button ${isLoading || !isValid ? "popup__button_disabled" : ""}`}
          disabled={isLoading || !isValid}
        >
          {isLoading ? "Salvando..." : buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
