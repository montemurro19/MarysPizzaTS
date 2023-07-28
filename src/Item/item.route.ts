import { Application } from 'express';
import { RouteConfig } from '../Common/route.config';
import itemController from './item.controller';
import jwt from '../Common/jwt';

export class ItemRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'ItemRoutes');
    }
  
    // SUGESTÃO DE MELHORIA 07
    // Criar uma variável para armazenar o path do endpoint
    // ex: const path = '/api/item/'

    // SUGESTÃO DE MELHORIA 08
    // Pular linhas entre os métodos para melhorar a legibilidade
    // Conforme exemplo abaixo
    configRoute(): Application {
        this.app.route('/api/item/')
            .get(itemController.getAllItems)
            .post([jwt.auth, itemController.createItem]);

        this.app.route('/api/item/:id')
            .get(itemController.getById)
            .put([jwt.auth, itemController.updateItem])
            .delete([jwt.auth, itemController.deleteItem]);

        this.app.route('/api/item/products/:type').get(itemController.getByType);
        this.app.route('/api/item/title/:title').get(itemController.getByTitle);

        return this.app;
    }
}
