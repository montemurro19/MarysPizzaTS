import { v4 } from 'uuid';
import { CreateUserDTO, UpdateUserDTO } from './user.DTO';
import { IUser, UserModel } from './user.model';
import Token from '../common/Authentication/token';

export default class UserRepository {
    private token: Token;

    constructor() {
        this.token = new Token();
    }

    async create(user: CreateUserDTO): Promise<IUser> {
        const id = v4();
        const token = this.token.generate(id);

        const newUser: IUser = { ...user, id, token };

        return await UserModel.create(newUser);
    }

    async update(id: string, user: UpdateUserDTO): Promise<IUser | null> {
        return await UserModel.findOneAndUpdate({ id }, user);
    }

    async get(): Promise<IUser[]> {
        return await UserModel.find();
    }
}
