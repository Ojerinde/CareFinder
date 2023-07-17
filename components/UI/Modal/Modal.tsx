import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

const Backdrop: React.FC<ModalProps> = ({ onClose }) => {
  return <div onClick={onClose} className={classes.backdrop}></div>;
};

const Overlay: React.FC<ModalProps> = ({ children }) => {
  return <div className={classes.overlay}>{children}</div>;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, document.body)}
      {ReactDOM.createPortal(<Overlay>{children} </Overlay>, document.body)}
    </React.Fragment>
  );
};
export default Modal;
