import { Request, Response } from 'express';
import ItemService from '../services/Item';
import { IItem } from '../entities/models/interface/Item';
import { createItem, updateItem } from '../entities/models/Item';

let memoryCache: IItem[] | null = null;

class ItemController {
    private itemService: ItemService;

    constructor(itemService: ItemService) {
        this.itemService = itemService;
    }

    private async cache(): Promise<IItem[]> {
        memoryCache !== null ? memoryCache : (memoryCache = await this.itemService.getAll());
        return memoryCache;
    }

    async getAll(req: any, res: Response) {
        this.cache()
            .then((items) => {
                res.status(200).json(items);
            })
            .catch(() => res.status(500).json({ message: 'internal error' }));
    }

    async getById(req: Request, res: Response) {
        this.cache()
            .then((items) => {
                const item = items.filter((item) => item.id === req.params.id);
                item.length > 0 ? res.status(200).json(item) : res.status(404).json({ message: 'item not found' });
            })
            .catch(() => res.status(500).json({ message: 'internal error' }));
    }

    async getByType(req: Request, res: Response) {
        this.cache()
            .then((items) => {
                const item = items.filter((item) => item.type === req.params.type);
                item.length > 0 ? res.status(200).json(item) : res.status(404).json({ message: 'item not found' });
            })
            .catch(() => res.status(500).json({ message: 'internal error' }));
    }

    async create(req: any, res: Response) {
        const { title, description, price, type } = req.body;
        if (req.user.userType === 'admin') {
            if (!title || !description || !price || !type) {
                res.status(400).json({ message: 'preenche tudo!' });
            }

            const titleExists = await this.itemService.getByName(title);
            if (titleExists) res.status(400).json({ message: 'item já cadastrado' });

            const item = new createItem({ title, description, price, type });
            await this.itemService
                .createItem(item)
                .then(() => {
                    res.status(201).json(item);
                    memoryCache = null;
                })
                .catch(() => res.status(500).json({ message: 'internal error' }));
        } else {
            res.status(403).json({ message: 'usuario não autorizado' });
        }
    }

    async update(req: any, res: Response) {
        const item = await this.itemService.getById(req.params.id);
        if (req.user.userType === 'admin') {
            if (item !== null) {
                const newItem = new updateItem(req.body, item);
                await this.itemService.updateItem(item.id, newItem);
                memoryCache = null;
                res.status(200).json(newItem);
            } else {
                res.status(404).json({ message: 'item not found' });
            }
        } else {
            res.status(403).json({ message: 'usuario não autorizado' });
        }
    }

    async delete(req: any, res: Response) {
        if (req.user.userType === 'admin') {
            const item = await this.itemService.deleteItem(req.params.id);
            memoryCache = null;
            item ? res.status(200).json({ message: 'item deletado' }) : res.status(404).json({ message: 'item não encontrado' });
        } else {
            res.status(403).json({ message: 'usuario não autorizado' });
        }
    }
}

export default ItemController;
