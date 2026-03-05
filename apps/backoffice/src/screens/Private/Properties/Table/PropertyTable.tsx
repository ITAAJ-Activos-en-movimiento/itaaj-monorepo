import { Property, User } from "@itaaj/entities";
import { Table } from "@/containers";
import { useProperties } from "@/hooks";
import PropertyRow from "./PropertyRow";
import Menus from "@/components/Shared/Menus";

const PropertyTable = () => {
  const { properties } = useProperties() as {properties: Property[]};
    let listDevelopments = properties;
    // const [{ selectedRows, selectAll }, toggleRowSelect, toggleSelectAll] = useTableSelection({ data: products.items });
  const user = localStorage.getItem('user') as User | null; 

    if(user){
        if(!user.isAdmin){
            listDevelopments = properties.filter((dev) => dev.owner !==null && dev.owner == user.id )
        }
    }

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
          data={listDevelopments}
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
