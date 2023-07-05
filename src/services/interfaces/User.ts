import { User } from '../../entities/models/User';

export interface IUserService {
    getById(id: string): Promise<User | null>;
    getByCpf(cpf: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    getByTelephone(telephone: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: string, user: User): Promise<User | null>;
}
