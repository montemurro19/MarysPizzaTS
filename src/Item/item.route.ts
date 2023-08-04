import { Application } from 'express';
import { RouteConfig } from '../Util/Config/route.config';
import itemController from './item.controller';
import authController from '../Util/Auth/Auth.controller';

const path = '/api/item';

export class ItemRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'ItemRoutes');
    }

    configRoute(): Application {
        this.app.route(`${path}/`).get(itemController.getAllItems).post([authController.auth, authController.isAdmin, itemController.createItem]);

        this.app.route(`${path}/:id`).get(itemController.getById).put([authController.auth, itemController.updateItem]).delete([authController.auth, itemController.deleteItem]);

        this.app.route(`${path}/:type`).get(itemController.getByType);

        this.app.route(`${path}/title/:title`).get(itemController.getByTitle);

        return this.app;
    }
}

//
//payload
//isAdmin
//refazer rotas
