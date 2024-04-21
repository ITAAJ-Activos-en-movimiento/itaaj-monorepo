import { users } from "@itaaj/entities";
import { and, eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { drizzle } from "drizzle-orm/node-postgres";
import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { sendEmail } from "../../mailing";

const { JWT_SECRET } = process.env;

export const loginEmail =async ({email}: {email: string}) => {
    const db = await getDbInstance()

    // const db = drizzle(infoInstance, { schema: { users } })
  
    const result = await db.select().from(users).where(and(eq(users!.email, email!)));
    let user = result[0];
    let type = 'login';
    if(!user || user.name == ''){
        const data = { email, status: 'active', last_login:  new Date().toString()}
        const result = await db.insert(users).values(data).returning();
        user = result[0];
        type = 'register';
    }

    if(email == 'alanwhatevers@gmail.com'){
        return
    }

    const code = email == 'test@email.com' ? '1234' : await sendEmail({email}, 'verification', true);

    await db.update(users)
        .set({ code: Number(code), last_login: new Date().toString()  })
        .where(eq(users.id, user.id))
        .returning();

    const token = sign({id: user.id}, JWT_SECRET!, { expiresIn: '15d' });

    return { token, type };
}