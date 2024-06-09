import { Modal, Table } from "@/containers";
import { Development } from "@itaaj/entities";
import { DivisaFormater } from "@/utilities";
import Menus from "@/components/Shared/Menus";
import { useDeleteDevelopment } from "@/hooks";
import { Link } from "react-router-dom";

interface Props {
  properties: { encabezado: string, precio: number, url: string };
  index: number;
  selected?: boolean;
  onSelect?: () => void;
}

const PropertyRow = ({ properties }: Props) => {

  console.log({properties})
  // const {isDeleting, deleteContact  } = useDeleteContact();

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

      <div>{properties.encabezado}</div>
      {/* <div>{development.area}</div> */}
      {/* {development.propertyStatus ? (
      <div>&centerdot; {development.propertyStatus}</div>

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

      )} */}
      <div style={{ textAlign: "right" }}>
        {DivisaFormater({ value: properties.precio })}
      </div>
      <div>
        <Link to={"https://century21mexico.com" + properties.url} target="_blank" >Ver Propiedad</Link>
      </div>

      <div>
        <Modal>
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
