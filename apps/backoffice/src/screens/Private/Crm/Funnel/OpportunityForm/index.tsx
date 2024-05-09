import { Button } from "@/components"
import { Modal } from "@/containers"
import OpportunityForm from "./OpportunityForm"
import { useFunnel } from "@/hooks";

const OpportunityModal = () => {
    const { funnel } = useFunnel();

  return (
    <Modal>
    <Modal.Open opens="opportunity-form">
      <Button>Nueva oportunidad</Button>
    </Modal.Open>
    <Modal.Window title={"Nueva oportunidad - " + funnel.name} name="opportunity-form">
      <OpportunityForm />
    </Modal.Window>
  </Modal>
  )
}

export default OpportunityModal