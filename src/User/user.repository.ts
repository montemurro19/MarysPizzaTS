import { v4 } from 'uuid';
import { CreateUserDTO, UpdateUserDTO } from './user.DTO';
import { IUser, UserModel } from './user.model';
import { hashPassword } from '../Common/Middleware/password';
import { generateToken } from '../Common/Middleware/token';

export default class UserRepository {
    async create(user: CreateUserDTO): Promise<IUser> {
        const id = v4();
        const token = generateToken(id);
        const hashedPassword = await hashPassword(user.password);

        const newUser: IUser = {
            ...user,
            id,
            password: hashedPassword,
            token
        };

        return await UserModel.create(newUser);
    }

    async update(id: string, user: UpdateUserDTO): Promise<IUser | null> {
        return await UserModel.findOneAndUpdate({ id }, user, { new: true });
    }

    async get(): Promise<IUser[]> {
        return await UserModel.find();
    }
}
