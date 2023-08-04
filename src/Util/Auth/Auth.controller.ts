import { Request, Response, NextFunction } from 'express';
import Token from '../Middlewares/token';

class AuthController {
    async auth(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        try {
            if (!(authorization && authorization.startsWith('Bearer'))) {
                throw { error: 'unauthorized' };
            }

            const token = authorization.split(' ')[1];

            const data = await Token.auth(token);
            if (data === undefined) {
                throw { error: 'unauthorized' };
            }

            req.user = data;
            next();
        } catch (e) {
            next(e);
        }
    }

    async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user.userType !== 'admin') {
                throw { error: 'unauthorized' };
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();
