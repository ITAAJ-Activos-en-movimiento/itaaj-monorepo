import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { messages } from "@itaaj/entities"

export const getAllMessages = () => {
    const result = getDbInstance().select({
        id: messages.id,
        name: messages.name,
        email: messages.email,
        phone: messages.phone,
        message: messages.message,
        property: messages.property,
        type: messages.type,
        status: messages.status,
        createdAt: messages.createdAt,
    }).from(messages)

    return result;
}