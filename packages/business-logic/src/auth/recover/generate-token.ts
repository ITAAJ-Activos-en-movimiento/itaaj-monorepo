import { User } from "@itaaj/entities";
import * as jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const generateToken = (user: Partial<User>) => {
  const dataToken = {
    uuid: user.id ?? user.id,
    id: user.id, 
    email: user.email, 
    name: user.name, 
    lastname: user.lastname
  }

  const token = jwt.sign(dataToken, JWT_SECRET!, { expiresIn: "1h" });
  return { token };
}