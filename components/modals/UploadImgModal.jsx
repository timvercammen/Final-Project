import React from "react";
import Drop from "../drop";

const UploadImgModal = ({ closeModal, travId }) => {
  return (
    <div className="modalBg">
      <div className="modalBg__modal">
        <div className="modalBg__modal__closeBtn">
          <button
            className="modalBg__modal__closeBtn__btn"
            onClick={() => closeModal(false)}
          >
            X
          </button>
        </div>
        <div className="modalBg__modal__title">
          <h2>New UploadImg</h2>
        </div>
        <div className="modalBg__modal__form">
          <div className="modalBg__modal__form__drop">
            <h4>Add Photos</h4>
            <Drop id={travId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImgModal;
