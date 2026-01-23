import Popup from "../../Popup";

function ImagePopup({ image, onClose }) {
  if (!image) return null;

  return (
    <Popup onClose={onClose}>
      <img src={image.link} alt={image.name} className="popup__photo-img" />
      <p className="popup__photo-title">{image.name}</p>
    </Popup>
  );
}

export default ImagePopup;
