import { Modal, Table } from "@/containers";
import { Property } from "@itaaj/entities";
import { DivisaFormater } from "@/utilities";
import Menus from "@/components/Shared/Menus";
import { useDeleteProperty } from "@/hooks";

interface Props {
  property: Property;
  index: number;
  selected?: boolean;
  onSelect?: () => void;
}

const PropertyRow = ({ property }: Props) => {
  const { deleteProperty } = useDeleteProperty();

  return (
    <Table.Row>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "100px 1fr",
          gap: 10,
        }}
      >
        <img
          src={property.images[0]}
          width={100}
          height={50}
          style={{
            borderRadius: 5,
            objectFit: "cover",
          }}
        />
        <h3
          style={{
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          {property.name}
        </h3>
      </div>
      <div>{property.address}</div>
      <div>{property.area.total_area}</div>
      {property.propertyStatus ? (
        <div>&#183; {property.propertyStatus}</div>
      ) : (
        <div
          style={{
            backgroundColor: "rgba(0,255,0,.1)",
            maxWidth: "fit-content",
            paddingBlock: 5,
            paddingInline: 15,
            borderRadius: 5,
            color: "#00D900",
            fontWeight: "500",
          }}
        >
          &#183; Publicada
        </div>
      )}
      <div style={{ textAlign: "right" }}>
        {DivisaFormater({ value: property.price })}
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={property.id} />

            <Menus.List id={property.id}>
              <Menus.LinkTo to={`/properties/${property.slug}`}>
                Editar
              </Menus.LinkTo>

              <Menus.Button onClick={() => deleteProperty(property.id!)}>
                Eliminar
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window title="" name="delete">
            <div></div>
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default PropertyRow;
