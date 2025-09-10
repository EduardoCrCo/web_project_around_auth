import { useEffect } from "react";

export default function Popup(props) {
  const { children, onClose, customClassName } = props;

  const handleEsc = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const mouseClick = (event) => {
    if (event.target.classList.contains("popup__overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", mouseClick);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", mouseClick);
    };
  }, []);

  return (
    <div className="popup popup_opened">
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__content">
        <div className={`popup__body ${customClassName}`}>
          <button className="popup__close-button" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
