import express, { Router } from 'express';
import { ItemController } from './item.controller';

export class ItemRouter {
    public router: Router;
    private controller: ItemController = new ItemController();

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', this.controller.getAllItems);
    }
}
