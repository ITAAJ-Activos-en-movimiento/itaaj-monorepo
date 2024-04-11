import { Development } from '@itaaj/entities';
import { Table } from '@/containers'
import { useDevelopments } from '@/hooks';
import DevelopmentRow from './DevelopmentRow';

const DevelopmentTable = () => {
    const { developments } = useDevelopments();
    // const [{ selectedRows, selectAll }, toggleRowSelect, toggleSelectAll] = useTableSelection({ data: products.items });

  return (
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
            <Table.Body<Development> data={developments} render={(development, index) => <DevelopmentRow development={development} index={index} key={development.uuid}  />}/>
                 
        </Table>
  )
}

export default DevelopmentTable