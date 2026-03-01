import Modal from "react-modal";
import styles from './VerifyIdentity.module.css';

interface VerifyIdentityProps {
  openModal: boolean
  setOpenModal: (prop: boolean) => void
}

const VerifyIdentity = ({ openModal, setOpenModal }: VerifyIdentityProps) => {
  const closeModal = () => setOpenModal(false);
  
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Contacto"
      portalClassName={styles.modalVerifyIdentity}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        content: {
          width: "60rem",
          height: "50rem",
          margin: "auto", // Center the modal horizontally
          padding: "0px",
          border: "none",
        },
      }}
    >
      {/* <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2>Verificar Identidad</h2>
          </div>
        </div>
        <div className={styles.body}>
          <form action="" className={styles.form}>
            <section className={styles.gridForm}>
              <div className={styles.field}>
                <label htmlFor="domicilio">Domiclio</label>
                <input type="text" name="domicilio" id="domicilio" />
              </div>
              <div className={styles.field}>
                <label htmlFor="pdfCredencial">PDF Pasaporte</label>
                <input type="text" name="domicilio" id="pdfCredencial" />
              </div>
              <div className={styles.field}>
                <label htmlFor="pdfCredencial">Ciudad/Colonia</label>
                <input type="text" name="domicilio" id="pdfCredencial" />
              </div>
              <div className={styles.field}>
                <label htmlFor="pdfCredencial">País</label>
                <input type="text" name="domicilio" id="pdfCredencial" />
              </div>
              <div className={styles.field}>
                <label htmlFor="pdfCredencial">Alcaldía/State</label>
                <input type="text" name="domicilio" id="pdfCredencial" />
              </div>
              <div className={styles.field}>
                <label htmlFor="pdfCredencial">Código Postal</label>
                <input type="text" name="domicilio" id="pdfCredencial" />
              </div>
            </section>
          </form>
        </div>
        <div className={styles.footer}>
          <button>Verificar</button>
        </div>
      </div> */}
    </Modal>
  )
}

export default VerifyIdentity