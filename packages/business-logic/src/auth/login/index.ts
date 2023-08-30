import { getDbInstance } from '@itaaj/data-sources/src/postgresql';
import { User, users } from '@itaaj/entities';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { and, eq } from 'drizzle-orm';

const { JWT_SECRET } = process.env;

export const login = async ({email, password }: Partial<User>) => {
    
     const result = await getDbInstance().select().from(users)
     .where(and(eq(users.email, email)));

     const user = result[0]
      console.log(user)
    
     if(user.length <= 0) throw new Error("Invalid credentials");
    
     if(user.locked) throw new Error("Admin is already locked");
    
     const isValidPassword = await compare(password!, user.password);
    
     if(!isValidPassword) {
         user.login_attempts += 1;
        //  await user.save();
        
         if(user.login_attempts >= 3){
          user.locked = true;
            //  await user.save();
             throw new Error('Too many login attempts, your account is already locked');
         }
        
         throw new Error("Invalid credentials");
     }
    
     user.last_login = new Date().toString();
     user.login_attempts = 0;
    //  await user.save();
    
     const token = jwt.sign({uuid: user._id}, JWT_SECRET!, {expiresIn: '24h'});
    
     return {token};
}
