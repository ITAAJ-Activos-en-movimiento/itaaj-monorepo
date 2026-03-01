import styles from "./KYCModal.module.css";
import Modal from "react-modal";
import { Register } from "./components/auth/Register";
import { ReactElement, ReactNode, useState } from "react";
import { Login } from "./components/auth/Login";

interface KYCModalProps {
  openModal: boolean;
  setOpenModal: (key: boolean) => void;
}

const KYCModal = ({ openModal, setOpenModal }: KYCModalProps) => {
  const [stateFormAuth, setStateFormAuth] = useState("LOGIN");

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setOpenModal(false);
  };

  const formAuth: { [key: string]: ReactNode } = {
    "LOGIN": <Login setOpenModal={setOpenModal} setStateFormAuth={setStateFormAuth} />,
    "REGISTER": <Register setOpenModal={setOpenModal} setStateFormAuth={setStateFormAuth} />
  }

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Contacto"
      portalClassName={styles.modalPortalKYC}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        content: {
          width: "45rem",
          height: "53rem",
          margin: "auto", // Center the modal horizontally
          padding: "0px",
          border: "none",
        },
      }}
    >
      {/* { formAuth[stateFormAuth] } */}
    </Modal>
  );
};

export default KYCModal;
