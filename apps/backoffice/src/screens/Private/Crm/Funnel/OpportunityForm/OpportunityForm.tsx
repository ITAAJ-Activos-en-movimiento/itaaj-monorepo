import { Button, Field, Input } from '@/components';
import { useContacts, useCreateLead, useForm, useFunnel, useUsers } from '@/hooks';
import styles from './Form.module.css';
import { FormEvent, useEffect, useState } from 'react';

interface Props {
    leadToEdit?: Partial<any>;
    onCloseModal?: () => void;
}

const OpportunityForm = ({ leadToEdit = {}, onCloseModal }: Props) => {
    const { funnel } = useFunnel();
  const { contacts } = useContacts();
  const { users } = useUsers(); 

  const { isCreating, createLead } = useCreateLead();
  const isWorking = isCreating ;

  const { id: editId, ...editValues } = leadToEdit;
  const isEditSession = Boolean(editId);
  const { formState, handleChange } = useForm<any>({
    name: '',
    dueDate: '',
    person: '',
    personName: '',
    contactId: '',
    contactName: '',
    currency: "",
    value: 0
  });
  const [activeStages, setActiveStages] = useState(
    Array(funnel.stages.length).fill(false),
  );
  const [selectedStage, setSelectedStage] = useState('');

  const handleClick = (indexId: number, id: string) => {
    setSelectedStage(id);
    const nuevosBotonesActivos = activeStages.map(
      (_v, index) => index <= indexId,
    );
    setActiveStages(nuevosBotonesActivos);
  };

  const changeContact = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value.length <= 0 && event.target.name == 'contact') {
      handleChange({
        ...event,
        target: { ...event.target, name: 'contactId', value: '' },
      });
      handleChange({
        ...event,
        target: { ...event.target, name: 'contactName', value: '' },
      });
      return;
    }

    if (event.target.value.length <= 0 && event.target.name == 'person') {
      handleChange({
        ...event,
        target: { ...event.target, name: 'person', value: '' },
      });
      handleChange({
        ...event,
        target: { ...event.target, name: 'personName', value: '' },
      });
      return;
    }

    const contact = JSON.parse(event.target.value) as any;

    if (event.target.name == 'contact') {
      handleChange({
        ...event,
        target: { ...event.target, name: 'contactId', value: contact.id },
      });
      handleChange({
        ...event,
        target: { ...event.target, name: 'contactName', value: contact.name },
      });
    }

    if (event.target.name == 'person') {
      handleChange({
        ...event,
        target: { ...event.target, name: 'person', value: contact.id },
      });
      handleChange({
        ...event,
        target: { ...event.target, name: 'personName', value: contact.name },
      });
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          lead: {
            ...formState,
            stageId: selectedStage
          },
        },
        {
          onSuccess() {
            onCloseModal?.();
          },
        },
      );
    }
  };


  useEffect(() => {
    setActiveStages((activeStages) => {
      activeStages[0] = true;
      return [...activeStages];
    });
  }, []);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Field label="Empresa">
        <select name="contact" onChange={changeContact}
         style={{
            color: formState.contactId && formState?.contactId?.length > 0 ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)"
          }}
        >
          <option value="">Selecciona empresa</option>
          {contacts?.items?.map((contact: any) => (
            <option key={contact.id} value={JSON.stringify(contact)}>
              {contact.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Persona de contacto">
        <select name="person" onChange={changeContact}
         style={{
            color: formState.person && formState?.person?.length > 0 ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)"
          }}
        >
          <option value="">Selecciona una persona de contacto</option>
          {contacts?.items?.map((contact: any) => (
            <option key={contact.id} value={JSON.stringify(contact)}>
              {contact.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Título de la oportunidad">
        <Input
          value={formState.name}
          name="name"
          onChange={handleChange}
          placeholder=""
        />
      </Field>

      <div className={styles.col}>
        <Field label="Valor de la oportunidad">
          <Input name='value' value={formState.value} onChange={handleChange} placeholder="" />
        </Field>
        <Field label="Moneda">
          <Input name='currency' value={formState.currency} onChange={handleChange} />
        </Field>
      </div>
      <Field label="Etapa del embudo">
        <div
          className={styles.stage}
          style={{
            gridTemplateColumns: `repeat( ${funnel.stages.length},1fr)`,
          }}>
          {funnel.stages.map((stage:any, index:number) => (
            <button
              className={activeStages[index] ? styles.active : ''}
              key={stage.stageId}
              onClick={() => handleClick(index, stage.stageId)}
              type="button">
              {stage.name}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Asignado a">
        <select name="userId" 
        style={{
            color: formState.userId && formState?.userId?.length > 0 ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)"
          }}
        >
            <option value="">Sin asignar</option>
            {users?.map((user: any) => (
                <option value={user.id}>{user.name} {user.lastname}</option>
            ))}
        </select>
      </Field>
      <Field label="Tags">
        <Input placeholder="Selecciona empresa" />
      </Field>
      <div className={styles.col}>
        <Field label="Fecha de cierre prevista">
          <Input
            type="date"
            value={formState.dueDate}
            name="date"
            onChange={handleChange}
            placeholder="Selecciona empresa"
          />
        </Field>
        <Field label="Probabilidad de la oportunidad">
          <Input placeholder="Selecciona empresa" />
        </Field>
      </div>

      <div>
        <Button loading={isWorking} > Guardar </Button>
      </div>
    </form>
  );
};

export default OpportunityForm;
