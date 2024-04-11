import { Modal, Table } from "@/containers";
import { Property } from "@itaaj/entities";
import { DivisaFormater } from "@/utilities";
import Menus from "@/components/Shared/Menus";
import { Link } from "react-router-dom";

interface Props {
  property: Property;
  index: number;
  selected?: boolean;
  onSelect?: () => void;
}

const PropertyRow = ({ property, index, selected, onSelect }: Props) => {
  // const {isDeleting, deleteContact  } = useDeleteContact();
console.log({property})
  // const { id: contactId, name } = contact;
  return (
    <Table.Row>
      {/* <div
        onClick={onSelect}
        style={{
          backgroundColor: selected ? 'rgba(0,0,0,0.1)' : colors[index],
          borderRadius: 3,
          height: 25,
          width: 25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 500,
        }}>
        {selected ? (
          <Check color="#000" size={18} />
        ) : (
          <>
            {development.name.charAt(0).toUpperCase()}
            {development.name.charAt(1).toUpperCase()}
          </>
        )}
      </div> */}
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

      ): (
        <div style={{
            backgroundColor: "rgba(0,255,0,.1)",
            maxWidth: "fit-content",
            paddingBlock: 5,
            paddingInline: 15,
            borderRadius: 5,
            color: "#00D900",
            fontWeight: "500"
        }} >&#183;  Publicada</div>

      )}
      <div style={{ textAlign: "right" }}>
        {DivisaFormater({ value: property.price })}
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={property.uuid} />

            <Menus.List id={property.uuid}>
              <Modal.Open opens="edit">
                <Link to={"/properties/" + property.slug}>Ver</Link>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button>Eliminar</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          {/* <Modal.Window title="Editar Contacto" name="edit">
            <ProductFrom productToEdit={product} />
          </Modal.Window> */}

          <Modal.Window title="" name="delete">
            <div></div>
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default PropertyRow;
