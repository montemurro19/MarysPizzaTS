import jwt = require('jsonwebtoken');
import config from '../config';

export default class Token {
    generate(id: string): string {
        return jwt.sign(id, config.jwt, { expiresIn: '30d' });
    }

    /* async auth(token: string): Promise<IUser | undefined> {
        const decoded: any = jwt.verify(token, config.jwt);
        return await userService.getUserById(decoded.id);
    } */
}
