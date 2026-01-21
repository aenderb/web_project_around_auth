import { useEffect } from "react";
function Popup(props) {
  const { title, children, onClose } = props;

  // Fechar com ESC
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <div className="popup" onClick={onClose}>
      <div
        className={`popup__container ${
          !title ? "popup__container_type_photo" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup__close-button" type="button" onClick={onClose}>
          &times;
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
