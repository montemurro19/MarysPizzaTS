import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
    private service;

    constructor() {
        this.service = new AuthService();
    }

    private async checkAuthorization(req: Request, userType: string): Promise<void> {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer')) {
            throw { error: 'forbidden' };
        }

        const token = authorization.split(' ')[1];
        const user = await this.service.getUser(token);

        if (!user || (userType && user.userType !== userType)) {
            throw { error: 'unauthorized' };
        }

        req.user = user;
    }

    async user(req: Request, res: Response, next: NextFunction) {
        try {
            await this.checkAuthorization(req, 'user');
            next();
        } catch (err) {
            next(err);
        }
    }

    async superUser(req: Request, res: Response, next: NextFunction) {
        try {
            await this.checkAuthorization(req, 'admin');
            next();
        } catch (err) {
            next(err);
        }
    }
}
