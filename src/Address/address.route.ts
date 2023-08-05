import { Application } from 'express';
import { RouteConfig } from '../Util/Config/route.config';
import addressController from './address.controller';
import authController from '../Util/Auth/Auth.controller';

const path = '/api/address';

export class AddressRoute extends RouteConfig {
    constructor(app: Application) {
        super(app, 'AddressRoute');
    }

    configRoute(): Application {
        this.app.route(`${path}/`).get([authController.auth, addressController.getAllAddress]).post([authController.auth, addressController.createAddress]);

        this.app
            .route(`${path}/:id`)
            .get([authController.auth, addressController.getById])
            .put([authController.auth, addressController.updateAddress])
            .delete([authController.auth, addressController.deleteAddress]);

        this.app.route(`${path}/:title`).get([authController.auth, addressController.getByTitle]);

        return this.app;
    }
}
