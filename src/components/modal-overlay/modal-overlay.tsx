import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: IModalOverlay) => {
  return <div onClick={() => onClose()} className={styles.overlay}></div>;
};

export default ModalOverlay;
