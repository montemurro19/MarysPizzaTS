import { Request, Response } from 'express';
import { UserService } from '../services/User';
import { User } from '../entities/models/User';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response) {}
}
