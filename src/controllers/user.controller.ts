import { Request, Response } from 'express';
import UserService from '../service/User';
import { createUser, updateUser } from '../entities/models/User';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async create(req: Request, res: Response) {
        const { name, cpf, email, telephone, password, birthdate, gender } = req.body;
        if (!name || !cpf || !email || !telephone || !password || !birthdate || !gender) res.status(400).json({ message: 'preenche tudo!' });

        const cpfExists = await this.userService.getByCpf(cpf);
        if (cpfExists) res.status(400).json({ message: 'cpf já cadastrado' });

        const emailExists = await this.userService.getByEmail(email);
        if (emailExists) res.status(400).json({ message: 'cpf já cadastrado' });

        const telephoneExists = await this.userService.getByTelephone(telephone);
        if (telephoneExists) res.status(400).json({ message: 'cpf já cadastrado' });

        const user = new createUser({ name, cpf, email, telephone, password, birthdate, gender });

        await this.userService
            .createUser(user)
            .then(() => {
                res.status(201).json({ message: 'deu bom!' });
            })
            .catch((err) => {
                res.status(400).json({ message: 'invalid userdata', erro: err });
            });
    }

    async update(req: Request, res: Response) {
        const user = await this.userService.getById(req.params.id);
        if (user !== null) {
            const newUser = new updateUser(req.body, user);
            await this.userService.updateUser(user.id, newUser);
            res.status(200).json(newUser);
        } else {
            res.status(404).json({ message: 'usuario não encontrado' });
        }
    }
}

export default UserController;
