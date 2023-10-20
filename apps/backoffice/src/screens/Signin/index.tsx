import Field from "@/components/Shared/Field";
import styles from "./Signin.module.css";
import Input from "@/components/Shared/Input";
import { Lock, User } from "react-feather";
const Signin = () => {
  return (
    <div className={styles.container}>
      <form>
        <h2>Welcome</h2>
        <p>Login with your username and password</p>

        <Field label="Username">
          <Input icon={<User size={30} />} placeholder="Username" />
        </Field>
        <Field label="Password">
          <Input
            icon={<Lock size={30} />}
            type="password"
            placeholder="Password"
          />
        </Field>
        <button className={styles.login}>Log In</button>
      </form>
    </div>
  );
};

export default Signin;
