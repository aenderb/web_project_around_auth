function ImagePopup(props) {
  const { card } = props;

  return (
    <>
      <img src={card.link} alt={card.name} className="popup__photo-img" />
      <p className="popup__photo-title">{card.name}</p>
    </>
  );
}
export default ImagePopup;
