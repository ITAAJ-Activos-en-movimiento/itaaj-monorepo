import { ChangeEvent, DetailedHTMLProps, FormEvent, InputHTMLAttributes, useRef, useState } from "react";
import { useSnackbar } from "@/shared/snackbar/Snackbar";
import { RecoverAccount } from "@/services";
import styles from "../../KYCModal.module.css";

type CodeState = {
  digit_0: string;
  digit_1: string;
  digit_2: string;
  digit_3: string;
  digit_4: string;
  digit_5: string;
};

export const Recover = ({ setOpenModal, setStateFormAuth }: { 
  setOpenModal: (key: boolean) => void,
  setStateFormAuth: (key: string) => void,
}) => {
  const [code, setCode] = useState<CodeState>({
    digit_0: '',
    digit_1: '',
    digit_2: '',
    digit_3: '',
    digit_4: '',
    digit_5: ''
  })
  const snackbar = useSnackbar()
  const form = useRef(null);
  const [user, setUser] = useState({ email: "", isSend: false });

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((user) => ({ ...user, [name]: value || checked }));
  };

  const validFields = () => {
    if (!user.email) {
      snackbar.warning({ message: "El campo Email está vacio." });
      return false;
    }

    return true;
  }
  
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!validFields()) return;
    
    try {
      const { email } = user;
      const response = await RecoverAccount({ email });
      const { message } = response;
      snackbar.success({ message, title: '¡Fue un éxito!' })
    } catch (error: any) {
      const { message } = error;
      snackbar.warning({ message, title: '¡Advertencia!' })  
    }
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    if (value.length <= 1 && /^\d+$/.test(value)) {
      const nextInput: HTMLInputElement = document.querySelector(`input[name=${getNextInputName(name)}]`) as HTMLInputElement;
      setCode((val) => ({ ...val, [name]: value }))
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  const getNextInputName = (currentName: string) => {
    const currentIndex = parseInt(currentName.substr(currentName.length - 1));
    const nextIndex = currentIndex + 1;
    return `digit_${nextIndex}`;
  };

  const handleFocus = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const event = e as unknown as ChangeEvent<HTMLInputElement>;
    const input = event.target;
    input.select();
  };

  return (
    <div className={styles.account}>
      <h3>Recuperar cuenta</h3>
      {
        user.isSend === true &&
        <form ref={form}>
          <div className={styles.boxInputCode}>
            {
              [0,1,2,3,4,5].map(item => (
                <input
                  type="number" 
                  maxLength={1} 
                  min={0} 
                  max={9} 
                  onChange={handleNumberChange} 
                  onFocus={handleFocus} 
                  name={`digit_${item}`}
                  value={code[`digit_${item}` as keyof CodeState]}
                />
              ))
            }
          </div>
          <button
            type="submit"
            className={styles.buton}
          >
            Validar Codigo
          </button>
        </form>
      }

      {
        user.isSend === false &&
        <form onSubmit={sendEmail}>
          <div className={styles.field}>
            <input
              type="email"
              name="email"
              onChange={handleChangeUser}
              placeholder="Ingrese su Correo electrónico"
            />
          </div>
          <div className={styles.terms}>
            <p>
              {" "}
              * Ingrese su correo electrónico que está asociada a la cuenta de <b>Itaaj realty</b>
            </p>
          </div>
          <button
            type="submit"
            className={styles.buton}
          >
            Enviar Email
          </button>
          <span
            onClick={() => setStateFormAuth("LOGIN")}
            className={styles.textRegister}
          >
            Volver
          </span>
        </form>
      }
    </div>
  )
}