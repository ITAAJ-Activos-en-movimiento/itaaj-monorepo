import { Button, Field, Input } from "@/components";
import { useCreateLead, useEditLead, useForm, useFunnel } from "@/hooks";
import styles from "./Form.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Lead, Stage } from "@itaaj/entities";

interface Props {
  leadToEdit?: Partial<Lead>;
  onCloseModal?: () => void;
  setOpen: (isOpen: boolean) => void;
}

const OpportunityForm = ({ leadToEdit = {}, onCloseModal, setOpen }: Props) => {
  console.log("VALORES", leadToEdit);
  const { funnel } = useFunnel();
  const { id: funnelId } = funnel;

  const { isCreating, createLead } = useCreateLead();
  const { isEditing, editLead } = useEditLead();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = leadToEdit;
  const isEditSession = Boolean(editId);

  const {
    formState: leadData,
    handleChange,
    setFormState,
  } = useForm<Partial<Lead>>(
    isEditSession
      ? editValues
      : {
          name: "",
          email: "",
          state: "",
          phone: "",
          type: "",
          gender: "",
          reporter: "",
          lead_status: "",
          property: "",
          city: "",
          country: "",
          source: "",
          userId: "",
          funnelId: "",
          contactId: "",
          contactName: "",
          person: "",
          personName: "",
          currency: "",
          value: 0,
          potential: 0,
          dueDate: "",
          stageId: "",
          position: 0,
        }
  );

  const [reporter, setReporter] = useState(leadData.reporter || "");

  const [selectedStage, setSelectedStage] = useState(leadData.stageId || "");

  const initialActiveStages = funnel.stages.map(
    (_stage, index) =>
      index <= funnel.stages.findIndex((s) => s.name === leadData.stageId)
  );
  const [activeStages, setActiveStages] = useState(initialActiveStages);

  const handleClick = (indexId: number) => {
    setFormState((prev) => ({
      ...prev,
      funnelId: funnelId,
    }));

    const nuevosBotonesActivos = activeStages.map(
      (_v, index) => index <= indexId
    );
    setActiveStages(nuevosBotonesActivos);
    setSelectedStage(funnel.stages[indexId].name);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setReporter(value);
    setFormState((prev) => ({
      ...prev,
      reporter: value,
    }));
  };

  console.log(reporter);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    if (isEditSession) {
      editLead(
        {
          ...leadData,
          reporter,
          id: leadToEdit.id,
          stageId: selectedStage,
        },
        {
          onSuccess() {
            onCloseModal?.();
          },
        }
      );
    } else {
      createLead(
        {
          ...leadData,
          stageId: selectedStage,
        },
        {
          onSuccess() {
            onCloseModal?.();
          },
        }
      );
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!isEditSession) {
      setActiveStages((activeStages) => {
        activeStages[0] = true;
        return [...activeStages];
      });
    }
  }, [isEditSession]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Field label="Nombre">
        <Input
          name="contactName"
          value={leadData.contactName}
          onChange={handleChange}
        />
      </Field>

      <div className={styles.col}>
        <Field label="Numero de contacto">
          <Input
            type="number"
            name="phone"
            value={leadData.phone}
            onChange={handleChange}
          />
        </Field>

        <Field label="Correo de contacto">
          <Input name="email" value={leadData.email} onChange={handleChange} />
        </Field>
      </div>

      <Field label="Empresa">
        <Input name="name" value={leadData.name} onChange={handleChange} />
      </Field>

      <Field label="Propiedad">
        <Input
          value={leadData.property}
          name="property"
          onChange={handleChange}
          placeholder=""
        />
      </Field>

      <div className={styles.col}>
        <Field label="Valor de la oportunidad">
          <Input
            name="value"
            type="number"
            value={leadData.value}
            onChange={handleChange}
            placeholder=""
          />
        </Field>

        <Field label="Moneda">
          <Input
            name="currency"
            value={leadData.currency}
            onChange={handleChange}
          />
        </Field>
      </div>
      <Field label="Etapa del embudo">
        <div
          className={styles.stage}
          style={{
            gridTemplateColumns: `repeat( ${funnel.stages.length},1fr)`,
          }}
        >
          {funnel.stages.map((stage: Stage, index: number) => (
            <button
              className={activeStages[index] ? styles.active : ""}
              key={stage.name}
              onClick={() => handleClick(index)}
              type="button"
            >
              {stage.name}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Asignado a">
        <select
          name="reporter"
          value={reporter}
          onChange={handleSelectChange}
          style={{
            color:
              leadData.userId && leadData?.userId?.length > 0
                ? "rgba(0,0,0,0.8)"
                : "rgba(0,0,0,0.5)",
          }}
        >
          <option value="">"Sin asignar</option>
          <option value="Pável Chalini">Pável Chalini</option>
          <option value="Maria Lujan">Maria Lujan</option>
          <option value="Axel">Axel</option>
          <option value="Nestor Mosquera">Nestor Mosquera</option>
        </select>
      </Field>

      <div className={styles.col}>
        <Field label="Fecha de cierre prevista">
          <Input
            type="date"
            name="dueDate"
            value={leadData.dueDate}
            onChange={handleChange}
            placeholder="Selecciona empresa"
          />
        </Field>
        <Field label="Probabilidad de la oportunidad">
          <Input
            type="number"
            value={leadData.potential}
            name="potential"
            onChange={handleChange}
          />
        </Field>
      </div>

      <div>
        <Button loading={isWorking}> Guardar </Button>
      </div>
    </form>
  );
};

export default OpportunityForm;
