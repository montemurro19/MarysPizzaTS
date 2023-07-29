import { Application } from 'express';
import { RouteConfig } from '../Util/route.config';
import userController from './user.controller';
import authController from '../Util/Auth/Auth.controller';

export class UserRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configRoute(): Application {
        this.app.route('/me').get([authController.auth, userController.getUser]);

        this.app.route('/login').post(userController.login);

        this.app.route('/alter').put([authController.auth, userController.updateUser]);

        this.app.route('/register').post(userController.createUser);

        return this.app;
    }
}
