import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Main from "../main/main";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, onClose, setActive }) => {
  React.useEffect(() => {
    const closePopup = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keyup", closePopup);
    return () => {
      document.removeEventListener("keyup", closePopup);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>{children}</div>
    </>,
    modalRoot
  );
};

export default Modal;
