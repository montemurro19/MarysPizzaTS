import { Application } from 'express';
import { RouteConfig } from '../Util/route.config';
import jwt from '../Util/Auth/jwt';
import userController from './user.controller';

export class UserRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configRoute(): Application {
        this.app.route('/me')
            .get([jwt.auth, userController.getUser]);
        
        this.app.route('/login')
            .post(userController.login);
        
        this.app.route('/alter')
            .put([jwt.auth, userController.updateUser]);
        
        this.app.route('/register')
            .post(userController.createUser);
        
        return this.app;
    }
}
