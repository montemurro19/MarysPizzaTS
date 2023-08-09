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

            if (!title || !description || !price || !type) {
                throw { message: 'preencha todos os campos' };
            }

            const createdItem = await this.service.create({ title, description, price, type });

            return res.status(201).json(createdItem);
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedItem = await this.service.update(req.params.id, req.body);

            if (!updatedItem) {
                throw { message: 'falha ao atualizar o item' };
            }

            res.status(200).json(updatedItem);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedItem = await this.service.delete(req.params.id);

            if (!deletedItem) {
                throw { message: 'falha ao deletar o item' };
            }

            res.status(200).json({ message: 'item deletado' });
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
            const item = await this.service.getById(req.params.id);

            if (!item) {
                throw { message: 'item não encontrado' };
            }

            res.status(200).json(item);
        } catch (err) {
            next(err);
        }
    }

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await this.service.getByTitle(req.params.title);

            if (!item) {
                throw { message: 'item não encontrado' };
            }

            res.status(200).json(item);
        } catch (err) {
            next(err);
        }
    }

    async getByType(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await this.service.getByType(req.params.type);

            if (items.length < 1) {
                throw { error: 'not_found', message: 'categoria não encontrada' };
            }

            res.status(200).json(items);
        } catch (err) {
            next(err);
        }
    }
}
