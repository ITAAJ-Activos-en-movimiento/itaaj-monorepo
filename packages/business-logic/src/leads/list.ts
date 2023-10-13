import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { leads } from "@itaaj/entities"

export const getAllLeads = () => {
    const result = getDbInstance().select({
        id: leads.id,
        name: leads.name,
        email: leads.email,
        state: leads.state,
        phone: leads.phone,
        type: leads.type,
        source: leads.source,
        property: leads.property,
        city: leads.city,
    }).from(leads)

    return result;
}