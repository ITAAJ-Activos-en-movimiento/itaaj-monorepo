import { useLeads } from "@/hooks/leads/useLeads";
import styles from "./Leads.module.css";
import { Loader } from "@/components";

const Leads = () => {
  const { isLoading, leads } = useLeads();
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Teléfono</th>
              <th>Estado</th>
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
  );
};

export default Leads;
