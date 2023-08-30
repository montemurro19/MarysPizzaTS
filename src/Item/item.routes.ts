import { Router } from 'express';
import { ItemController } from './item.controller';
import { AuthController } from '../Authentication/auth.controller';

export default class ItemRoutes {
    public router: Router;

    private itemController: ItemController;
    private authController: AuthController;

    constructor() {
        this.itemController = new ItemController();
        this.authController = new AuthController();
        this.router = Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.post('/', 
            this.authController.superUser.bind(this.authController), 
            this.itemController.create.bind(this.itemController)
        );

        this.router.put('/:id', 
            this.authController.superUser.bind(this.authController), 
            this.itemController.update.bind(this.itemController)
        );
        
        this.router.delete('/:id', 
            this.authController.superUser.bind(this.authController), 
            this.itemController.delete.bind(this.itemController)
        );
        
        this.router.get('/', 
            this.itemController.getAll.bind(this.itemController)
        );
        
        this.router.get('/:id', 
            this.itemController.getById.bind(this.itemController)
        );
        
        this.router.get('/product/:title', 
            this.itemController.getByTitle.bind(this.itemController)
        );
        
        this.router.get('/product/type/:type', 
            this.itemController.getByType.bind(this.itemController)
        );
    }
}
