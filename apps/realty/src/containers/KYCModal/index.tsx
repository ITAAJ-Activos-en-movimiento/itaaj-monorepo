import { useRef, useState } from "react";
import styles from "./KYCModal.module.css";
import Modal from "react-modal";
import {
  StepAdditionalData,
  StepConnectToWallet,
  StepRegisterAccount,
  StepSelectRole,
} from "./components/FormRegister";

interface KYCModalProps {
  openModal: boolean;
  setOpenModal: (key: boolean) => void;
}

export interface UserProps {
  name?: string
  lastname?: string
  email?: string
  phone?: string
  password?: string
  roleId?: number | null
  residence?: string
  identification?: string
  checkTerms?: boolean
}

const KYCModal = ({ openModal, setOpenModal }: KYCModalProps) => {
  const [role, setRole] = useState<"INVESTOR" | "BROKER" | null>(null);
  const [user, setUser] = useState<UserProps>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    roleId: null,
    residence: "",
    identification: "",
    checkTerms: false
  });

  const refContentStep = useRef(null);
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setOpenModal(false);
  };

  const handleChangeStep = (step: number): void => {
    if (!refContentStep?.current) return;
    const contentStep: HTMLElement = refContentStep?.current;
    contentStep.scrollLeft += contentStep?.offsetWidth;
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((user) => ({ ...user, [name]: value || checked }));
  };

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
          width: "40rem",
          height: "50rem",
          margin: "auto", // Center the modal horizontally
          padding: "0px",
          border: "none",
        },
      }}
    >
      <div ref={refContentStep} className={styles.contentStepKYC}>
        <StepRegisterAccount
          moveStep={handleChangeStep}
          user={user}
          handleChangeUser={handleChangeUser}
        />
        <StepConnectToWallet moveStep={handleChangeStep} />
        <StepSelectRole 
          moveStep={handleChangeStep}
          setRole={setRole}
          user={user}
          setUser={setUser}
        />
        <StepAdditionalData
          moveStep={handleChangeStep}
          handleChangeUser={handleChangeUser}
          setOpenModal={setOpenModal}
          user={user}
          role={role}
        />
      </div>
    </Modal>
  );
};

export default KYCModal;
