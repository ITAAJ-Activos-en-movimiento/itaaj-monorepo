import { Button } from "@/components";
import { Modal } from "@/containers";
import OpportunityForm from "./OpportunityForm";
import { useFunnel } from "@/hooks";
import { Lead } from "@itaaj/entities";

interface Props {
  leadToEdit?: Partial<Lead> | undefined;
  onCloseModal?: () => void;
  isEditing?: boolean;
  setOpen: (isOpen: boolean) => void;
}

const OpportunityModal = ({ leadToEdit, isEditing, setOpen }: Props) => {
  const { funnel } = useFunnel();

  return (
    <Modal>
      <Modal.Open opens="opportunity-form">
        <Button>
          {isEditing ? "Editar Oportunidad" : "Nueva oportunidad"}
        </Button>
      </Modal.Open>
      <Modal.Window
        title={"Nueva oportunidad - " + funnel.name}
        name="opportunity-form"
      >
        <OpportunityForm leadToEdit={leadToEdit} setOpen={setOpen} />
      </Modal.Window>
    </Modal>
  );
};

export default OpportunityModal;
