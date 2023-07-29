import { Application } from 'express';
import { RouteConfig } from '../Util/route.config';
import itemController from './item.controller';
import jwt from '../Util/Auth/jwt';

export class ItemRoute extends RouteConfig {
    private path: string = '/api/item/'

    constructor(app: Application) {
        super(app, 'ItemRoutes');
    }

    configRoute(): Application {
        this.app.route(this.path)
            .get(itemController.getAllItems)
            .post([jwt.auth, itemController.createItem]);
        
        this.app.route(`${this.path}:id`)
            .get(itemController.getById)
            .put([jwt.auth, itemController.updateItem])
            .delete([jwt.auth, itemController.deleteItem]);
        
        this.app.route(`${this.path}:type`)
            .get(itemController.getByType);
        
        this.app.route(`${this.path}:title`)
            .get(itemController.getByTitle);
        
        return this.app;
    }
}
