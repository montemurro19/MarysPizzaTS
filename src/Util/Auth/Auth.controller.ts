import { Request, Response, NextFunction } from 'express';
import Token from '../Middlewares/token';

class AuthController {
    async auth(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        if (!(authorization && authorization.startsWith('Bearer'))) {
            res.status(403).json({ message: 'no token' });
            return;
        }

        const token = authorization.split(' ')[1];

        Token.auth(token).then((data) => {
            if (data === undefined) {
                res.status(404).json({ message: 'user not found' });
                return;
            }

            req.user = data;
            next();
        });
    }
}

export default new AuthController();
