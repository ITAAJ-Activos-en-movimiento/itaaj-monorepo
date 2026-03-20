import { Modal, Table } from "@/containers";
import { Property } from "@itaaj/entities";
import { DivisaFormater } from "@/utilities";
import Menus from "@/components/Shared/Menus";

interface Props {
  property: Property;
  index: number;
  selected?: boolean;
  onSelect?: () => void;
}

const PropertyRow = ({ property }: Props) => {
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
      <div>{(property.owner as any)?.name}</div>
      <div>{(property.owner as any)?.phone}</div>
      {property.lowDeposit ? (
        <div>{property.lowDeposit}%</div>
      ) : (
        <div
          style={{
            backgroundColor: "rgba(0,255,0,.1)",
            maxWidth: "fit-content",
            paddingBlock: 5,
            paddingInline: 15,
            borderRadius: 5,
            fontWeight: "500",
          }}
        >
         No especificado
        </div>
      )}
            <div>{property.alsoRent ? "Renta" : "Venta"}</div>

      <div style={{ textAlign: "right" }}>
        {DivisaFormater({ value: property.price })}
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={property.id} />

            <Menus.List id={property.id}>
              <Menus.LinkTo target="_blank" to={`https://itaajrealty.com/${property.alsoRent? "rentar" : "comprar"}/viviendas/mexico/${property.slug}/d`}>
                Ver
              </Menus.LinkTo>
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
