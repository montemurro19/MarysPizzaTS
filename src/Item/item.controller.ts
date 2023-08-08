import { NextFunction, Request, Response } from 'express';
import { ItemService } from './item.service';

export class ItemController {
    private service: ItemService;

    constructor() {
        this.service = new ItemService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, price, type } = req.body;

            const createdItem = await this.service.create({ title, description, price, type });

            if (!!createdItem) {
                throw { message: 'preencha todos os campos' };
            }

            return res.status(201).json(createdItem);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await this.service.getAll();
            return res.status(200).json(items);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async getByType(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }
}
