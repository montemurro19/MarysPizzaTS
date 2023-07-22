import { Request, Response } from 'express';
import { CreateItemDTO, UpdateItemDTO } from './Entities/item.DTO';
import itemService from './item.service';

class ItemController {
    async createItem(req: Request, res: Response) {
        const item: CreateItemDTO = req.body;
        const user = req.user;
        try {
            const newItem = await itemService.createItem(item, user);
            res.status(201).json(newItem);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao criar o item' });
        }
    }
    async updateItem(req: Request, res: Response) {
        const id = req.params.id;
        const item: UpdateItemDTO = req.body;
        const user = req.user;
        try {
            const updatedItem = await itemService.updateItem(id, item, user);
            if (updatedItem) {
                res.status(200).json(updatedItem);
            } else {
                res.status(404).json({ erro: 'item não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao atualizar o item' });
        }
    }
    async deleteItem(req: Request, res: Response) {
        const id = req.params.id;
        const user = req.user;
        try {
            const deletedItem = await itemService.deleteItem(id, user);
            if (deletedItem) {
                res.status(200).json(deletedItem);
            } else {
                res.status(404).json({ erro: 'item não encontrado' });
            }
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
        const id = req.params.id;
        try {
            const item = await itemService.getItemById(id);
            res.status(200).json(item);
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar o item' });
        }
    }
    async getByTitle(req: Request, res: Response) {
        const title = req.params.title;
        try {
            const item = await itemService.getItemByTitle(title);
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ erro: 'item não encontrado' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar o item' });
        }
    }
    async getByType(req: Request, res: Response) {
        const type = req.params.type;
        try {
            const items = await itemService.getItemByType(type);
            if (items && items.length > 0) {
                res.status(200).json(items);
            } else {
                res.status(404).json({ erro: 'categoria não encontrada' });
            }
        } catch (e) {
            res.status(500).json({ erro: 'falha ao encontrar itens' });
        }
    }
}

export default new ItemController();
