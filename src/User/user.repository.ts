import { v4 } from 'uuid';
import { CreateUserDTO, UpdateUserDTO } from './Entities/user.DTO';
import { IUser, UserModel } from './Entities/user.model';
import { sign } from 'jsonwebtoken';
import config from '../Util/config';
import { genSalt, hash } from 'bcrypt';

export interface IUserRepository {
    create(user: CreateUserDTO): Promise<IUser>;
    update(id: string, user: UpdateUserDTO): Promise<IUser | null>;
    get(): Promise<IUser[]>;
}

class UserRepository implements IUserRepository {
    async create(user: CreateUserDTO): Promise<IUser> {
        const id = v4();
        const token = sign({ id: id }, config.jwt, { expiresIn: '30d' });
        const salt = await genSalt(10);
        const hashedPassword = await hash(user.password, salt);
        const newUser: IUser = {
            id: id,
            ...user,
            password: hashedPassword,
            token: token
        };
        const createdUser = await UserModel.create(newUser);
        return createdUser;
    }
    async update(id: string, user: UpdateUserDTO): Promise<IUser | null> {
        try {
            const updatedUser = await UserModel.findOneAndUpdate({ id: id }, user, { new: true });
            return updatedUser;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    async get(): Promise<IUser[]> {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserRepository();
