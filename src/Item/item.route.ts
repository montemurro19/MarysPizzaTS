import { Application } from 'express';
import { RouteConfig } from '../Common/route.config';
import itemController from './item.controller';
import jwt from '../Common/jwt';

export class ItemRoute extends RouteConfig {
  basePath: string = '/api/item';

  constructor(app: Application) {
    super(app, 'ItemRoutes');
  }

  configRoute(): Application {
    this.app
      .route(this.basePath)
      .get(itemController.getAllItems)
      .post([jwt.auth, itemController.createItem]);

    this.app
      .route('/api/item/:id')
      .get(itemController.getById)
      .put([jwt.auth, itemController.updateItem])
      .delete([jwt.auth, itemController.deleteItem]);

    this.app.route('/api/item/products/:type').get(itemController.getByType);

    this.app.route('/api/item/title/:title').get(itemController.getByTitle);

    return this.app;
  }
}
