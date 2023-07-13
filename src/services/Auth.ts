import { IUser } from '../entities/models/User';
import { UserModel } from '../entities/schema/User';

export interface IAuthService {
    login(email: string): Promise<IUser | null>;
}

class AuthService implements IAuthService {
    async login(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email: email });
    }
}

export default AuthService;
