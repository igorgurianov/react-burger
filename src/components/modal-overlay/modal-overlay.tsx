import { FC } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
  return <div onClick={() => onClose()} className={styles.overlay}></div>;
};

export default ModalOverlay;
