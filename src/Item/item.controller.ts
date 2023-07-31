import { NextFunction, Request, Response } from 'express';
import itemService from './item.service';

class ItemController {
    async createItem(req: Request, res: Response, next: NextFunction) {
        try {
            const newItem = await itemService.createItem(req.body, req.user);
            res.status(201).json(newItem);
        } catch (e: any) {
            next(e.message);
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const updatedItem = await itemService.updateItem(req.params.id, req.body, req.user);
            if (!updatedItem) {
                res.status(404).json({ erro: 'item não encontrado' });
            }

            res.status(200).json(updatedItem);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o item' });
        }
    }

    async deleteItem(req: Request, res: Response) {
        try {
            const deletedItem = await itemService.deleteItem(req.params.id, req.user);
            if (!deletedItem) {
                res.status(404).json({ erro: 'item não encontrado' });
            }
            res.status(200).json(deletedItem);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao deletar item' });
        }
    }

    async getAllItems(req: Request, res: Response) {
        try {
            const items = await itemService.getAllItems();
            res.status(200).json(items);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar itens' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await itemService.getItemById(req.params.id);
            res.status(200).json(item);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar o item' });
        }
    }

    async getByTitle(req: Request, res: Response) {
        try {
            const item = await itemService.getItemByTitle(req.params.title);
            if (!item) {
                res.status(404).json({ erro: 'item não encontrado' });
            }
            res.status(200).json(item);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar o item' });
        }
    }

    async getByType(req: Request, res: Response) {
        try {
            const items = await itemService.getItemByType(req.params.type);
            if (!items) {
                res.status(404).json({ erro: 'categoria não encontrada' });
            }
            res.status(200).json(items);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar itens' });
        }
    }
}

export default new ItemController();
