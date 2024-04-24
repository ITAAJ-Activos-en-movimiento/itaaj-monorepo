import { verifyToken, updateContact } from "@helebba/business-logic";
import { RouteMethod, makeFastifyRoute } from "@helebba/constant-definitions";
import { UpdateContactDto } from '@helebba/entities';

export const updateContactRoutes = makeFastifyRoute(
    RouteMethod.PATCH,
    "/contacts/:contactId",
    verifyToken,
    async (request, reply) => {
        const { params, body } = request;
        const { contactId } = params as { contactId: string };
        const data = body as UpdateContactDto
        const contact = await updateContact(contactId, data);
        
        return reply.send(contact);
    }
)