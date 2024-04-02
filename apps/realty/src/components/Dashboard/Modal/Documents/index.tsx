import Modal from "react-modal";
import styles from './Documents.module.css'
import { downloadFiles } from "@/utils/download";

interface DocumentsProps {
  openModal: boolean
  setOpenModal: (prop: boolean) => void
}

const Documents = ({ openModal, setOpenModal }: DocumentsProps) => {
  const closeModal = () => setOpenModal(false);

  const handleDownloadFiles = async () => {
    const arrFilesPath: string[] = [
      '/FORMATO COMISION COMPARTIDA.docx',
      '/FORMATO COMISION COMPARTIDA.pdf',
    ]
    
    await downloadFiles(arrFilesPath);
  }

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Contacto"
      portalClassName={styles.modalDocuments}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        content: {
          width: "70rem",
          height: "30rem",
          margin: "auto", // Center the modal horizontally
          padding: "0px",
          border: "none",
        },
      }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2>Documentos</h2>
          </div>
        </div>
        <div className={styles.body}>
          <div>
            <p>Descargue y revise los siguientes documentos:</p>
          </div>
          <ul className={styles.documents}>
            <li className={styles.documentButton} onClick={handleDownloadFiles}>
              <p><b>Contrato de Comisio Mercantil</b></p> {/* SOLO PARA BROKERS */}
            </li>
          </ul>
          {/* <div>
            <p>Una vez que haya terminado de descargar, haga clic en el botón a continuación para reconocer que ha revisado estos documentos. Necesitará usar su billetera para completar este paso.</p>
          </div> */}
        </div>
        {/* <div className={styles.footer}>
          <button disabled>Reconocer con Wallet</button>
        </div> */}
      </div>
    </Modal>
  )
}

export default Documents;