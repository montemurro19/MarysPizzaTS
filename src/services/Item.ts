import { ItemModel } from '../entities/Item';
import { Item } from '../entities/models/Item';
import { IItemService } from './interfaces/Item';

class ItemService implements IItemService {
    async getAll(): Promise<Item[]> {
        return await ItemModel.find();
    }

    async getById(id: string): Promise<Item | null> {
        return await ItemModel.findOne({ id: id });
    }

    async getByname(title: string): Promise<Item | null> {
        return await ItemModel.findOne({ title: title });
    }

    async createItem(item: Item): Promise<Item> {
        return await ItemModel.create(item);
    }

    async updateItem(id: string, item: Item): Promise<Item | null> {
        return await ItemModel.findOneAndUpdate({ id: id }, item);
    }
    async deleteItem(id: string): Promise<boolean> {
        const deletedItem = await ItemModel.findOneAndDelete({ id: id });
        if (!deletedItem) {
            return false;
        }
        return true;
    }
}

export default ItemService;
