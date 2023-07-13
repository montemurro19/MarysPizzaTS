import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import UserService from '../services/User';
import { IUser } from '../entities/models/User';
const jwt = require('jsonwebtoken');

export interface AuthenticatedRequest extends Request {
    user: IUser | null;
}

class AuthMiddleware {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }
    async auth(req: any, res: Response, next: NextFunction) {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwt.secret);
            await this.userService
                .getById(decoded.id)
                .then((data) => {
                    req.user = data;
                    console.log(data);
                    next();
                })
                .catch(() => {
                    res.status(401).json({ message: 'não autorizado' });
                });
        }
        if (!token) res.status(401).json({ message: 'sem token' });
    }
}

export default AuthMiddleware;
