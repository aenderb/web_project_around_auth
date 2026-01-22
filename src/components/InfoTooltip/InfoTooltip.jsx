import { useEffect } from "react";
import successIcon from "../../images/success-icon.svg";
import errorIcon from "../../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close-button" type="button" onClick={onClose}>
          &times;
        </button>
        <div className="popup__icon-container">
          <img
            className="popup__status-icon"
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? "Sucesso" : "Erro"}
          />
        </div>
        <p className="popup__status-message">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
