import { useRef, useState } from "react";
import styles from "../../KYCModal.module.css";
import {
  StepAdditionalData,
  StepConnectToWallet,
  StepRegisterAccount,
  StepSelectRole,
} from "../FormRegister";

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

export const Register = ({ setOpenModal, setStateFormAuth }: { 
  setOpenModal: (key: boolean) => void,
  setStateFormAuth: (key: string) => void,
}) => {
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
  
  const handleChangeStep = (step: number): void => {
    if (!refContentStep?.current) return;
    const contentStep: HTMLElement = refContentStep?.current;
    contentStep.scrollLeft += contentStep?.offsetWidth;
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const valUser = type === 'checkbox' ? checked : value;
    setUser((user) => ({ ...user, [name]: valUser }));
  };
  
  return (
    <div ref={refContentStep} className={styles.contentStepKYC}>
      <StepRegisterAccount
        moveStep={handleChangeStep}
        user={user}
        handleChangeUser={handleChangeUser}
        setStateFormAuth={setStateFormAuth}
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
  )
}