import jwt = require("jsonwebtoken")
import config from "../config";
import { IUser } from "../../User/Entities/user.model";
import userService from "../../User/user.service";

class Token {
    generate(id: string): string {
        return jwt.sign(id, config.jwt, { expiresIn: '30d' })
    }

    async auth(token: string): Promise<IUser | null>{
        const decoded: any = jwt.verify(token, config.jwt)
        const user = await userService.getUserById(decoded.id)

        if(!user) {
            return null
        }
        
        return user
    }
}

export default new Token()