import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { User, users } from "@itaaj/entities"
import { genSaltSync, hashSync } from "bcrypt";
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UserToken {
 token: string;
}

export const registerUser = async (data: User): Promise<UserToken | Error> => {
    if (!EMAIL_REGEX.test(data.email)) {
        throw new Error("The email provided is not valid");
      }
      
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(data.password, salt);
    const result = await getDbInstance().insert(users).values({
        ...data,
        password: hashedPassword
    }).returning();
    
    const token = jwt.sign({id: result[0].id}, JWT_SECRET!, {expiresIn: '5d'});

    return token;
}