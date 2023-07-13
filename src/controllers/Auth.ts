import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/Auth';
import { compare } from 'bcrypt';

class AuthController {
    private authService: AuthService;

    constructor(authservice: AuthService) {
        this.authService = authservice;
    }
    async protect(req: Request, res: Response, next: NextFunction) {}

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
        const user = await this.authService.login(email);
        if (user && (await compare(senha, user.password))) {
            res.status(200).json(user);
        }
    }
}
