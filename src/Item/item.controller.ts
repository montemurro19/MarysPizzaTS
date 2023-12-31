import { NextFunction, Request, Response } from 'express';
import itemService from './item.service';

class ItemController {
    async createItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, price, type } = req.body;

            const createdItem = await itemService.createItem({ title, description, price, type }, req.user);
            if (!!createdItem) {
                throw { message: 'preencha todos o campos' };
            }

            res.status(201).json(createdItem);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async updateItem(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedItem = await itemService.updateItem(req.params.id, req.body, req.user);
            if (!updatedItem) {
                res.status(404).json({ erro: 'item não encontrado' });
            }

            res.status(200).json(updatedItem);
        } catch (e) {
            next(e);
        }
    }

    async deleteItem(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedItem = await itemService.deleteItem(req.params.id, req.user);
            if (!deletedItem) {
                res.status(404).json({ erro: 'item não encontrado' });
            }
            res.status(200).json(deletedItem);
        } catch (e) {
            next(e);
        }
    }

    async getAllItems(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await itemService.getAllItems();
            return res.status(200).json(items);
        } catch (e: any) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await itemService.getItemById(req.params.id);
            res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await itemService.getItemByTitle(req.params.title);
            if (!item) {
                return res.status(404).json({ erro: 'item não encontrado' });
            }
            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async getByType(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await itemService.getItemByType(req.params.type);
            if (!items) {
                res.status(404).json({ erro: 'categoria não encontrada' });
            }
            res.status(200).json(items);
        } catch (e) {
            next(e);
        }
    }
}

export default new ItemController();
