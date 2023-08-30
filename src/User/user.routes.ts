import { Router } from 'express';
import { UserController } from './user.controller';
import { AuthController } from '../Authentication/auth.controller';

export default class UserRoutes {
    public router: Router;

    private userController: UserController;
    private authController: AuthController;

    constructor() {
        this.userController = new UserController();
        this.authController = new AuthController();
        this.router = Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.post('/create', 
            this.userController.create.bind(this.userController)
        );

        this.router.post('/login', 
            this.userController.login.bind(this.userController)
        );
        
        this.router.put('/', 
            this.authController.user.bind(this.authController), 
            this.userController.update.bind(this.userController)
        );
    }
}
