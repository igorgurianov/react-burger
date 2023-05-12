import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, onClose }) => {
  useEffect(() => {
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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
