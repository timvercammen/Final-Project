import React from "react";

const ImgFullModal = ({ closeModal, clickedImg }) => {
  return (
    <div className="ImgModal">
      <div className="ImgModal__modal">
        <div className="ImgModal__modal__closeBtn">
          <button
            className="ImgModal__modal__closeBtn__btn"
            onClick={() => closeModal(false)}
          >
            X
          </button>
        </div>
        <div className="ImgModal__modal__img">
          <img src={clickedImg} />
        </div>
      </div>
    </div>
  );
};

export default ImgFullModal;
