import Popup from "../../Popup";

function ConfirmDeletePopup({
  onRemoveCardSubmit,
  card,
  isLoadingDeleteCard,
  onClose,
}) {
  function handleRemoveCardSubmit(e) {
    e.preventDefault();
    onRemoveCardSubmit(card);
  }

  if (!card) return null;

  return (
    <Popup title="Tem certeza?" onClose={onClose}>
      <form
        className="popup__form popup__form_type_confirm"
        name="delete-confirmation"
        onSubmit={handleRemoveCardSubmit}
      >
        <button
          className="popup__button popup__button-confirm"
          type="submit"
          disabled={isLoadingDeleteCard}
        >
          {isLoadingDeleteCard ? "Excluindo..." : "Sim"}
        </button>
      </form>
    </Popup>
  );
}

export default ConfirmDeletePopup;
