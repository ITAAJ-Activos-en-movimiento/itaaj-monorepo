import { Development, User } from '@itaaj/entities';
import { Table } from '@/containers'
import { useDevelopments } from '@/hooks';
import DevelopmentRow from './DevelopmentRow';
import Menus from '@/components/Shared/Menus';

const DevelopmentTable = () => {
    const { developments } = useDevelopments() as { developments: Development[]};
    let listDevelopments = developments;
    // const [{ selectedRows, selectAll }, toggleRowSelect, toggleSelectAll] = useTableSelection({ data: products.items });
  const user = JSON.parse(localStorage.getItem('user') || "{}") as User; 

    if(user){
        if(!user.isAdmin){
            listDevelopments = developments.filter((dev) => dev.owner !==null && dev.owner == user.id )
        }
    }

    console.log(listDevelopments)
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
            <Table.Body<Development> data={listDevelopments} render={(development, index) => <DevelopmentRow development={development} index={index} key={development.uuid}  />}/>
                 
        </Table>
    </Menus>

  )
}

export default DevelopmentTable