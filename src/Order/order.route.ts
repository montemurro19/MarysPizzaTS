import { Application } from 'express';
import { RouteConfig } from '../Util/route.config';
import jwt from '../Util/Auth/jwt';
import orderController from './order.controller';

export class OrderRoute extends RouteConfig {
    private path: string = '/api/order/'

    constructor(app: Application) {
        super(app, 'OrderRoute');
    }

    configRoute(): Application {
        this.app.route(this.path)
            .get([jwt.auth, orderController.getAllOrders])
            .post([jwt.auth, orderController.createOrder]);
        
        this.app.route(`${this.path}:id`)
            .get([jwt.auth, orderController.getOrderById])
            .put([jwt.auth, orderController.updateOrder]);
        
        return this.app;
    }
}
