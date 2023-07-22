import { Application } from 'express';
import { RouteConfig } from '../Common/route.config';
import jwt from '../Common/jwt';
import userController from './user.controller';

export class UserRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }
    configRoute(): Application {
        this.app.route('/me').get([jwt.auth, userController.getUser]);
        this.app.route('/login').post(userController.login);
        this.app.route('/alter').put([jwt.auth, userController.updateUser]);
        this.app.route('/create').post(userController.createUser);
        return this.app;
    }
}