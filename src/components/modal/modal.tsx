import { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { TModalRoot } from "../../services/types/data";

interface IModal {
  children: ReactNode;
  onClose: () => void;
}

const modalRoot: TModalRoot = document.getElementById("react-modals")!;

const Modal: FC<IModal> = ({ children, onClose }) => {
  useEffect(() => {
    const closePopup = (evt: KeyboardEvent) => {
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
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
