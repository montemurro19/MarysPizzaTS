import { Application } from 'express';
import { RouteConfig } from '../Util/route.config';
import orderController from './order.controller';
import authController from '../Util/Auth/Auth.controller';

const path = '/api/order/';

export class OrderRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'OrderRoute');
    }

    configRoute(): Application {
        this.app.route(path).get([authController.auth, orderController.getAllOrders]).post([authController.auth, orderController.createOrder]);

        this.app.route(`${path}:id`).get([authController.auth, orderController.getOrderById]).put([authController.auth, orderController.updateOrder]);

        return this.app;
    }
}
