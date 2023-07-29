import { Application } from 'express';
import { RouteConfig } from '../Util/route.config';
import addressController from './address.controller';
import jwt from '../Util/Auth/jwt';

export class AddressRoute extends RouteConfig {
    private path: string = '/api/address/'

    constructor(app: Application) {
        super(app, 'AddressRoute');
    }

    configRoute(): Application {
        this.app.route(this.path)
            .get([jwt.auth, addressController.getAllAddress])
            .post([jwt.auth, addressController.createAddress]);

        this.app.route(`${this.path}:id`)
            .get([jwt.auth, addressController.getById])
            .put([jwt.auth, addressController.updateAddress])
            .delete([jwt.auth, addressController.deleteAddress]);

        this.app.route(`${this.path}:title`)
            .get([jwt.auth, addressController.getByTitle]);

        return this.app;
    }
}
