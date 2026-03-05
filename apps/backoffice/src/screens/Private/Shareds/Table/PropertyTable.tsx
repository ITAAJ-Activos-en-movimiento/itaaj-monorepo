import { Property, User } from "@itaaj/entities";
import { Table } from "@/containers";
import {  usePropertiesDevs } from "@/hooks";
import PropertyRow from "./PropertyRow";
import Menus from "@/components/Shared/Menus";

const PropertyTable = () => {
  const { properties } = usePropertiesDevs() as {properties: Property[]};
  const user = localStorage.getItem("user") as User | null;
  const propertiesMain = properties.filter((property) => {
         const pasaDepositoYOwner =
                  property.lowDeposit > 0 &&
                  property.owner !== user?.id;

                // const pasaEstado =
                //   !estadoBuscado ||
                //   removeAccents(property.city?.toLowerCase()) === estadoBuscado;

                return pasaDepositoYOwner;
  })
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
          data={propertiesMain}
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
