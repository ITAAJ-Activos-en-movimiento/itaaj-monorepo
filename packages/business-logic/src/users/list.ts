import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { users } from "@itaaj/entities"

export const getAllUsers = () => {
    const result = getDbInstance().select({
        id: users.id,
        name: users.name,
        lastname: users.lastname,
        email: users.email
    }).from(users)

    return result;
}