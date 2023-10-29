import { useLeads } from "@/hooks/leads/useLeads"
import styles from './Leads.module.css'

const Leads = () => {
    const { isLoading, leads } = useLeads();
  return (
    <div>
        {isLoading ? (
            <h3>Loading...</h3>
        ): (

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {leads?.map((lead: any) => (
                    <tr>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.state}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        )}

    </div>
  )
}

export default Leads