import { Application } from 'express';
import { RouteConfig } from '../Common/route.config';
import jwt from '../Common/jwt';
import orderController from './order.controller';

export class OrderRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'OrderRoute');
    }
    configRoute(): Application {
        this.app.route('/api/order/').get([jwt.auth, orderController.getAllOrders]).post([jwt.auth, orderController.createOrder]);
        this.app.route('/api/order/:id').get([jwt.auth, orderController.getOrderById]).put([jwt.auth, orderController.updateOrder]);
        return this.app;
    }
}
