import { IUser } from '../entities/models/interface/User';
import { UserModel } from '../entities/schema/User';

export interface IUserService {
    getById(id: string): Promise<IUser | null>;
    getByCpf(cpf: string): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>;
    getByTelephone(telephone: string): Promise<IUser | null>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: string, user: IUser): Promise<IUser | null>;
}

class UserService implements IUserService {
    async getById(id: string): Promise<IUser | null> {
        return await UserModel.findOne({ id: id });
    }

    async getByCpf(cpf: string): Promise<IUser | null> {
        return await UserModel.findOne({ cpf: cpf });
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email: email });
    }

    async getByTelephone(telephone: string): Promise<IUser | null> {
        return await UserModel.findOne({ telephone: telephone });
    }

    async createUser(user: IUser): Promise<IUser> {
        return await UserModel.create(user);
    }

    async updateUser(id: string, user: IUser): Promise<IUser | null> {
        return await UserModel.findOneAndUpdate({ id: id }, user);
    }
}

export default UserService;
