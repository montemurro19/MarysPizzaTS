import { Request, Response } from 'express';
import { CreateUserDTO } from './Entities/user.DTO';
import userService from './user.service';
import { compare } from 'bcrypt';

class UserController {
    async createUser(req: Request, res: Response) {
        const user: CreateUserDTO = req.body;
        try {
            const newUser = await userService.createUser(user);
            res.status(201).json(newUser);
        } catch (e) {
            res.status(400).json({ erro: 'usuário já existe' });
        }
    }
    async updateUser(req: Request, res: Response) {
        const senha = req.body.senha;
        const newUser = req.body.user;
        try {
            const user = await userService.getUserById(req.user.id);
            if (user) {
                const updatedUser = await userService.updateUser(user.email, senha, newUser);
                if (updatedUser) {
                    res.status(200).json(updatedUser);
                } else {
                    res.status(404).json({ erro: 'usuário não encontrado' });
                }
            } else {
                res.status(404).json({ erro: 'usuário não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o usiário' });
        }
    }
    async getUser(req: Request, res: Response) {
        try {
            const user = await userService.getUserById(req.user.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ erro: 'usúario não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar usuário' });
        }
    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await userService.getUserByEmail(email);
            if (user) {
                const isMatch = await compare(password, user.password);
                if (isMatch) {
                    req.headers.authorization = user.token;
                    res.status(200).json({ message: 'login efetuado com sucesso' });
                }
            } else {
                res.status(404).json({ erro: 'usuário não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar usuário', e });
        }
    }
}

export default new UserController();
