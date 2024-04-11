import { Property } from '@itaaj/entities';
import { Table } from '@/containers'
import { useProperties } from '@/hooks';
import DevelopmentRow from './PropertyRow';
import PropertyRow from './PropertyRow';
import Menus from '@/components/Shared/Menus';

const PropertyTable = () => {
    const { properties } = useProperties();
    // const [{ selectedRows, selectAll }, toggleRowSelect, toggleSelectAll] = useTableSelection({ data: products.items });

  return (
    <Menus>

        <Table columns='1fr 1fr 1fr 1fr 1fr 5rem' >
            <Table.Header>

                {/* <div> <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} style={{
                    border: "1px solid rgba(0,0,0,0.3)",
                    width: 23,
                    height: 23
                }} /> </div> */}
                <div>Desarrollo</div>
                <div>Dirección</div>
                <div >Area</div>
                <div >Estado</div>
                <div style={{ textAlign: "right" }}>Precio</div>
            </Table.Header>
            <Table.Body<Property> data={properties} render={(property, index) => <PropertyRow property={property} index={index} key={property.uuid}  />}/>
                 
        </Table>
    </Menus>

  )
}

export default PropertyTable