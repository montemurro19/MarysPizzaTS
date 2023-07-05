import { Request, Response } from 'express';
import ItemService from '../services/Item';

class ItemController {
    private itemService: ItemService;

    constructor(itemService: ItemService) {
        this.itemService = itemService;
    }
    async getAll(req: Request, res: Response) {
        const items = await this.itemService.getAll();
        res.status(200).json(items);
    }
}

export default ItemController;
