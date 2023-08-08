import express, { Router } from 'express';
import { ItemController } from './item.controller';

export default class ItemRoutes {
    public router: Router;

    private controller: ItemController;

    constructor() {
        this.controller = new ItemController();
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.post('/', (req, res, next) => this.controller.create(req, res, next));
        this.router.get('/', (req, res, next) => this.controller.getAll(req, res, next));
    }
}
