import "./InfoTooltip.css ";

const InfoTooltip = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div className="info-tooltip__overlay" onClick={onClose}>
      <div
        className="info-tooltip__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="info-tooltip__close" onClick={onClose}>
          X
        </button>
        <p className="info-tooltip__message">{message}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
