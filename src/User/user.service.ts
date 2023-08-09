import { comparePassword } from '../Common/Middleware/password';
import { CreateUserDTO, UpdateUserDTO } from './user.DTO';
import { IUser } from './user.model';
import UserRepository from './user.repository';

export default class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async create(user: CreateUserDTO): Promise<IUser> {
        const cpfExists = await this.getByCpf(user.cpf);
        if (cpfExists) {
            throw { message: 'cpf já cadastrado' };
        }

        const emailExists = await this.getByEmail(user.email);
        if (emailExists) {
            throw { message: 'emnail já cadastrado' };
        }

        const telephoneExists = await this.getByTelephone(user.telephone);
        if (telephoneExists) {
            throw { message: 'telefone já cadastrado' };
        }

        return await this.repository.create(user);
    }

    async update(id: string, user: UpdateUserDTO): Promise<IUser | null> {
        const userExists = await this.getById(id);
        if (!userExists) {
            throw { message: 'usuário não existe' };
        }

        return await this.repository.update(id, user);
    }

    async getAll(): Promise<IUser[]> {
        return await this.repository.get();
    }

    async getById(id: string): Promise<IUser | undefined> {
        const users = await this.getAll();
        return users.find((data) => data.id === id);
    }

    async getByCpf(cpf: string): Promise<IUser | undefined> {
        const users = await this.getAll();
        return users.find((data) => data.cpf === cpf);
    }

    async getByEmail(email: string): Promise<IUser | undefined> {
        const users = await this.getAll();
        return users.find((data) => data.email === email);
    }

    async getByTelephone(telephone: string): Promise<IUser | undefined> {
        const users = await this.getAll();
        return users.find((data) => data.telephone === telephone);
    }

    async login(email: string, password: string): Promise<IUser | undefined> {
        const user = await this.getByEmail(email);

        if (!user) {
            throw { error: 'not_found', message: 'usuário não encontrado' };
        }

        const isMatch = comparePassword(password, user.password);

        if (!isMatch) {
            throw { error: 'unauthorized' };
        }

        return user;
    }
}
