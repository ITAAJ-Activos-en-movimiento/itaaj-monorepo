// ViewOpportunityModal.js
import React from "react";
import styles from "./ViewOpportunityModal.module.css";
import { DivisaFormater } from "@/utilities";
import { Lead } from "@itaaj/entities";
import OpportunityModal from "../OpportunityForm";
import Button from "../../../../../components/Shared/Button/index";
// import { deleteLeadApi } from "@/services";
import { useDeleteLead } from "@/hooks";

interface ViewOpportunityModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onClose: () => void;
  lead: Partial<Lead> | null;
}

const ViewOpportunityModal: React.FC<ViewOpportunityModalProps> = ({
  isOpen,
  setOpen,
  onClose,
  lead,
}) => {
  const { deleteLead } = useDeleteLead();
  if (!isOpen || !lead) return null;

  const handleDelete = async (id: string) => {
    deleteLead(id);
    setOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Detalles de la Oportunidad</h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>Información General</h4>
            <div className={styles.field}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{lead.contactName}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Número de contacto:</span>
              <span className={styles.value}>{lead.phone}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Correo de contacto:</span>
              <span className={styles.value}>{lead.email}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Empresa:</span>
              <span className={styles.value}>{lead.name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Propiedad:</span>
              <span className={styles.value}>{lead.property}</span>
            </div>
          </div>
          <div className={styles.section}>
            <h4>Detalles de la Oportunidad</h4>
            <div className={styles.field}>
              <span className={styles.label}>Valor de la oportunidad:</span>
              <span className={styles.value}>
                {DivisaFormater({
                  value: lead.value!,
                  currency: lead.currency,
                })}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Moneda:</span>
              <span className={styles.value}>{lead.currency}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Etapa del embudo:</span>
              <span className={styles.value}>{lead.stageId}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Asignado a:</span>
              <span className={styles.value}>{lead.reporter}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Fecha de cierre prevista:</span>
              <span className={styles.value}>{lead.dueDate}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>
                Probabilidad de la oportunidad:
              </span>
              <span className={styles.value}>{lead.potential}%</span>
            </div>
          </div>
        </div>
        <div className={styles.footer_oportunity_vs}>
          <Button variant="delete" onClick={() => handleDelete(lead.id!)}>
            Eliminar
          </Button>
          <OpportunityModal
            isEditing={true}
            leadToEdit={lead}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewOpportunityModal;
