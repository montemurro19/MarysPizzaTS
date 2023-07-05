import { UserModel } from '../entities/User';
import { User } from '../entities/models/User';
import { IUserService } from './interfaces/User';

export class UserService implements IUserService {
    async getById(id: string): Promise<User | null> {
        return await UserModel.findOne({ id: id });
    }

    async getByCpf(cpf: string): Promise<User | null> {
        return await UserModel.findOne({ cpf: cpf });
    }

    async getByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email: email });
    }

    async getByTelephone(telephone: string): Promise<User | null> {
        return await UserModel.findOne({ telephone: telephone });
    }

    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    async updateUser(id: string, user: User): Promise<User | null> {
        return await UserModel.findOneAndUpdate({ id: id }, user);
    }
}
