import { useEditLead, useFunnel, useLeads } from "@/hooks";
import styles from "./Funnel.module.css";
import OpportunityModal from "./OpportunityForm";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableLocation,
} from "react-beautiful-dnd";
import { DivisaFormater } from "@/utilities";
import { Loader } from "@/components";
import { Lead, Stage } from "@itaaj/entities";

interface Props {
  draggableId?: string;
  destination: DraggableLocation | null | undefined;
  source?: DraggableLocation;
}

const Funnel = () => {
  const { isLoading, funnel } = useFunnel();
  console.log("funnel", funnel);
  const { leads } = useLeads();
  console.log("LEADS", leads);
  const { editLead } = useEditLead();

  const isPositionChanged = ({ destination, source }: Props) => {
    if (!destination) return false;
    const isSameList = destination.droppableId === source?.droppableId;
    const isSamePosition = destination.index === source?.index;
    return !isSameList || !isSamePosition;
  };

  const handleDrop = async ({ draggableId, destination, source }: Props) => {
    if (!isPositionChanged({ source, destination })) return;
    const lead = (JSON.parse(draggableId || "{}") as any) || "";
    const status = destination?.droppableId;
    console.log("ststus", status);
    const position = calculateIssueListPosition({
      leads,
      destination,
      source,
      id: lead.id,
    });

    await editLead({ ...lead, position, id: lead.id, stageId: status });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>{funnel?.name}</h2>
        <OpportunityModal />
      </div>

      <DragDropContext onDragEnd={handleDrop}>
        <div
          className={styles.funnel}
          style={{
            gridTemplateColumns: `repeat( ${funnel.stages.length},1fr)`,
          }}
        >
          {funnel.stages.map((stage: Stage) => (
            <Droppable key={stage.name} droppableId={stage.name}>
              {(provided) => (
                <div key={stage.name}>
                  <div className={styles.funnel_header}>
                    <h4>{stage.name}</h4>
                    <p>
                      {
                        leads?.filter(
                          (lead: Lead) => lead.stageId == stage.name
                        ).length
                      }{" "}
                      oportunidades
                    </p>
                  </div>

                  <div
                    className={styles.space}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {leads
                      ?.filter(
                        (lead: Lead) => lead.id && lead.stageId == stage.name
                      )
                      .map((lead: Lead, index: number) => (
                        <Draggable
                          key={lead.id}
                          draggableId={JSON.stringify(lead)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              data-snap={snapshot.isDragging}
                              className={styles.card}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h3 className={styles.title}>{lead.name}</h3>
                              <p className={styles.copy}>
                                {lead.contactName} - {lead.personName}
                              </p>
                              <span className={styles.price}>
                                {DivisaFormater({
                                  value: lead.value,
                                  currency: lead.currency,
                                })}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

const getAfterDropPrevNextIssue = (
  allIssues: any,
  destination: DraggableLocation | null | undefined,
  source: DraggableLocation | null | undefined,
  droppedIssueId: string
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination?.droppableId
  );

  console.log(beforeDropDestinationIssues);
  const droppedIssue = allIssues?.find(
    (issue: any) => issue.id === droppedIssueId
  );
  const isSameList = destination?.droppableId === source?.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination?.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination?.index
      );

  return {
    prevIssue: afterDropDestinationIssues[(destination?.index ?? 0) - 1],
    nextIssue: afterDropDestinationIssues[(destination?.index ?? 0) + 1],
  };
};
const getSortedListIssues = (issues: any, status?: string) =>
  issues
    ?.filter((issue: any) => issue.stageId === status)
    .sort((a: any, b: any) => a.position - b.position);

export const moveItemWithinArray = (
  arr: any[],
  item?: any,
  newIndex?: number
) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item!);
  arrClone.splice(newIndex!, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

const calculateIssueListPosition = (data: {
  leads: any;
  destination: DraggableLocation | null | undefined;
  source: DraggableLocation | null | undefined;
  id: string;
}) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(
    data.leads,
    data.destination,
    data.source,
    data.id
  );
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.position - 1;
  } else if (!nextIssue) {
    position = prevIssue.position + 1;
  } else {
    position =
      prevIssue.position + (nextIssue.position - prevIssue.position) / 2;
  }
  return position;
};

export const insertItemIntoArray = (arr: any[], item?: any, index?: number) => {
  const arrClone = [...arr];
  arrClone.splice(index!, 0, item!);
  return arrClone;
};
export default Funnel;
