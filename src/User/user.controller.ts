import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, telephone, cpf, password, birthdate, gender, userType } = req.body;

            if (!name || !email || !telephone || !cpf || !password || !birthdate || !gender || !userType) {
                throw { message: 'preencha todos os campos' };
            }

            const newUser = await this.service.create({ name, cpf, email, telephone, password, birthdate, gender, userType });

            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const password = req.body.password;
            const newUser = req.body.user;

            //falta acabar
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw { message: 'preencha todos os campos' };
            }

            req.user = await this.service.login(email, password);
            res.status(200).json({ message: 'login efetuado com sucesso' });
        } catch (err) {
            next(err);
        }
    }
}
