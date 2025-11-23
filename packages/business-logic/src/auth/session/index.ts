import { getDbInstance } from '@itaaj/data-sources/src/postgresql';
import { users } from '@itaaj/entities';
import { and, eq } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken'

type SessionUser = {
  id: string;
  email: string;
  name?: string;
  lastname?: string;
  picture?: string;
  photo?: string; 
  phone?: string;
};

export const session = async (sessionCookie: string) => {
    const secret = process.env.JWT_SECRET || "change-me-in-production";

      let decoded: any;
      try {
        decoded = jwt.verify(sessionCookie, secret);
      } catch (err) {
        throw new Error("No autorizado")
      }

      console.log(decoded)
      console.log(decoded.id)
     const user = await getDbInstance().select().from(users!)
     .where(and(eq(users!.id, decoded.id!)));

      if (!user) {
        throw new Error("No autorizado")
      }

      console.log(user)

    const sessionUser: SessionUser = {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name ?? undefined,
        lastname: user[0].lastname ?? undefined,
        phone: user[0].phone ?? undefined,
        photo: user[0].photo ?? undefined,
        picture: user[0].picture ?? undefined,
      };

      return sessionUser;
}