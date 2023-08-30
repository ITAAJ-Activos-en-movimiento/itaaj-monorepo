import { genSaltSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'
import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { and, eq } from "drizzle-orm";
import { users } from "@itaaj/entities";

const { JWT_SECRET, GOOGLE_CLIENT_ID } = process.env;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogle = async (token: string) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userId = payload??['sub']
    return {
        email: payload?.email,
        name: payload?.given_name,
        last_name: payload?.family_name,
        photo: payload?.picture
    };
}

export const loginGoogle = async (id: string) => {
  
     const {email, photo, name, last_name} = await verifyGoogle(id);

     const result = await getDbInstance().select().from(users)
     .where(and(eq(users.email, email)));

     const user = result[0]
    
     if(!user) {
        const data = {
            name,
            email,
            last_name,
            photo,
            password: ':P',
            username: '',
            method: 'google'
        }
        data.username = generateUsername(name || "", email || "");

        const newUser = await getDbInstance().insert(users).values({
            ...data
        }).returning();
        const trialStartDate = new Date();
        newUser.trial_start_date = trialStartDate;
        const trialEndDate = new Date(
            trialStartDate.getTime() + 14 * 24 * 60 * 60 * 1000
          );
          newUser.trial_end_date = trialEndDate;
        
          const salt = genSaltSync(10);
          newUser.password = hashSync(data.password, salt);
        
        //   await newUser.save();
          const token = jwt.sign({uuid: newUser._id}, JWT_SECRET!, {expiresIn: '5d'});
          return { token };

     };
    
     if(user.locked) throw new Error("User is already locked");
    
     user.last_login = new Date().toString();
     user.login_attempts = 0;
    //  await user.save();
    
     const token = jwt.sign({uuid: user._id}, JWT_SECRET!, {expiresIn: '24h'});
    
     return {token};
}


const generateUsername = (name: string, email: string): string  => {
    const username = name.charAt(0) + email.split('@')[0];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${username}${randomNumber}`;
   }