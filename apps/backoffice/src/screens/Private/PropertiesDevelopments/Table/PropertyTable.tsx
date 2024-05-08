import { Property } from "@itaaj/entities";
import { Table } from "@/containers";
import { usePropertiesDevelopments } from "@/hooks";
import PropertyRow from "./PropertyRow";
import Menus from "@/components/Shared/Menus";

const PropertyTable = () => {
  const { properties } = usePropertiesDevelopments();

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 1fr 5rem">
        <Table.Header>
          <div>Desarrollo</div>
          <div>Dirección</div>
          <div>Area</div>
          <div>Estado</div>
          <div style={{ textAlign: "right" }}>Precio</div>
        </Table.Header>
        <Table.Body<Property>
          data={properties}
          render={(property, index) => (
            <PropertyRow
              property={property}
              index={index}
              key={property.uuid}
            />
          )}
        />
      </Table>
    </Menus>
  );
};

export default PropertyTable;
