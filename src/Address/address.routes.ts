import { Router } from 'express';
import { AddressController } from './address.controller';
import { AuthController } from '../Authentication/auth.controller';

export default class AddressRoutes {
    public router: Router;

    private addressController: AddressController;
    private authController: AuthController;

    constructor() {
        this.addressController = new AddressController();
        this.authController = new AuthController();
        this.router = Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.post('/', 
            this.authController.user.bind(this.authController), 
            this.addressController.create.bind(this.addressController)
        );

        this.router.put('/:id', 
            this.authController.user.bind(this.authController), 
            this.addressController.update.bind(this.addressController)
        );

        this.router.delete('/:id', 
            this.authController.user.bind(this.authController), 
            this.addressController.delete.bind(this.addressController)
        );

        this.router.get('/', 
            this.authController.user.bind(this.authController), 
            this.addressController.getAll.bind(this.addressController)
        );

        this.router.get('/:title', 
            this.authController.user.bind(this.authController), 
            this.addressController.getByTitle.bind(this.addressController)
        );
    }
}
