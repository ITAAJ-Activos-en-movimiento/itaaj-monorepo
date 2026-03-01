import { useState } from "react";
import styles from "../../KYCModal.module.css";
import { Login as actionLogin } from "@/services";
import { useRouter } from "next/navigation";
import useAuthContext from "@/shared/hooks/useAuthContext";

export const Login = ({ setOpenModal, setStateFormAuth }: { 
  setOpenModal: (key: boolean) => void,
  setStateFormAuth: (key: string) => void,
}) => {
  const { action } = useAuthContext()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((user) => ({ ...user, [name]: value || checked }));
  };

  const validFields = () => {
    if (!user.email) {
      alert("Email vacio");
      return false;
    }
    if (!user.password) {
      alert("Contraseña vacia");
      return false
    }

    return true;
  }

  const handleClickLogin = async () => {
    const data = { email: user.email, password: user.password };
    if (!validFields()) return;
    try {
      await action.login(data);
      document.body.style.overflow = "auto";
      setOpenModal(false);
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className={styles.account}>
      <h3>Accede a tu cuenta</h3>
      <div className={styles.field}>
        <input
          type="email"
          name="email"
          onChange={handleChangeUser}
          placeholder="Correo electrónico"
          />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          name="password"
          onChange={handleChangeUser}
          placeholder="Contraseña"
        />
      </div>
      <button
        type="button"
        className={styles.buton}
        onClick={handleClickLogin}
      >
        Iniciar sesión
      </button>
      <span
        onClick={() => setStateFormAuth("REGISTER")}
        className={styles.textRegister}
      >
        No tengo cuenta y quiero registrarme
      </span>
    </div>
  )
}