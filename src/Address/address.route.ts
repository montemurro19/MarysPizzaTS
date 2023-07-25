import { Application } from 'express';
import { RouteConfig } from '../Common/route.config';
import addressController from './address.controller';
import jwt from '../Common/jwt';

export class AddressRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'AddressRoute');
    }
    configRoute(): Application {
        this.app.route('/api/address/').get([jwt.auth, addressController.getAllAddress]).post([jwt.auth, addressController.createAddress]);
        this.app.route('/api/address/:id').get([jwt.auth, addressController.getById]).put([jwt.auth, addressController.updateAddress]).delete([jwt.auth, addressController.deleteAddress]);
        this.app.route('/api/address/title/:title').get([jwt.auth, addressController.getByTitle]);
        return this.app;
    }
}
