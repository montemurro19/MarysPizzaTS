import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IUser } from '../User/user.model';

export class AuthController {
    private service;

    constructor() {
        this.service = new AuthService();
    }

    //não passar o req todo e retornar um boolean
    //v
    //
    private async checkAuthorization(authorization: string | undefined): Promise<number> {
        if (!authorization || !authorization.startsWith('Bearer')) {
            throw { error: 'forbidden' };
        }

        const token = authorization.split(' ')[1];
        const user = await this.service.getUser(token);

        if (!user) {
            throw { error: 'unauthorized' };
        }

        switch (user.userType) {
            case 'user':
                return 1;

            case 'admin':
                return 2;

            default:
                throw { error: 'unauthorized' };
        }
    }

    async user(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        try {
            const userType = await this.checkAuthorization(authorization);
            if (userType > 0) {
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    async superUser(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        try {
            const userType = await this.checkAuthorization(authorization);
            if (userType > 1) {
                next();
            }
        } catch (err) {
            next(err);
        }
    }
}
