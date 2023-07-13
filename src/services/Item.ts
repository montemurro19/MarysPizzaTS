import { IItem } from '../entities/models/interface/Item';
import { ItemModel } from '../entities/schema/Item';

export interface IItemService {
    getAll(): Promise<IItem[]>;
    getById(id: string): Promise<IItem | null>;
    getByName(title: string): Promise<IItem | null>;
    getByType(type: string): Promise<IItem[] | null>;
    createItem(item: IItem): Promise<IItem>;
    updateItem(id: string, item: IItem): Promise<IItem | null>;
    deleteItem(id: string): Promise<boolean>;
}

class ItemService implements IItemService {
    async getAll(): Promise<IItem[]> {
        return await ItemModel.find();
    }

    async getById(id: string): Promise<IItem | null> {
        return await ItemModel.findOne({ id: id });
    }

    async getByName(title: string): Promise<IItem | null> {
        return await ItemModel.findOne({ title: title });
    }

    async getByType(type: string): Promise<IItem[] | null> {
        return await ItemModel.find({ type: type });
    }

    async createItem(item: IItem): Promise<IItem> {
        return await ItemModel.create(item);
    }

    async updateItem(id: string, item: IItem): Promise<IItem | null> {
        return await ItemModel.findOneAndUpdate({ id: id }, item);
    }

    async deleteItem(id: string): Promise<boolean> {
        const deletedItem = await ItemModel.findOneAndDelete({ id: id });
        return !!deletedItem;
    }
}

export default ItemService;
