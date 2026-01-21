function RemoveCard({ onRemoveCardSubmit, card, isLoadingDeleteCard }) {
  function handleRemoveCardSubmit(e) {
    e.preventDefault();
    onRemoveCardSubmit(card);
  }

  return (
    <form
      className="popup__form"
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
  );
}

export default RemoveCard;
