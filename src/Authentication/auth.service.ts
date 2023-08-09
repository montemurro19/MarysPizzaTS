import UserRepository from '../User/user.repository';
import { IUser } from '../User/user.model';
import { authToken } from '../Common/Middleware/token';

export class AuthService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async getUser(token: string): Promise<IUser | undefined> {
        const decoded = authToken(token);
        const users = await this.repository.get();
        return users.find((data) => data.id === decoded.id);
    }
}
