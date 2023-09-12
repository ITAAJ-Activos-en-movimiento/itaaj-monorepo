import styles from './Signin.module.css'

const Signin = () => {
  return (
    <div className={styles.container}>
        <form>
            <h2>Itaaj Realty</h2>
            <p>Login to Itaaj Admin</p>
            <input type="text" placeholder='Username' />
            <input type="password" placeholder='Password' />
            <button>Log In</button>
        </form>
    </div>
  )
}

export default Signin