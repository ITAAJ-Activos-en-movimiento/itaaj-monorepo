import { Button, Field, Input } from "@/components";
import { useCreateLead, useForm, useFunnel, useUsers } from "@/hooks";
import styles from "./Form.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Lead, Stage, User } from "@itaaj/entities";

interface Props {
  leadToEdit?: Partial<Lead>;
  onCloseModal?: () => void;
}

const OpportunityForm = ({ leadToEdit = {}, onCloseModal }: Props) => {
  const { funnel } = useFunnel();
  console.log("FUNNEL", funnel);
  const { id: funnelId } = funnel;

  const { users } = useUsers({});

  const { isCreating, createLead } = useCreateLead();
  const isWorking = isCreating;

  const { id: editId, ...editValues } = leadToEdit;
  const isEditSession = Boolean(editId);
  console.log(editValues);
  const {
    formState: leadData,
    handleChange,
    setFormState,
  } = useForm<Partial<Lead>>({
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
  });

  const [activeStages, setActiveStages] = useState(
    Array(funnel.stages.length).fill(false)
  );

  const [selectedStage, setSelectedStage] = useState("");
  console.log(setSelectedStage);

  const handleClick = (indexId: number, stage: Stage) => {
    console.log("EN EL HANDLECLICK", stage);
    setFormState((prev) => ({
      ...prev,
      funnelId: funnelId,
    }));

    const nuevosBotonesActivos = activeStages.map(
      (_v, index) => index <= indexId
    );
    setActiveStages(nuevosBotonesActivos);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("ETAPA", selectedStage);
    if (isEditSession) {
      //   editProduct(
      //     {
      //       id: leadToEdit.id,
      //       ...formState,
      //     },
      //     {
      //       onSuccess() {
      //         onCloseModal?.();
      //       },
      //     },
      //   );
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
  };

  useEffect(() => {
    setActiveStages((activeStages) => {
      activeStages[0] = true;
      return [...activeStages];
    });
  }, []);

  console.log("ETAPA SELECCIONADA", selectedStage);

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
              onClick={() => {
                handleClick(index, stage);
                setSelectedStage(stage.name);
              }}
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
          onChange={handleChange}
          style={{
            color:
              leadData.userId && leadData?.userId?.length > 0
                ? "rgba(0,0,0,0.8)"
                : "rgba(0,0,0,0.5)",
          }}
        >
          <option value="">Sin asignar</option>
          {users?.map((user: User) => (
            <option value={user.id}>
              {user.name} {user.lastname}
            </option>
          ))}
        </select>
      </Field>

      <div className={styles.col}>
        <Field label="Fecha de cierre prevista">
          <Input
            type="date"
            name="dueDate"
            onChange={handleChange}
            placeholder="Selecciona empresa"
          />
        </Field>
        <Field label="Probabilidad de la oportunidad">
          <Input
            type="number "
            name="potential"
            onChange={handleChange}
            placeholder=""
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
