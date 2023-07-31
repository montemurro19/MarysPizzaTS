import { compare } from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './Entities/user.DTO';
import { IUser } from './Entities/user.model';
import userRepository from './user.repository';

class UserService {
    private memoryCache: IUser[] | null = null;
    private async cache(): Promise<IUser[]> {
        this.memoryCache !== null ? this.memoryCache : (this.memoryCache = await userRepository.get());
        return this.memoryCache;
    }

    async createUser(user: CreateUserDTO): Promise<IUser> {
        const emailExists = await this.getUserByEmail(user.email);
        const cpfExists = await this.getUserByCpf(user.cpf);
        const telephoneExists = await this.getUserByTelephone(user.telephone);

        if (!!emailExists) {
            throw new Error('email já cadastrado');
        }
        if (!!cpfExists) {
            throw new Error('cpf já cadastrado');
        }
        if (!!telephoneExists) {
            throw new Error('telefone já cadastrado');
        }

        const newUser = await userRepository.create(user);
        this.memoryCache = null;
        return newUser;
    }

    async updateUser(email: string, senha: string, newUser: UpdateUserDTO): Promise<IUser | null> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error('user not found');
        }
        const validPassword = await compare(senha, user.password);
        if (validPassword) {
            const updatedUser = await userRepository.update(user.id, newUser);
            this.memoryCache = null;
            return updatedUser;
        } else {
            throw new Error('erro ao att usuario');
        }
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await this.cache();
        return users;
    }

    async getUserById(id: string): Promise<IUser | undefined> {
        const users = await this.cache();
        const user = users.find((data) => data.id === id);
        return user;
    }

    async getUserByEmail(email: string): Promise<IUser | undefined> {
        const users = await this.cache();
        const user = users.find((data) => data.email === email);
        return user;
    }

    async getUserByCpf(cpf: string): Promise<IUser | undefined> {
        const users = await this.cache();
        const user = users.find((data) => data.cpf === cpf);
        return user;
    }

    async getUserByTelephone(telephone: string): Promise<IUser | undefined> {
        const users = await this.cache();
        const user = users.find((data) => data.telephone === telephone);
        return user;
    }
}

export default new UserService();
